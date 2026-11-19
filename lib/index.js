/**
 * Host half of dsh-plugin-mcp-apps: a general MCP connector.
 *
 * Browser half (`./client.js`) owns the "Подключения" page and the workbench; this
 * half owns what only the host can do — persisting connections, speaking MCP
 * (stdio / streamable HTTP / SSE), injecting the configured auth parameters,
 * and registering each enabled server's tools on the harness ToolRuntime under
 * `mcp__<connectionId>__<tool>`.
 *
 * Disabling a connection disposes its registrations, so the model's next
 * assembly no longer sees those tools.
 *
 * @module dsh-plugin-mcp-apps
 */
import { createHash, randomUUID } from "node:crypto";
import { chmod, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { auth, Client, SSEClientTransport, StreamableHTTPClientTransport, UnauthorizedError } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { authFetch } from "./auth.js";
import { CALLBACK_PATH, CLIENT_METADATA_PATH, RecordOAuthProvider, clearOAuth, clientMetadataDocument, protectedResourceChallenge, redirectBaseFrom } from "./oauth.js";

/** Tool catalogs kept in memory are capped. */
const MAX_LISTED_TOOLS = 500;
/** Public tool names follow the DeepSeek function-name contract. */
const MAX_PUBLIC_NAME = 64;
/** Characters the function-name contract rejects. */
const INVALID_NAME = /[^A-Za-z0-9_-]/g;
/** Where connection records live when DSH_HOME is not set. */
const DEFAULT_HOME = "/data";
/** Route prefix this plugin owns on the web server. */
const API_PREFIX = "/api/mcp-apps";
/** Request body cap for connection records. */
const MAX_BODY_BYTES = 1 << 20;

/** Resolve DSH_HOME the same way the launcher does. */
function dshHome() {
	return process.env.DSH_HOME && process.env.DSH_HOME.trim() !== "" ? process.env.DSH_HOME : DEFAULT_HOME;
}

/** Path of the persisted connection store. */
function storePath() {
	return join(dshHome(), "mcp-apps", "connections.json");
}

/** One local namespace per connection, constrained to the public-name alphabet. */
function normalizeId(value) {
	const cleaned = String(value ?? "").trim().replace(INVALID_NAME, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase();
	return cleaned === "" ? "server-" + randomUUID().slice(0, 8) : cleaned;
}

/**
 * Model-facing name for one upstream tool: `mcp__<id>__<raw>`, hashed when
 * normalization or truncation would otherwise collapse two identities.
 * @param connectionId - connection namespace.
 * @param raw - the server's own tool name.
 * @returns the public tool name.
 */
function publicToolName(connectionId, raw) {
	const joined = `mcp__${connectionId}__${raw}`;
	const normalized = joined.replace(INVALID_NAME, "_");
	if (normalized === joined && normalized.length <= MAX_PUBLIC_NAME) return normalized;
	const hash = createHash("sha256").update(`${connectionId}\0${raw}`).digest("hex").slice(0, 12);
	return `${normalized.slice(0, MAX_PUBLIC_NAME - 13)}_${hash}`;
}

/** Join the text blocks of one MCP content array, keeping non-text blocks visible. */
function contentText(content) {
	if (!Array.isArray(content)) return "";
	const parts = [];
	for (const block of content) {
		if (!block || typeof block !== "object") continue;
		if (block.type === "text" && typeof block.text === "string") parts.push(block.text);
		else if (block.type === "image") parts.push(`[image ${block.mimeType ?? "unknown"} omitted from text projection]`);
		else if (block.type === "audio") parts.push(`[audio ${block.mimeType ?? "unknown"} omitted from text projection]`);
		else if (block.type === "resource") parts.push(`[resource ${block.resource?.uri ?? ""}]`);
		else if (block.type === "resource_link") parts.push(`[resource link ${block.uri ?? ""}]`);
	}
	return parts.join("\n").trim();
}

/** Keep only content shapes the harness can carry without attachment admission. */
function projectableContent(content) {
	if (!Array.isArray(content)) return [];
	const out = [];
	for (const block of content) {
		if (!block || typeof block !== "object") continue;
		if (block.type === "text" && typeof block.text === "string") out.push({ type: "text", text: block.text });
		else if (block.type === "image") out.push({ type: "text", text: `[image ${block.mimeType ?? "unknown"} omitted; raw data stays available to programmatic callers]` });
		else if (block.type === "audio") out.push({ type: "text", text: `[audio ${block.mimeType ?? "unknown"} omitted]` });
		else if (block.type === "resource_link" && typeof block.uri === "string") out.push({ type: "text", text: `[resource ${block.uri}]` });
		else if (block.type === "resource") out.push({ type: "text", text: `[resource ${block.resource?.uri ?? ""}]` });
	}
	return out;
}

/**
 * One live connection: transport, client, and the tool registrations it owns.
 */
class Connection {
	/**
	 * @param {object} record - persisted connection record.
	 * @param {object} ctx - host context (tools registry + logger).
	 */
	constructor(record, ctx, onPersist) {
		this.record = record;
		this.ctx = ctx;
		this.onPersist = onPersist ?? (async () => {});
		this.client = null;
		this.transport = null;
		this.disposers = new Map();
		this.tools = [];
		this.status = record.enabled ? "connecting" : "disabled";
		this.error = "";
	}

	/** OAuth provider bound to this record, when the connection uses OAuth. */
	oauthProvider() {
		if (this.record.auth?.mode !== "oauth") return undefined;
		const base = this.record.auth?.oauth?.redirectBase ?? "http://127.0.0.1";
		return new RecordOAuthProvider(
			this.record,
			() => this.onPersist(),
			{
				redirectBase: base,
				scopes: this.record.auth?.scopes ?? "",
				clientMode: this.record.auth?.clientMode ?? "auto",
				clientId: this.record.auth?.clientId ?? "",
				clientSecret: this.record.auth?.clientSecret ?? ""
			}
		);
	}

	/** Create the transport described by the record. */
	createTransport() {
		const record = this.record;
		if (record.transport === "stdio") {
			if (!record.command) throw new Error("для stdio-подключения не задана команда");
			return new StdioClientTransport({
				command: record.command,
				args: Array.isArray(record.args) ? record.args : [],
				env: { ...process.env, ...(record.env ?? {}) },
				cwd: record.cwd || undefined
			});
		}
		if (!record.url) throw new Error(`${record.transport}: в подключении нет url`);
		const fetchImpl = authFetch(record, globalThis.fetch);
		const url = new URL(record.url);
		const authProvider = this.oauthProvider();
		const common = authProvider === undefined ? { fetch: fetchImpl } : { fetch: fetchImpl, authProvider };
		if (record.transport === "sse") return new SSEClientTransport(url, common);
		return new StreamableHTTPClientTransport(url, common);
	}

	/** Connect, list tools, and register them. */
	async start() {
		this.status = "connecting";
		this.error = "";
		// `mode: "auto"` probes the server with `server/discover` and only falls back to
		// the 2025 `initialize` handshake when the server does not offer the 2026-07-28
		// protocol revision. The SDK default is `"legacy"`, which cannot connect to a
		// server that rejects `initialize` (EFTR MCP answers -32601 "Неизвестная
		// операция; поддерживается 2026-07-28"). Same option the native dsh-mcp-client
		// uses.
		const client = new Client({ name: "dsh-mcp-apps", version: "0.5.7" }, { capabilities: {}, versionNegotiation: { mode: "auto" } });
		const transport = this.createTransport();
		try {
			await client.connect(transport);
			this.client = client;
			this.transport = transport;
			await this.registerTools();
			this.status = "ready";
		} catch (error) {
			this.error = error instanceof Error ? error.message : String(error);
			const httpStatus = typeof error?.status === "number" ? error.status : typeof error?.statusCode === "number" ? error.statusCode : undefined;
			const unauthorized = UnauthorizedError.isInstance?.(error) === true || httpStatus === 401 || /unauthoriz|\b401\b/i.test(this.error);
			this.status = unauthorized ? "needs_auth" : "error";
			this.disposeTools();
			try {
				await client.close();
			} catch {
				/* already closed */
			}
			throw error;
		}
	}

	/** Discover tools and swap the registrations in one go. */
	async registerTools() {
		const capabilities = this.client.getServerCapabilities?.();
		const listed = capabilities?.tools === undefined ? { tools: [] } : await this.client.listTools(undefined, { cacheMode: "refresh" });
		const next = [];
		const definitions = [];
		for (const tool of listed.tools ?? []) {
			const publicName = publicToolName(this.record.id, tool.name);
			const resourceUri = tool._meta?.ui?.resourceUri ?? tool._meta?.["ui/resourceUri"];
			next.push({ name: tool.name, description: tool.description ?? "", resourceUri: typeof resourceUri === "string" ? resourceUri : undefined });
			definitions.push(this.toolDefinition(publicName, tool));
		}
		// Swap: the registry refuses duplicates, so register before disposing the old set.
		const created = [];
		try {
			for (const definition of definitions) created.push([definition.name, this.ctx.tools.register(definition)]);
		} catch (error) {
			for (const [, dispose] of created) dispose();
			throw new Error(`Конфликт регистрации инструментов: ${error instanceof Error ? error.message : String(error)}`);
		}
		this.disposeTools();
		for (const [name, dispose] of created) this.disposers.set(name, dispose);
		this.tools = next.slice(0, MAX_LISTED_TOOLS);
	}

	/** One harness tool definition bridging to `tools/call`. */
	toolDefinition(publicName, tool) {
		const self = this;
		return {
			name: publicName,
			description: tool.description ?? "",
			parameters: tool.inputSchema ?? { type: "object", properties: {} },
			output: {
				schema: {
					type: "object",
					properties: { content: { type: "array", items: {} } },
					required: ["content"],
					additionalProperties: false
				},
				render(_args, value) {
					return [{ type: "text", text: contentText(value.content) || "(пустой результат)" }];
				}
			},
			async execute(args, exec) {
				if (!self.client) throw new Error("подключение разорвано");
				const result = await self.client.callTool({ name: tool.name, arguments: args ?? {} }, { signal: exec.signal });
				const content = projectableContent(result.content);
				if (result.isError === true) throw new Error(contentText(result.content) || "MCP-инструмент вернул ошибку");
				return { content };
			}
		};
	}

	/** Drop every registration this connection owns. */
	disposeTools() {
		for (const dispose of this.disposers.values()) {
			try {
				dispose();
			} catch {
				/* registry already gone */
			}
		}
		this.disposers.clear();
	}

	/** Disconnect and clear registrations. */
	async stop() {
		this.disposeTools();
		const client = this.client;
		this.client = null;
		this.transport = null;
		this.status = "disabled";
		if (client) {
			try {
				await client.close();
			} catch {
				/* already closed */
			}
		}
	}

	/** Public snapshot (never includes secret values). */
	snapshot() {
		return {
			id: this.record.id,
			name: this.record.name,
			enabled: this.record.enabled,
			transport: this.record.transport,
			url: this.record.url ?? "",
			command: this.record.command ?? "",
			args: this.record.args ?? [],
			env: this.record.env ?? {},
			cwd: this.record.cwd ?? "",
			auth: {
				mode: this.record.auth?.mode ?? "none",
				scopes: this.record.auth?.scopes ?? "",
				clientMode: this.record.auth?.clientMode ?? "auto",
				oauth: this.record.auth?.mode === "oauth"
					? new RecordOAuthProvider(this.record, async () => {}, {
							redirectBase: this.record.auth?.oauth?.redirectBase ?? "",
							scopes: this.record.auth?.scopes ?? "",
							clientMode: this.record.auth?.clientMode ?? "auto",
							clientId: this.record.auth?.clientId ?? "",
							clientSecret: this.record.auth?.clientSecret ?? ""
						}).summary()
					: null,
				params: (this.record.auth?.params ?? []).map((param) => ({
					in: param.in,
					name: param.name,
					hasValue: param.value !== undefined && param.value !== "",
					value: param.value === undefined || param.value === "" ? "" : "••••••"
				}))
			},
			note: this.record.note ?? "",
			status: this.status,
			error: this.error,
			toolCount: this.tools.length,
			tools: this.tools
		};
	}
}

/** Normalize a record coming from the browser or a servers.json import. */
function normalizeRecord(input, previous) {
	const base = previous ?? {};
	const transport = ["stdio", "http", "sse"].includes(input.transport) ? input.transport : base.transport ?? "http";
	const id = normalizeId(input.id ?? base.id ?? input.name ?? randomUUID().slice(0, 8));
	const params = Array.isArray(input.auth?.params)
		? input.auth.params
				.filter((param) => param && ["header", "query", "body"].includes(param.in) && typeof param.name === "string" && param.name !== "")
				.map((param) => {
					const masked = param.value === "••••••";
					const old = (previous?.auth?.params ?? []).find((candidate) => candidate.in === param.in && candidate.name === param.name);
					return { in: param.in, name: param.name, value: masked ? old?.value ?? "" : String(param.value ?? "") };
				})
		: base.auth?.params ?? [];
	const clientMode = ["auto", "cimd", "manual"].includes(input.auth?.clientMode) ? input.auth.clientMode : base.auth?.clientMode ?? "auto";
	const previousClientMode = base.auth?.clientMode ?? "auto";
	const oauthState = input.auth?.oauth ?? base.auth?.oauth;
	const authRecord = {
		mode: ["api", "none", "oauth"].includes(input.auth?.mode) ? input.auth.mode : base.auth?.mode ?? "none",
		scopes: String(input.auth?.scopes ?? base.auth?.scopes ?? ""),
		clientMode,
		clientId: String(input.auth?.clientId ?? base.auth?.clientId ?? ""),
		clientSecret: input.auth?.clientSecret === "••••••" ? base.auth?.clientSecret ?? "" : String(input.auth?.clientSecret ?? base.auth?.clientSecret ?? ""),
		// A client registration belongs to the way it was obtained (DCR id vs CIMD
		// metadata URL); switching modes must drop it.
		oauth: clientMode === previousClientMode || oauthState === undefined ? oauthState : { ...oauthState, clientInformation: undefined },
		params
	};

	return {
		id,
		name: String(input.name ?? base.name ?? id),
		enabled: input.enabled === undefined ? base.enabled ?? false : input.enabled === true,
		transport,
		url: String(input.url ?? base.url ?? "").trim(),
		command: String(input.command ?? base.command ?? "").trim(),
		args: Array.isArray(input.args) ? input.args.map(String) : base.args ?? [],
		env: input.env && typeof input.env === "object" ? input.env : base.env ?? {},
		cwd: String(input.cwd ?? base.cwd ?? ""),
		headers: input.headers && typeof input.headers === "object" ? input.headers : base.headers ?? {},
		auth: authRecord,
		note: String(input.note ?? base.note ?? "")
	};
}

/**
 * Convert a Claude-Code style `{"mcpServers": {...}}` document into records.
 * @param raw - parsed JSON (or the servers map itself).
 * @returns records ready for the store.
 */
function fromServersJson(raw) {
	const servers = raw && typeof raw === "object" && raw.mcpServers && typeof raw.mcpServers === "object" ? raw.mcpServers : raw;
	if (!servers || typeof servers !== "object") throw new Error('servers.json должен иметь вид {"mcpServers": {...}}');
	const out = [];
	for (const [name, spec] of Object.entries(servers)) {
		if (!spec || typeof spec !== "object") continue;
		const type = typeof spec.type === "string" ? spec.type : spec.command ? "stdio" : "http";
		const headers = spec.headers && typeof spec.headers === "object" ? spec.headers : {};
		const params = Object.entries(headers).map(([header, value]) => ({ in: "header", name: String(header), value: String(value ?? "") }));
		out.push({
			id: normalizeId(name),
			name: String(name),
			enabled: false,
			transport: type === "stdio" ? "stdio" : type === "sse" ? "sse" : "http",
			url: String(spec.url ?? ""),
			command: String(spec.command ?? ""),
			args: Array.isArray(spec.args) ? spec.args.map(String) : [],
			env: spec.env && typeof spec.env === "object" ? spec.env : {},
			cwd: String(spec.cwd ?? ""),
			headers: {},
			auth: { mode: params.length > 0 ? "api" : "none", params },
			note: ""
		});
	}
	return out;
}

/** Read a JSON request body with a size cap. */
async function readJson(req) {
	const chunks = [];
	let bytes = 0;
	for await (const chunk of req) {
		bytes += chunk.length;
		if (bytes > MAX_BODY_BYTES) throw new Error("слишком большое тело запроса");
		chunks.push(chunk);
	}
	if (chunks.length === 0) return {};
	return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

/** Send a small HTML page (the OAuth callback lands in a browser tab). */
function sendHtml(res, status, message, script) {
	res.writeHead(status, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
	res.end(`<!doctype html><meta charset="utf-8"><title>DSH Подключения</title><style>body{font:14px/1.6 system-ui,sans-serif;margin:48px auto;max-width:520px;padding:0 20px;color:#222}code{background:#eee;padding:1px 5px;border-radius:4px}</style><p>${message}</p>${script ?? ""}`);
}

/** Send a JSON response. */
function send(res, status, value) {
	res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
	res.end(JSON.stringify(value));
}

/**
 * Register the workbench contract as a system-prompt section, and run the
 * connector: store, live connections, HTTP API.
 * @param ctx - host root context.
 */
export function apply(ctx) {
	ctx.effect(() => ctx.systemPrompt.section({
		name: "mcp-apps:workbench",
		order: ctx.systemPrompt.getSectionOrder("MCP_SERVERS") + 1,
		text: [
			"Правила рабочей области (MCP Apps) справа:",
			"После вызова инструмента с интерактивной рабочей областью (у которого MCP-сервер объявил ресурс ui://) хост сам открывает интерактивный интерфейс в рабочей области справа, а строка инструмента в чате помечается 【Рабочая область открыта】.",
			"1. После успешного вызова этих инструментов в тексте пишите только одну строку 【Рабочая область открыта】 и не пересказывайте суммы, остатки, проводки и таблицы.",
			"2. Если пользователю нужно посмотреть или изменить данные, попросите его сделать это в рабочей области справа — не читайте и не правьте данные за него.",
			"3. Числа приводите, только если пользователь явно просит «написать результат в диалоге».",
			"4. Если инструмент вернул isError, обработайте это как обычную ошибку и нормально объясните причину."
		].join("\n")
	}), "mcp-apps.workbench-section");

	const connections = new Map();
	let queue = Promise.resolve();

	/** Serialize store mutations and live-connection changes. */
	const serial = (task) => {
		const next = queue.then(task, task);
		queue = next.catch(() => undefined);
		return next;
	};

	/** Persist records atomically with owner-only permissions. */
	async function saveStore(records) {
		const file = storePath();
		await mkdir(join(dshHome(), "mcp-apps"), { recursive: true });
		const temp = `${file}.${process.pid}.tmp`;
		await writeFile(temp, JSON.stringify({ version: 1, connections: records }, null, 2) + "\n", "utf8");
		await chmod(temp, 0o600);
		await rename(temp, file);
	}

	/** Persist whatever the live records currently are (OAuth provider callback). */
	async function persistAll() {
		await saveStore([...connections.values()].map((entry) => entry.record));
	}

	/** Read the persisted store, seeding the mcp-stuxx example on first run. */
	async function loadStore() {
		const file = storePath();
		try {
			const parsed = JSON.parse(await readFile(file, "utf8"));
			if (parsed && Array.isArray(parsed.connections)) return parsed.connections;
		} catch (error) {
			if (error.code !== "ENOENT") ctx.logger.warn(`mcp-apps: не удалось прочитать конфигурацию подключений ${String(error)}`);
		}
		const seeded = [{
			id: "mcpstuxx",
			name: "mcp-stuxx (пример)",
			enabled: false,
			transport: "http",
			url: "https://mcp.stuxx.cn/mcp",
			command: "",
			args: [],
			env: {},
			cwd: "",
			headers: {},
			auth: { mode: "api", params: [{ in: "header", name: "Authorization", value: "" }] },
			note: "Пример: укажите Bearer-токен и включите. id подключения — mcpstuxx, имена инструментов как у штатного mcp-client (mcp__mcpstuxx__*), плюс метаданные ui://."
		}];
		await saveStore(seeded);
		return seeded;
	}

	/** Live connections, loaded from the store on first use. */
	async function currentRecords() {
		if (connections.size === 0) {
			for (const record of await loadStore()) connections.set(record.id, new Connection(record, ctx, () => persistAll()));
		}
		return [...connections.values()];
	}

	/** Start every enabled connection, tolerating individual failures. */
	async function bootConnections() {
		for (const connection of await currentRecords()) {
			if (!connection.record.enabled) continue;
			try {
				await connection.start();
				ctx.logger.info(`mcp-apps(${connection.record.id}): ${connection.tools.length} инструментов зарегистрировано`);
			} catch (error) {
				ctx.logger.warn(`mcp-apps(${connection.record.id}): ошибка подключения ${String(error)}`);
			}
		}
	}

	const boot = bootConnections().catch((error) => ctx.logger.warn(`mcp-apps: не удалось запустить подключения ${String(error)}`));
	ctx.effect(() => () => {
		for (const connection of connections.values()) void connection.stop();
		connections.clear();
	}, "mcp-apps.connections");

	/** Find one live connection or throw a message the page can show. */
	async function requireConnection(id) {
		await boot;
		const connection = (await currentRecords()).find((candidate) => candidate.record.id === id);
		if (connection === undefined) throw new Error(`неизвестное подключение: ${id}`);
		return connection;
	}

	/** Apply a record update: persist, then start/stop the live connection. */
	async function upsert(record) {
		await currentRecords();
		const existing = connections.get(record.id);
		if (existing !== undefined) await existing.stop();
		const connection = new Connection(record, ctx, () => persistAll());
		connections.set(record.id, connection);
		await saveStore([...connections.values()].map((entry) => entry.record));
		if (record.enabled) {
			try {
				await connection.start();
			} catch (error) {
				connection.error = error instanceof Error ? error.message : String(error);
				const httpStatus = typeof error?.status === "number" ? error.status : undefined;
				connection.status = httpStatus === 401 || /unauthoriz|\b401\b/i.test(connection.error) ? "needs_auth" : "error";
			}
		}
		return connection.snapshot();
	}

	ctx.inject(["webServer"], (webCtx) => {
		const trusted = (req) => {
			const remote = req.socket?.remoteAddress ?? "";
			return remote === "127.0.0.1" || remote === "::1" || remote === "::ffff:127.0.0.1";
		};
		/** Browser requests must carry the harness session cookie; loopback may skip it. */
		const authorized = (req) => {
			if (trusted(req)) return true;
			const service = webCtx.get("client-connection");
			if (service === undefined) return false;
			const secure = webCtx.webServer.protocol === "https:";
			try {
				return service.isAuthenticated(req, secure) || service.isAuthenticated(req, true) || service.isAuthenticated(req, false);
			} catch {
				return false;
			}
		};

		const handler = async (req, res) => {
			if (!authorized(req)) {
				res.writeHead(401, { "content-type": "text/plain; charset=utf-8" });
				res.end("dsh web authentication required\n");
				return;
			}
			const url = new URL(req.url ?? "/", "http://dsh.invalid");
			const path = url.pathname.slice(API_PREFIX.length).replace(/\/+$/, "") || "/";
			if (req.method === "GET" && url.pathname === CLIENT_METADATA_PATH) {
				const origin = redirectBaseFrom(req, "http://127.0.0.1").base;
				res.writeHead(200, { "content-type": "application/json", "cache-control": "max-age=60", "access-control-allow-origin": "*" });
				return res.end(JSON.stringify(clientMetadataDocument(origin), null, 2));
			}
			if (req.method === "GET" && url.pathname === CALLBACK_PATH) {
				const state = url.searchParams.get("state") ?? "";
				const code = url.searchParams.get("code") ?? "";
				const refused = url.searchParams.get("error");
				const target = (await currentRecords()).find((candidate) => candidate.record.auth?.oauth?.state === state && state !== "");
				if (target === undefined) return sendHtml(res, 400, "Некорректный ответ авторизации: state не совпадает. Вернитесь в «Подключения» и начните авторизацию заново.");
				if (refused !== null) return sendHtml(res, 400, `авторизация отклонена: <code>${refused.replace(/[<>&]/g, "")}</code>`);
				if (code === "") return sendHtml(res, 400, "в ответе авторизации нет code.");
				try {
					const provider = target.oauthProvider();
					await auth(provider, {
						serverUrl: target.record.url,
						authorizationCode: code,
						iss: url.searchParams.get("iss") ?? undefined,
						scope: target.record.auth?.scopes || undefined
					});
					await target.stop();
					if (target.record.enabled) await target.start();
					return sendHtml(res, 200, "Авторизация завершена, окно можно закрыть.", "<script>try{window.opener&&window.opener.postMessage('mcp-apps-oauth-done','*')}catch(e){};setTimeout(function(){window.close()},800)</script>");
				} catch (error) {
					return sendHtml(res, 500, `ошибка авторизации: <code>${String(error instanceof Error ? error.message : error).replace(/[<>&]/g, "")}</code>`);
				}
			}
			try {
				if (req.method === "GET" && path === "/state") {
					const list = [];
					for (const connection of await currentRecords()) list.push(connection.snapshot());
					return send(res, 200, { ok: true, connections: list });
				}
				if (req.method === "POST" && path === "/import") {
					const body = await readJson(req);
					const records = fromServersJson(typeof body.json === "string" ? JSON.parse(body.json) : body.servers);
					const saved = [];
					for (const record of records) saved.push(await serial(() => upsert(record)));
					return send(res, 200, { ok: true, imported: saved.length, connections: saved });
				}
				if (req.method === "POST" && path === "/connections") {
					const body = await readJson(req);
					return send(res, 200, { ok: true, connection: await serial(() => upsert(normalizeRecord(body.record ?? body))) });
				}
				const match = /^\/connections\/([^/]+)(?:\/(enabled|test|oauth-start|oauth-reset))?$/.exec(path);
				if (match) {
					const connection = await requireConnection(decodeURIComponent(match[1]));
					const action = match[2];
					if (req.method === "PUT" && action === undefined) {
						const body = await readJson(req);
						return send(res, 200, { ok: true, connection: await serial(() => upsert(normalizeRecord(body.record ?? body, connection.record))) });
					}
					if (req.method === "DELETE" && action === undefined) {
						await serial(async () => {
							await connection.stop();
							connections.delete(connection.record.id);
							await saveStore([...connections.values()].map((entry) => entry.record));
						});
						return send(res, 200, { ok: true });
					}
					if (req.method === "POST" && action === "enabled") {
						const body = await readJson(req);
						return send(res, 200, { ok: true, connection: await serial(() => upsert({ ...connection.record, enabled: body.enabled === true })) });
					}
					if (req.method === "POST" && action === "test") {
						const probe = new Connection({ ...connection.record, enabled: true }, ctx, () => persistAll());
						try {
							const client = new Client({ name: "dsh-mcp-apps-test", version: "0.5.7" }, { capabilities: {}, versionNegotiation: { mode: "auto" } });
							const transport = probe.createTransport();
							await client.connect(transport);
							const listed = client.getServerCapabilities?.()?.tools === undefined ? { tools: [] } : await client.listTools(undefined, { cacheMode: "refresh" });
							await client.close();
							return send(res, 200, {
								ok: true,
								tools: (listed.tools ?? []).map((tool) => ({ name: tool.name, description: tool.description ?? "", resourceUri: tool._meta?.ui?.resourceUri }))
							});
						} catch (error) {
							return send(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) });
						}
					}
					if (req.method === "POST" && action === "oauth-start") {
						const body = await readJson(req);
						const origin = redirectBaseFrom(req, "http://127.0.0.1");
						const base = typeof body.redirectBase === "string" && body.redirectBase !== "" ? body.redirectBase.replace(/\/+$/, "") : origin.base;
						const scopes = typeof body.scopes === "string" ? body.scopes.trim() : connection.record.auth?.scopes ?? "";
						connection.record.auth = connection.record.auth ?? { mode: "oauth", params: [] };
						connection.record.auth.mode = "oauth";
						connection.record.auth.scopes = scopes;
						if (connection.record.auth.clientMode === "cimd" && !/^https:/i.test(base)) {
							return send(res, 200, { ok: false, error: "Для CIMD нужен HTTPS-адрес: откройте эту страницу по домену https:// и повторите авторизацию" });
						}
						connection.record.auth.oauth = { ...(connection.record.auth.oauth ?? {}), redirectBase: base };
						// Start discovery from scratch: a cached authorizationServerUrl pins whatever
						// discovery produced last time, and for a bare-origin connection URL that is the
						// origin itself — the SDK then builds https://host/authorize, which 404s. Tokens
						// are kept, so a still-valid refresh token can finish without a browser round trip.
						const oauth = connection.record.auth.oauth;
						delete oauth.discoveryState;
						delete oauth.authorizationServerUrl;
						delete oauth.authorizationUrl;
						delete oauth.codeVerifier;
						await persistAll();
						const provider = connection.oauthProvider();
						try {
							// The resource server's 401 challenge names its protected-resource metadata;
							// without it discovery cannot find an authorization server published under a path.
							const challenge = await protectedResourceChallenge(connection.record.url);
							const outcome = await auth(provider, {
								serverUrl: connection.record.url,
								scope: scopes || challenge.scope || undefined,
								resourceMetadataUrl: challenge.resourceMetadataUrl
							});
							if (outcome === "AUTHORIZED") {
								await connection.stop();
								if (connection.record.enabled) await connection.start();
								return send(res, 200, { ok: true, status: "AUTHORIZED", connection: connection.snapshot() });
							}
							return send(res, 200, {
								ok: true,
								status: "REDIRECT",
								authorizationUrl: connection.record.auth.oauth.authorizationUrl ?? "",
								redirectUrl: `${base}${CALLBACK_PATH}`
							});
						} catch (error) {
							return send(res, 200, { ok: false, error: error instanceof Error ? error.message : String(error) });
						}
					}
					if (req.method === "POST" && action === "oauth-reset") {
						await connection.stop();
						clearOAuth(connection.record);
						await persistAll();
						return send(res, 200, { ok: true, connection: connection.snapshot() });
					}
					return send(res, 405, { ok: false, error: "неподдерживаемый запрос" });
				}
				if (req.method === "POST" && path === "/rpc") {
					const body = await readJson(req);
					const connection = await requireConnection(String(body.connectionId ?? ""));
					if (!connection.client) throw new Error("подключение не включено");
					if (body.method === "tools/call") {
						const result = await connection.client.callTool({ name: body.params?.name, arguments: body.params?.arguments ?? {} });
						return send(res, 200, { ok: true, result });
					}
					if (body.method === "resources/read") {
						const result = await connection.client.readResource({ uri: body.params?.uri });
						return send(res, 200, { ok: true, result });
					}
					if (body.method === "tools/list") {
						return send(res, 200, { ok: true, result: { tools: connection.tools } });
					}
					return send(res, 400, { ok: false, error: `неподдерживаемый RPC: ${String(body.method)}` });
				}
				return send(res, 404, { ok: false, error: "неизвестный эндпойнт" });
			} catch (error) {
				return send(res, 500, { ok: false, error: error instanceof Error ? error.message : String(error) });
			}
		};

		webCtx.effect(() => webCtx.webServer.register({ kind: "prefix", path: API_PREFIX, handler }), "mcp-apps.api");
	});
}

/** Host half services: tool registry and prompt registry. */
export const inject = ["tools", "systemPrompt"];