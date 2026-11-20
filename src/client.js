// Browser half of dsh-plugin-mcp-apps (source).
//
// scripts/build-client.mjs bundles this file with esbuild and wraps the result in
// window.__ModuleLoader__.load({ id, factory }); lib/client.js is the artifact, not the
// source — edit here and run `npm run build`.
import * as React from "react";
import { currentLanguage, dictionaries, NAMESPACE, setLanguage, tr, useLocaleRevision } from "./i18n.js";
import { CopyButton, Glyph, installStyles, Menu, MenuItem, Spinner, Switch } from "./ui.js";

//#region constants
const UI_PROTOCOL = "2026-01-26";
const MCP_MIME = "text/html;profile=mcp-app";
const API_BASE = "/api/mcp-apps";
const HANDSHAKE_TIMEOUT_MS = 6000;
/** Tab type this plugin registers in the right Sidebar. */
const WORKBENCH_ID = "dsh-plugin-mcp-apps";
const WORKBENCH_KIND = "mcp-app";
/** Left-sidebar page this plugin registers, directly below 技能 (order 2). */
const PANEL_ID = "mcp-apps";
const PANEL_ORDER = 3;
/** Sidebar label and page heading, resolved per call so a language switch reaches it. */
const panelTitle = () => tr("panel.title");
/** A settled call older than this predates the page load. */
const LIVE_SLACK_MS = 5000;
//#endregion

//#region host API
/**
 * Turn a host error payload into a localized Error.
 *
 * The host answers `{ok:false, error:{code, params}}`; the code names an entry of this
 * plugin's own dictionary (`host.error.<code>`), so the panel speaks one language no matter
 * which half detected the failure. A plain string still works — the OAuth callback page and
 * older builds send one.
 * @param body - parsed response body, if any.
 * @param fallback - message used when the body carries no error at all.
 */
function hostError(body, fallback) {
	const raw = body && body.error;
	if (raw && typeof raw === "object" && typeof raw.code === "string") return new Error(tr("host.error." + raw.code, raw.params));
	if (typeof raw === "string" && raw !== "") return new Error(raw);
	return new Error(fallback || tr("error.generic"));
}

/** Call the host connector API and unwrap its `{ok, ...}` envelope. */
async function api(path, init) {
	const options = init ? { ...init } : {};
	options.headers = { "content-type": "application/json", ...(options.headers || {}) };
	const response = await fetch(API_BASE + path, options);
	const text = await response.text();
	let body = null;
	try {
		body = text ? JSON.parse(text) : null;
	} catch (error) {
		throw new Error(tr("error.badJson", { body: String(text).slice(0, 120) }));
	}
	if (!response.ok) throw hostError(body, "HTTP " + response.status);
	if (body && body.ok === false) throw hostError(body);
	return body;
}

/**
 * Tell the host which language the UI speaks. The prompt section and the OAuth callback page
 * are rendered on the host, where the locale service does not exist, so the panel reports its
 * language and the host persists it. Best effort: a host without the route keeps its default.
 */
function reportLocale() {
	void api("/locale", { method: "POST", body: JSON.stringify({ active: currentLanguage() }) }).catch(() => {});
}

/** Raw JSON-RPC to one connection, executed host-side with its auth applied. */
function mcpRpc(connectionId, method, params) {
	return api("/rpc", {
		method: "POST",
		body: JSON.stringify({ connectionId, method, params: params || {} })
	}).then((body) => body.result);
}

/** Model-facing name of one tool: mirrors the host's `mcp__<id>__<raw>` contract. */
function publicToolName(connectionId, raw) {
	const joined = "mcp__" + connectionId + "__" + raw;
	const normalized = joined.replace(/[^A-Za-z0-9_-]/g, "_");
	if (normalized === joined && normalized.length <= 64) return normalized;
	return normalized.slice(0, 64);
}
//#endregion

//#region shared state
/** Public tool name -> connection + resource metadata, filled from `/state`. */
const toolMeta = new Map();
const subscribers = new Set();
const state = { connections: [], loading: true, error: "", loadedAt: 0, storePath: "", homeSource: "" };

function notify() {
	for (const listener of subscribers) {
		try {
			listener();
		} catch (error) {
			/* a dead component */
		}
	}
}

/** Re-read every connection (and their tool catalogs) from the host. */
let refreshing = null;
function refreshState() {
	if (refreshing) return refreshing;
	refreshing = api("/state")
		.then((body) => {
			state.connections = body.connections || [];
			state.storePath = body.storePath || "";
			state.homeSource = body.homeSource || "";
			state.error = "";
			state.loading = false;
			state.loadedAt = Date.now();
			toolMeta.clear();
			for (const connection of state.connections) {
				for (const tool of connection.tools || []) {
					toolMeta.set(publicToolName(connection.id, tool.name), {
						connectionId: connection.id,
						connectionName: connection.name,
						rawName: tool.name,
						description: tool.description || "",
						resourceUri: tool.resourceUri || ""
					});
				}
			}
			syncClaims();
			notify();
			return state;
		})
		.catch((error) => {
			state.loading = false;
			state.error = error && error.message ? error.message : String(error);
			notify();
			return state;
		})
		.finally(() => {
			refreshing = null;
		});
	return refreshing;
}

function useStore() {
	const [, setTick] = React.useState(0);
	React.useEffect(() => {
		const listener = () => setTick((value) => value + 1);
		subscribers.add(listener);
		if (state.loadedAt === 0) refreshState();
		return () => subscribers.delete(listener);
	}, []);
	return state;
}
//#endregion

//#region shared view helpers
const h = React.createElement;
/** Connection state -> dictionary key; an unknown state shows its raw name. */
const STATUS_KEY = { ready: "card.status.ready", connecting: "card.status.connecting", refreshing: "card.status.refreshing", reconnecting: "card.status.reconnecting", error: "card.status.error", needs_auth: "card.status.needs_auth", disabled: "card.status.disabled" };
const statusText = (status) => (STATUS_KEY[status] ? tr(STATUS_KEY[status]) : status);
//#endregion

//#region connection page
/** Protocol name shown on a card; the protocol itself is not translated. */
const transportLabel = (transport) => (transport === "stdio" ? "stdio" : transport === "sse" ? "SSE" : "HTTP");

/** What a card shows as its endpoint: the command for stdio, the URL otherwise. */
function endpointOf(connection) {
	if (connection.transport === "stdio") {
		const args = connection.args || [];
		const line = [connection.command, ...args].filter((part) => part !== "").join(" ");
		return line || tr("card.noUrl");
	}
	return connection.url || tr("card.noUrl");
}

/** Human summary of the authorization mode, without the OAuth token state. */
function authSummary(connection) {
	const auth = connection.auth || {};
	if (auth.mode === "oauth") {
		const mode = auth.clientMode === "cimd" ? " · " + tr("card.auth.cimd") : auth.clientMode === "manual" ? " · " + tr("card.auth.manual") : "";
		return "OAuth 2.0" + mode;
	}
	if (auth.mode === "api") {
		const count = (auth.params || []).filter((param) => param.hasValue).length;
		return count > 0 ? tr("card.auth.params", { count }) : tr("card.auth.noParams");
	}
	return tr("editor.auth.none");
}

/** One labelled input. */
function Field(props) {
	const reactId = React.useId();
	const id = props.id || reactId;
	return h(
		"div",
		{ className: "mcp-field" },
		h("label", { className: "mcp-label", htmlFor: id }, props.label),
		props.kind === "select"
			? h(
					"div",
					{ className: "mcp-select-wrap" },
					h(
						"select",
						{ id, className: "mcp-select", value: props.value, onChange: (event) => props.onChange(event.target.value) },
						(props.options || []).map((option) => h("option", { key: option.value, value: option.value }, option.label))
					)
				)
			: h("input", {
					id,
					className: "mcp-input",
					value: props.value,
					placeholder: props.placeholder || "",
					onChange: (event) => props.onChange(event.target.value),
					type: props.type || "text",
					autoComplete: "off",
					spellCheck: false
				})
	);
}

/** One labelled multi-line input. */
function TextArea(props) {
	const reactId = React.useId();
	const id = props.id || reactId;
	return h(
		"div",
		{ className: "mcp-field" },
		props.label ? h("label", { className: "mcp-label", htmlFor: id }, props.label) : null,
		h("textarea", {
			id,
			className: "mcp-textarea",
			"aria-label": props.ariaLabel,
			value: props.value,
			placeholder: props.placeholder || "",
			onChange: (event) => props.onChange(event.target.value),
			spellCheck: false
		})
	);
}

/** One section of the editor form. */
function Group(props) {
	return h("fieldset", { className: "mcp-group" }, h("legend", { className: "mcp-group-title" }, props.title), props.children);
}

/** Form for one connection: transport, target, authorization. */
function ConnectionEditor(props) {
	const connection = props.connection;
	const isNew = !connection;
	const [draft, setDraft] = React.useState(() =>
		isNew
			? { name: "", transport: "http", url: "", command: "", argsText: "", envText: "", cwd: "", note: "", enabled: false, authMode: "none", scopes: "", clientMode: "auto", clientId: "", clientSecret: "", params: [] }
			: {
					id: connection.id,
					name: connection.name,
					transport: connection.transport,
					url: connection.url || "",
					command: connection.command || "",
					argsText: (connection.args || []).join("\n"),
					envText: Object.entries(connection.env || {}).map(([key, value]) => key + "=" + value).join("\n"),
					cwd: connection.cwd || "",
					note: connection.note || "",
					enabled: connection.enabled,
					authMode: (connection.auth && connection.auth.mode) || "none",
					scopes: (connection.auth && connection.auth.scopes) || "",
					clientMode: (connection.auth && connection.auth.clientMode) || "auto",
					clientId: (connection.auth && connection.auth.clientId) || "",
					clientSecret: "",
					params: ((connection.auth && connection.auth.params) || []).map((param) => ({ in: param.in, name: param.name, value: "" }))
				}
	);
	const [busy, setBusy] = React.useState("");
	const [error, setError] = React.useState("");
	const [testResult, setTestResult] = React.useState(null);
	const set = (patch) => setDraft((current) => ({ ...current, ...patch }));

	React.useEffect(() => {
		const onKey = (event) => {
			if (event.key === "Escape") props.onDone();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [props.onDone]);

	/** The one field that makes this draft testable, as a dictionary key. */
	const missingKey = () => {
		if (draft.transport === "stdio") return draft.command.trim() === "" ? "editor.error.command" : "";
		return draft.url.trim() === "" ? "editor.error.url" : "";
	};

	const payload = () => ({
		record: {
			id: draft.id,
			name: draft.name.trim() || draft.command || draft.url || tr("common.noName"),
			enabled: draft.enabled,
			transport: draft.transport,
			url: draft.url.trim(),
			command: draft.command.trim(),
			args: draft.argsText
				.split("\n")
				.map((line) => line.trim())
				.filter((line) => line !== ""),
			env: Object.fromEntries(
				draft.envText
					.split("\n")
					.map((line) => line.trim())
					.filter((line) => line !== "" && line.indexOf("=") > 0)
					.map((line) => [line.slice(0, line.indexOf("=")), line.slice(line.indexOf("=") + 1)])
			),
			cwd: draft.cwd.trim(),
			auth: {
				mode: draft.authMode,
				scopes: draft.authMode === "oauth" ? draft.scopes.trim() : "",
				clientMode: draft.authMode === "oauth" ? draft.clientMode : "auto",
				clientId: draft.authMode === "oauth" ? draft.clientId.trim() : "",
				clientSecret: draft.authMode === "oauth" ? draft.clientSecret : undefined,
				params: draft.authMode === "api" ? draft.params : []
			},
			note: draft.note
		}
	});

	/**
	 * Create the record once, then update it. `Test` may already have created it — saving
	 * again must not add a second connection with the same name.
	 */
	const persist = async () => {
		const body = payload();
		if (draft.id) return api("/connections/" + encodeURIComponent(draft.id), { method: "PUT", body: JSON.stringify(body) });
		return api("/connections", { method: "POST", body: JSON.stringify(body) });
	};

	const save = async () => {
		const missing = missingKey();
		if (missing !== "") {
			setError(tr(missing));
			return;
		}
		setBusy("save");
		setError("");
		try {
			await persist();
			await refreshState();
			props.onDone();
		} catch (error) {
			setError(error.message || String(error));
		} finally {
			setBusy("");
		}
	};

	const test = async () => {
		const missing = missingKey();
		if (missing !== "") {
			setError(tr(missing));
			return;
		}
		setBusy("test");
		setError("");
		setTestResult(null);
		try {
			// The probe needs the host to hold the record (and its secret), so persist first.
			let id = draft.id;
			if (!id) {
				const created = await api("/connections", { method: "POST", body: JSON.stringify(payload()) });
				id = created.connection.id;
				set({ id });
			} else {
				await api("/connections/" + encodeURIComponent(id), { method: "PUT", body: JSON.stringify(payload()) });
			}
			setTestResult(await api("/connections/" + encodeURIComponent(id) + "/test", { method: "POST", body: "{}" }));
			await refreshState();
		} catch (error) {
			setError(error.message || String(error));
		} finally {
			setBusy("");
		}
	};

	return h(
		"section",
		{ className: "mcp-editor", "aria-label": isNew ? tr("editor.title.new") : tr("editor.title.edit", { name: connection.name }) },
		h(
			"header",
			{ className: "mcp-editor-head" },
			h("h2", { className: "mcp-editor-title" }, isNew ? tr("editor.title.new") : tr("editor.title.edit", { name: connection.name })),
			h(
				"button",
				{ type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", style: { marginLeft: "auto" }, title: tr("common.close"), "aria-label": tr("common.close"), onClick: props.onDone },
				h(Glyph, { name: "close" })
			)
		),
		h(
			"div",
			{ className: "mcp-editor-body" },
			h(
				Group,
				{ title: tr("editor.section.main") },
				h(
					"div",
					{ className: "mcp-grid-2" },
					h(Field, { label: tr("editor.name"), value: draft.name, placeholder: tr("editor.name.ph"), onChange: (value) => set({ name: value }) }),
					h(Field, {
						label: tr("editor.transport"),
						kind: "select",
						value: draft.transport,
						options: [
							{ value: "http", label: "Streamable HTTP" },
							{ value: "sse", label: "SSE" },
							{ value: "stdio", label: tr("editor.transport.stdio") }
						],
						onChange: (value) => set({ transport: value })
					})
				),
				draft.transport === "stdio"
					? h(
							"div",
							{ className: "mcp-stack" },
							h(
								"div",
								{ className: "mcp-grid-2" },
								h(Field, { label: tr("editor.command"), value: draft.command, placeholder: "npx", onChange: (value) => set({ command: value }) }),
								h(Field, { label: tr("editor.cwd"), value: draft.cwd, placeholder: "/opt/mcp", onChange: (value) => set({ cwd: value }) })
							),
							h(TextArea, { label: tr("editor.args"), value: draft.argsText, placeholder: "-y\n@modelcontextprotocol/server-everything", onChange: (value) => set({ argsText: value }) }),
							h(TextArea, { label: tr("editor.env"), value: draft.envText, placeholder: "API_KEY=xxx", onChange: (value) => set({ envText: value }) })
						)
					: h(Field, { label: tr("editor.url"), value: draft.url, placeholder: "https://mcp.example.com/mcp", onChange: (value) => set({ url: value }) }),
				h(Field, { label: tr("editor.note"), value: draft.note, onChange: (value) => set({ note: value }) })
			),
			h(
				Group,
				{ title: tr("editor.section.auth") },
				h(Field, {
					label: tr("editor.auth.mode"),
					kind: "select",
					value: draft.authMode,
					options: [
						{ value: "none", label: tr("editor.auth.none") },
						{ value: "api", label: tr("editor.auth.api") },
						{ value: "oauth", label: tr("editor.auth.oauth") }
					],
					onChange: (value) => set({ authMode: value })
				}),
				draft.authMode === "api"
					? h(
							"div",
							{ className: "mcp-params" },
							draft.params.length === 0 ? h("div", { className: "mcp-hint" }, tr("editor.params.empty")) : null,
							draft.params.map((param, index) =>
								h(
									"div",
									{ key: index, className: "mcp-param" },
									h(
										"div",
										{ className: "mcp-select-wrap" },
										h(
											"select",
											{
												className: "mcp-select",
												"aria-label": tr("editor.params.in"),
												value: param.in,
												onChange: (event) => {
													const next = draft.params.slice();
													next[index] = { ...param, in: event.target.value };
													set({ params: next });
												}
											},
											h("option", { value: "header" }, "Header"),
											h("option", { value: "query" }, "Query"),
											h("option", { value: "body" }, "Body")
										)
									),
									h("input", {
										className: "mcp-input",
										"aria-label": tr("editor.params.name"),
										value: param.name,
										placeholder: tr("editor.params.name"),
										onChange: (event) => {
											const next = draft.params.slice();
											next[index] = { ...param, name: event.target.value };
											set({ params: next });
										}
									}),
									h("input", {
										className: "mcp-input mcp-param-value",
										"aria-label": tr("editor.params.value"),
										value: param.value,
										placeholder: tr("editor.params.value"),
										type: "password",
										autoComplete: "off",
										onChange: (event) => {
											const next = draft.params.slice();
											next[index] = { ...param, value: event.target.value };
											set({ params: next });
										}
									}),
									h(
										"button",
										{ type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", title: tr("common.delete"), "aria-label": tr("common.delete"), onClick: () => set({ params: draft.params.filter((_, at) => at !== index) }) },
										h(Glyph, { name: "trash" })
									)
								)
							),
							h(
								"button",
								{ type: "button", className: "mcp-btn mcp-btn--secondary mcp-btn--sm", style: { justifySelf: "start" }, onClick: () => set({ params: draft.params.concat([{ in: "header", name: "", value: "" }]) }) },
								h(Glyph, { name: "plus" }),
								tr("editor.params.add")
							),
							h("div", { className: "mcp-hint" }, tr("editor.params.secret"))
						)
					: null,
				draft.authMode === "oauth"
					? h(
							"div",
							{ className: "mcp-field" },
							h(Field, { label: tr("editor.scope"), value: draft.scopes, placeholder: tr("editor.scope.ph"), onChange: (value) => set({ scopes: value }) }),
							h(Field, {
								label: tr("editor.clientMode"),
								kind: "select",
								value: draft.clientMode,
								options: [
									{ value: "auto", label: tr("editor.clientMode.auto") },
									{ value: "cimd", label: tr("editor.clientMode.cimd") },
									{ value: "manual", label: tr("editor.clientMode.manual") }
								],
								onChange: (value) => set({ clientMode: value })
							}),
							draft.clientMode === "cimd" ? h("div", { className: "mcp-hint" }, tr("editor.cimd.hint", { url: window.location.origin + "/api/mcp-apps/oauth/client-metadata.json" })) : null,
							draft.clientMode === "manual" ? h(Field, { label: tr("editor.clientId"), value: draft.clientId, placeholder: tr("editor.clientId.ph"), onChange: (value) => set({ clientId: value }) }) : null,
							draft.clientMode === "manual"
								? h(Field, { label: tr("editor.clientSecret"), value: draft.clientSecret, type: "password", placeholder: tr("editor.clientSecret.ph"), onChange: (value) => set({ clientSecret: value }) })
								: null,
							h("div", { className: "mcp-hint" }, tr("editor.oauth.hint"))
						)
					: null
			),
			h(
				Group,
				{ title: tr("editor.section.options") },
				h(Switch, { checked: draft.enabled, label: tr("editor.enable"), onChange: (value) => set({ enabled: value }) }),
				h("div", { className: "mcp-hint" }, tr("editor.enableHint"))
			)
		),
		error ? h("div", { className: "mcp-alert", role: "alert" }, error) : null,
		testResult
			? testResult.ok
				? h(
						"div",
						{ className: "mcp-alert mcp-alert--ok", role: "status" },
						h("div", null, tr("editor.test.ok", { count: (testResult.tools || []).length })),
						h(
							"div",
							{ className: "mcp-stats", style: { marginTop: "4px", gap: "4px" } },
							(testResult.tools || []).slice(0, 40).map((tool) => h("span", { key: tool.name, className: "mcp-chip" }, h("code", null, tool.name), tool.resourceUri ? " ui://" : null))
						)
					)
				: h("div", { className: "mcp-alert", role: "alert" }, tr("editor.test.error", { message: testResult.error }))
			: null,
		h(
			"footer",
			{ className: "mcp-editor-foot" },
			h("span", { className: "mcp-hint" }, tr("editor.hint.test")),
			h(
				"button",
				{ type: "button", className: "mcp-btn mcp-btn--secondary", disabled: busy !== "", onClick: test },
				h(Glyph, { name: "check" }),
				busy === "test" ? tr("common.testing") : tr("editor.test")
			),
			h("button", { type: "button", className: "mcp-btn mcp-btn--primary", disabled: busy !== "", onClick: save }, busy === "save" ? tr("common.saving") : isNew ? tr("editor.save") : tr("common.save")),
			h("button", { type: "button", className: "mcp-btn mcp-btn--ghost", onClick: props.onDone }, tr("common.cancel"))
		)
	);
}

/** One connection card in the list. */
function ConnectionCard(props) {
	const connection = props.connection;
	const [busy, setBusy] = React.useState("");
	const [error, setError] = React.useState("");
	const [feedback, setFeedback] = React.useState("");
	const [confirming, setConfirming] = React.useState(false);
	const run = async (label, action) => {
		setBusy(label);
		setError("");
		setFeedback("");
		try {
			const result = await action();
			await refreshState();
			if (result && Array.isArray(result.tools)) setFeedback(tr("editor.test.ok", { count: result.tools.length }));
			return result;
		} catch (error) {
			setError(error.message || String(error));
		} finally {
			setBusy("");
		}
	};
	const status = connection.status || (connection.enabled ? "connecting" : "disabled");
	/** The last catalog the host holds, whatever the current status is: a stale list is still worth reading. */
	const toolTotal = (connection.tools || []).length;
	const oauthMode = connection.auth && connection.auth.mode === "oauth";
	const authorized = !!(connection.auth && connection.auth.oauth && connection.auth.oauth.authorized);
	const authorize = async () => {
		setBusy("auth");
		setError("");
		setFeedback("");
		try {
			const body = await api("/connections/" + encodeURIComponent(connection.id) + "/oauth-start", { method: "POST", body: "{}" });
			if (!body.ok) throw hostError(body, "card.auth.startFail");
			if (body.status === "AUTHORIZED") {
				await refreshState();
				return;
			}
			const popup = window.open(body.authorizationUrl, "_blank", "width=560,height=680");
			if (!popup) {
				setError(tr("card.auth.blocked", { url: body.authorizationUrl }));
				return;
			}
			// The callback lands in that window; poll until the host holds tokens.
			for (let attempt = 0; attempt < 90; attempt++) {
				await new Promise((resolve) => setTimeout(resolve, 2000));
				await refreshState();
				const current = state.connections.find((candidate) => candidate.id === connection.id);
				if (current && current.auth && current.auth.oauth && current.auth.oauth.authorized) return;
				if (popup.closed && attempt > 2) return;
			}
		} catch (error) {
			setError(error.message || String(error));
		} finally {
			setBusy("");
		}
	};
	return h(
		"article",
		{ className: "mcp-card" + (connection.enabled ? "" : " mcp-card--off") },
		h(
			"div",
			{ className: "mcp-card-head" },
			h("span", { className: "mcp-status", "data-state": status, "aria-hidden": true }),
			h("h2", { className: "mcp-card-name" }, connection.name),
			h("span", { className: "mcp-chip" }, transportLabel(connection.transport)),
			toolTotal > 0
				? h(
					"button",
					{ type: "button", className: "mcp-chip mcp-chip--action", title: tr("tools.title"), onClick: () => props.onTools(connection) },
					tr("card.tools", { count: toolTotal }),
					h(Glyph, { name: "chevron" })
				)
				: null,
			oauthMode ? h("span", { className: authorized ? "mcp-chip mcp-chip--ok" : "mcp-chip mcp-chip--warn" }, authorized ? tr("card.auth.authorized") : tr("card.auth.unauthorized")) : null,
			h("span", { className: "mcp-card-status" }, statusText(status)),
			h(
				"div",
				{ className: "mcp-card-tools" },
				h(
					"button",
					{ type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", title: tr("common.edit"), "aria-label": tr("common.edit"), onClick: () => props.onEdit(connection) },
					h(Glyph, { name: "edit" })
				),
				h(
					"button",
					{
						type: "button",
						className: "mcp-btn mcp-btn--icon mcp-btn--sm",
						title: tr("common.test"),
						"aria-label": tr("common.test"),
						disabled: busy !== "",
						"aria-busy": busy === "test",
						onClick: () => void run("test", () => api("/connections/" + encodeURIComponent(connection.id) + "/test", { method: "POST", body: "{}" }))
					},
					busy === "test" ? h(Spinner) : h(Glyph, { name: "check" })
				),
				h(
					"button",
					{
						type: "button",
						className: "mcp-btn mcp-btn--icon mcp-btn--sm",
						title: tr("card.refresh"),
						"aria-label": tr("card.refresh"),
						disabled: busy !== "" || !connection.enabled,
						"aria-busy": busy === "refresh",
						onClick: () =>
							void run("refresh", async () => {
								await api("/connections/" + encodeURIComponent(connection.id) + "/refresh", { method: "POST", body: "{}" });
								setFeedback(tr("card.refreshed"));
								return undefined;
							})
					},
					busy === "refresh" ? h(Spinner) : h(Glyph, { name: "refresh" })
				),
				h(
					Menu,
					{ label: tr("card.menu.more") },
					oauthMode && authorized
						? h(MenuItem, {
								icon: "refresh",
								disabled: busy !== "",
								onSelect: () => void run("oauth-reset", () => api("/connections/" + encodeURIComponent(connection.id) + "/oauth-reset", { method: "POST", body: "{}" }))
							}, tr("card.auth.reset"))
						: null,
					h(
						MenuItem,
						{
							icon: "trash",
							danger: true,
							disabled: busy !== "",
							onSelect: () => setConfirming(true)
						},
						tr("common.delete")
					)
				),
				h(Switch, {
					hideLabel: true,
					checked: connection.enabled,
					disabled: busy !== "",
					label: tr("card.enableTools"),
					onChange: (next) =>
						void run("toggle", () =>
							api("/connections/" + encodeURIComponent(connection.id) + "/enabled", {
								method: "POST",
								body: JSON.stringify({ enabled: next })
							})
						)
				})
			)
		),
		h(
			"div",
			{ className: "mcp-card-meta" },
			h(
				"span",
				{ className: "mcp-endpoint" },
				h("code", { title: endpointOf(connection) }, endpointOf(connection)),
				h(CopyButton, { value: endpointOf(connection), label: tr("card.copy"), copiedLabel: tr("card.copied") })
			),
			h("span", { className: "mcp-meta-sep" }, "·"),
			h("span", null, authSummary(connection)),
			connection.enabled && connection.lastListedAt
				? h("span", { className: "mcp-meta-sep mcp-meta-time" }, "·")
				: null,
			connection.enabled && connection.lastListedAt ? h("span", { className: "mcp-meta-time" }, tr("card.listedAt", { time: new Date(connection.lastListedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })) : null
		),
		connection.note ? h("p", { className: "mcp-note" }, connection.note) : null,
		error ? h("div", { className: "mcp-alert", role: "alert" }, error) : null,
		feedback ? h("div", { className: "mcp-alert mcp-alert--ok", role: "status" }, feedback) : null,
		!error && connection.status === "error" && connection.error ? h("div", { className: "mcp-alert", role: "alert" }, connection.error) : null,
		confirming
			? h(
					"div",
					{ className: "mcp-alert", role: "alert" },
					h("span", { style: { flex: 1 } }, tr("card.delete.confirm", { name: connection.name })),
					h(
						"button",
						{
							type: "button",
							className: "mcp-btn mcp-btn--danger mcp-btn--sm",
							disabled: busy !== "",
							onClick: () => void run("delete", () => api("/connections/" + encodeURIComponent(connection.id), { method: "DELETE" }))
						},
						tr("common.delete")
					),
					h("button", { type: "button", className: "mcp-btn mcp-btn--ghost mcp-btn--sm", onClick: () => setConfirming(false) }, tr("common.cancel"))
				)
			: null,
		oauthMode
			? h(
					"div",
					{ className: "mcp-card-actions" },
					h(
						"button",
						{ type: "button", className: authorized ? "mcp-btn mcp-btn--secondary mcp-btn--sm" : "mcp-btn mcp-btn--primary mcp-btn--sm", disabled: busy !== "", onClick: authorize },
						busy === "auth" ? tr("card.auth.waiting") : authorized ? tr("card.auth.reauthorize") : tr("card.auth.login")
					)
				)
			: null
	);
}

/** Tools rendered per group before the list folds behind "Show all". */
const GROUP_PAGE = 50;
/** A plain list shorter than this still fits on one screen, so search stays out of the way. */
const SEARCH_FROM = 8;

/** One catalog row: the name the server uses, its optional title, description and badges. */
function ToolRow(props) {
	const tool = props.tool;
	const description = tool.description || "";
	return h(
		"li",
		{ className: "mcp-tool" },
		h(
			"div",
			{ className: "mcp-tool-line" },
			h("code", { className: "mcp-tool-name" }, tool.name),
			tool.destructive ? h("span", { className: "mcp-chip mcp-chip--warn" }, tr("tools.destructive")) : null,
			tool.resourceUri ? h("span", { className: "mcp-chip" }, "ui://") : null,
			h("span", { className: "mcp-tool-copy" }, h(CopyButton, { value: props.publicName, label: tr("tools.copyName"), copiedLabel: tr("card.copied") }))
		),
		tool.title ? h("p", { className: "mcp-tool-title" }, tool.title) : null,
		description ? h("p", { className: "mcp-tool-desc", title: description.length > 220 ? description : undefined }, description) : null
	);
}

/**
 * The tool catalog of one connection, in its own card above the list.
 *
 * The access side comes from the host (`access`), so this component never guesses: it groups
 * what it was given, keeps tools nobody could classify under "Not determined" instead of
 * filing them under the wrong side, and says at the bottom whether the groups rest on the
 * server's annotations or on the name fallback. The list is the host's current catalog: the
 * connection card only offers this view while that catalog exists, and a refresh keeps it on
 * screen instead of blanking it.
 */
function ToolsCard(props) {
	const connection = props.connection;
	const tools = connection.tools || [];
	const status = connection.status || (connection.enabled ? "connecting" : "disabled");
	const [query, setQuery] = React.useState("");
	/** Per group: the whole list instead of its first page. */
	const [showAll, setShowAll] = React.useState({});
	const [busy, setBusy] = React.useState(false);
	const [error, setError] = React.useState("");
	const searchRef = React.useRef(null);

	React.useEffect(() => {
		const onKey = (event) => {
			if (event.key === "Escape") props.onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [props.onClose]);

	React.useEffect(() => {
		if (searchRef.current) searchRef.current.focus();
	}, []);

	const needle = query.trim().toLowerCase();
	const matches = (tool) =>
		needle === "" || [tool.name, tool.title, tool.description].some((value) => String(value || "").toLowerCase().includes(needle));

	const grouped = { read: [], write: [], unknown: [] };
	for (const tool of tools) (grouped[tool.access] || grouped.unknown).push(tool);
	for (const list of Object.values(grouped)) list.sort((left, right) => String(left.name).localeCompare(String(right.name)));

	const refresh = async () => {
		setBusy(true);
		setError("");
		try {
			await api("/connections/" + encodeURIComponent(connection.id) + "/refresh", { method: "POST", body: "{}" });
			await refreshState();
		} catch (failure) {
			setError(failure.message || String(failure));
		} finally {
			setBusy(false);
		}
	};

	/** Why the catalog is missing or old, in one line; empty when it is current. */
	const staleLine = () => {
		if (status === "disabled") return tr("tools.disabled");
		if (status === "reconnecting") return tr("tools.reconnecting");
		if (status === "connecting" || status === "refreshing") return tr("tools.connecting");
		if (status === "error") return tr("tools.error.empty");
		if (status === "needs_auth") return tr("tools.auth");
		return "";
	};

	/** What to show instead of the list when the host holds no catalog at all. */
	const emptyLine = () => {
		if (status === "disabled") return tr("tools.disabled.empty");
		if (status === "reconnecting") return tr("tools.reconnecting");
		if (status === "connecting" || status === "refreshing") return tr("tools.connecting");
		if (status === "needs_auth") return tr("tools.auth");
		if (status === "error") return tr("tools.error.empty");
		if (connection.lastListedAt) return tr("tools.none");
		return tr("tools.neverListed");
	};

	const annotated = tools.filter((tool) => tool.accessSource === "annotation").length;
	const sourceNote = annotated === tools.length ? tr("tools.source.annotation") : annotated === 0 ? tr("tools.source.heuristic") : tr("tools.source.mixed");
	const visible = tools.filter(matches);

	const renderGroup = (key) => {
		const list = grouped[key].filter(matches);
		if (list.length === 0) return null;
		const shown = showAll[key] ? list : list.slice(0, GROUP_PAGE);
		const headingId = "mcp-tool-group-" + key;
		return h(
			"section",
			{ key, className: "mcp-tool-group", "aria-labelledby": headingId },
			h(
				"h3",
				{ className: "mcp-tool-group-title", id: headingId },
				tr("tools.group." + key),
				" ",
				h("span", { className: "mcp-tool-group-count" }, list.length)
			),
			h(
				"ul",
				{ className: "mcp-tool-list" },
				shown.map((tool) => h(ToolRow, { key: tool.name, tool, publicName: publicToolName(connection.id, tool.name) }))
			),
			list.length > shown.length
				? h(
					"button",
					{ type: "button", className: "mcp-btn mcp-btn--ghost mcp-btn--sm mcp-tools-more", onClick: () => setShowAll((current) => ({ ...current, [key]: true })) },
					tr("tools.showAll")
				)
				: null
		);
	};

	return h(
		"section",
		{ className: "mcp-editor mcp-tools", "aria-labelledby": "mcp-tools-title" },
		h(
			"header",
			{ className: "mcp-editor-head" },
			h(
				"div",
				{ className: "mcp-editor-heading" },
				h("h2", { className: "mcp-editor-title", id: "mcp-tools-title" }, tr("tools.title")),
				h("span", { className: "mcp-tools-subject", title: connection.name }, connection.name)
			),
			h("span", { className: "mcp-card-status" }, statusText(status)),
			h(
				"button",
				{ type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", title: tr("common.close"), "aria-label": tr("common.close"), onClick: props.onClose },
				h(Glyph, { name: "close" })
			)
		),
		h(
			"div",
			{ className: "mcp-editor-body" },
			tools.length > 0
				? h(
					"div",
					{ className: "mcp-tools-summary" },
					["read", "write", "unknown"]
						.filter((key) => grouped[key].length > 0)
						.map((key) => h("span", { key, className: "mcp-chip" }, tr("tools.group." + key) + " · " + grouped[key].length))
				)
				: null,
			tools.length >= SEARCH_FROM
				? h(
					"div",
					{ className: "mcp-tools-search" },
					h("input", {
						ref: searchRef,
						className: "mcp-input",
						type: "text",
						value: query,
						placeholder: tr("tools.search"),
						"aria-label": tr("tools.search"),
						onChange: (event) => setQuery(event.target.value)
					}),
					query === ""
						? null
						: h(
							"button",
							{ type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", title: tr("tools.search.clear"), "aria-label": tr("tools.search.clear"), onClick: () => setQuery("") },
							h(Glyph, { name: "close" })
						)
				)
				: null,
			tools.length === 0
				? h("p", { className: "mcp-tools-empty" }, emptyLine())
				: visible.length === 0
					? h("p", { className: "mcp-tools-empty" }, tr("tools.search.empty"))
					: h("div", { className: "mcp-tools-groups" }, ["read", "write", "unknown"].map(renderGroup)),
			tools.length > 0 ? h("p", { className: "mcp-hint" }, sourceNote) : null,
			connection.toolsTruncated ? h("p", { className: "mcp-hint" }, tr("tools.truncated", { max: tools.length })) : null,
			tools.length > 0 && staleLine() !== "" ? h("p", { className: "mcp-hint" }, staleLine()) : null,
			error ? h("div", { className: "mcp-alert", role: "alert" }, error) : null
		),
		h(
			"footer",
			{ className: "mcp-editor-foot" },
			connection.lastListedAt
				? h("span", { className: "mcp-hint" }, tr("card.listedAt", { time: new Date(connection.lastListedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }))
				: null,
			h(
				"button",
				{ type: "button", className: "mcp-btn mcp-btn--secondary mcp-btn--sm", style: { marginLeft: "auto" }, disabled: busy || !connection.enabled, onClick: () => void refresh() },
				busy ? h(Spinner) : h(Glyph, { name: "refresh" }),
				tr("card.refresh")
			)
		)
	);
}

/** Placeholder rows shown while the first state read is in flight. */
function LoadingCards() {
	return h(
		"div",
		{ className: "mcp-list", role: "status", "aria-label": tr("panel.loading") },
		[0, 1, 2].map((index) =>
			h(
				"div",
				{ key: index, className: "mcp-skeleton-card", "aria-hidden": true },
				h("div", { className: "mcp-skeleton-line mcp-skeleton-line--title" }),
				h("div", { className: "mcp-skeleton-line mcp-skeleton-line--wide" }),
				h("div", { className: "mcp-skeleton-line mcp-skeleton-line--short" })
			)
		)
	);
}

/** Empty list: the two ways to create the first connection. */
function EmptyState(props) {
	return h(
		"div",
		{ className: "mcp-empty" },
		h("span", { className: "mcp-empty-icon" }, h(Glyph, { name: "plug", size: 22 })),
		h("h2", { className: "mcp-empty-title" }, tr("panel.empty.title")),
		h("p", { className: "mcp-empty-text" }, tr("panel.empty.text")),
		h(
			"div",
			{ className: "mcp-empty-actions" },
			h("button", { type: "button", className: "mcp-btn mcp-btn--primary", onClick: props.onAdd }, h(Glyph, { name: "plus" }), tr("panel.add")),
			h("button", { type: "button", className: "mcp-btn mcp-btn--secondary", onClick: props.onImport }, tr("panel.import.short"))
		)
	);
}

/** The import form for a Claude Code `mcpServers` block. */
function ImportCard(props) {
	return h(
		"section",
		{ className: "mcp-editor", "aria-label": tr("panel.import.title") },
		h(
			"header",
			{ className: "mcp-editor-head" },
			h("h2", { className: "mcp-editor-title" }, tr("panel.import.title")),
			h(
				"button",
				{ type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", style: { marginLeft: "auto" }, title: tr("common.close"), "aria-label": tr("common.close"), onClick: props.onCancel },
				h(Glyph, { name: "close" })
			)
		),
		h(
			"div",
			{ className: "mcp-editor-body" },
			h(TextArea, {
				value: props.value,
				ariaLabel: tr("panel.import.json"),
				placeholder:
					'{\n  "mcpServers": {\n    "notion": { "type": "http", "url": "https://mcp.notion.com/mcp", "headers": { "Authorization": "Bearer xxx" } },\n    "local": { "command": "npx", "args": ["-y", "some-mcp"] }\n  }\n}',
				onChange: props.onChange
			}),
			props.error ? h("div", { className: "mcp-alert", role: "alert" }, props.error) : null
		),
		h(
			"footer",
			{ className: "mcp-editor-foot" },
			h("span", { className: "mcp-hint" }, tr("panel.import.hint")),
			h("button", { type: "button", className: "mcp-btn mcp-btn--primary", disabled: props.busy || props.value.trim() === "", onClick: props.onImport }, props.busy ? tr("panel.import.busy") : tr("panel.import.action")),
			h("button", { type: "button", className: "mcp-btn mcp-btn--ghost", onClick: props.onCancel }, tr("common.cancel"))
		)
	);
}

/** The 「Подключения」 page: list, add form, servers.json import. */
function ConnectAppsPage() {
	useLocaleRevision();
	const view = useStore();
	const [editing, setEditing] = React.useState(null);
	const [creating, setCreating] = React.useState(false);
	const [importing, setImporting] = React.useState(false);
	/** Connection id whose catalog card is open; the id survives a state refresh, the object does not. */
	const [toolsFor, setToolsFor] = React.useState(null);
	const [importText, setImportText] = React.useState("");
	const [importError, setImportError] = React.useState("");
	const [busy, setBusy] = React.useState(false);
	/** The page is its own scrollport; opening a card from far down has to bring it back. */
	const pageRef = React.useRef(null);
	const scrollToTop = () => {
		if (pageRef.current) pageRef.current.scrollTop = 0;
	};

	React.useEffect(() => {
		const onMessage = (event) => {
			if (event && event.data === "mcp-apps-oauth-done") void refreshState();
		};
		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, []);

	const openEditor = (target) => {
		scrollToTop();
		setEditing(target);
		setCreating(!target);
		setImporting(false);
		setToolsFor(null);
	};

	/** The import card follows the same rule: it opens above whatever was on screen. */
	const openImport = () => {
		scrollToTop();
		setImporting(true);
		setCreating(false);
		setEditing(null);
		setToolsFor(null);
	};

	/** The catalog card is one of the cards that opens above the list, never beside it. */
	const openTools = (target) => {
		scrollToTop();
		setToolsFor(target.id);
		setEditing(null);
		setCreating(false);
		setImporting(false);
	};

	const doImport = async () => {
		setBusy(true);
		setImportError("");
		try {
			await api("/import", { method: "POST", body: JSON.stringify({ json: importText }) });
			setImporting(false);
			setImportText("");
			await refreshState();
		} catch (error) {
			setImportError(error.message || String(error));
		} finally {
			setBusy(false);
		}
	};

	const connections = view.connections;
	/** A deleted connection closes the catalog card by itself: the id stops resolving. */
	const toolsConnection = toolsFor === null ? null : connections.find((connection) => connection.id === toolsFor) || null;
	const workingCount = connections.filter((connection) => connection.enabled && connection.status === "ready").length;
	const errorCount = connections.filter((connection) => connection.status === "error").length;
	const toolCount = connections.reduce((total, connection) => total + (connection.enabled ? connection.toolCount || 0 : 0), 0);

	return h(
		"div",
		{ className: "mcp-root mcp-page", ref: pageRef },
		h(
			"header",
			{ className: "mcp-head" },
			h("div", { className: "mcp-head-text" }, h("h1", { className: "mcp-title" }, panelTitle()), h("p", { className: "mcp-intro" }, tr("panel.intro"))),
			h(
				"div",
				{ className: "mcp-head-actions" },
				!view.loading && connections.length === 0
					? null
					: h("button", { type: "button", className: "mcp-btn mcp-btn--primary", onClick: () => openEditor(null) }, h(Glyph, { name: "plus" }), tr("panel.add")),
				!view.loading && connections.length === 0
					? null
					: h("button", { type: "button", className: "mcp-btn mcp-btn--secondary", onClick: openImport }, tr("panel.import.short")),
				h(
					"button",
					{ type: "button", className: "mcp-btn mcp-btn--icon", title: tr("panel.refresh"), "aria-label": tr("panel.refresh"), onClick: () => void refreshState() },
					h(Glyph, { name: "refresh" })
				)
			)
		),
		!view.loading && connections.length > 0
			? h(
					"div",
					{ className: "mcp-stats" },
					h("span", { className: "mcp-chip" }, tr("panel.stats.connections", { count: connections.length })),
					h("span", { className: workingCount > 0 ? "mcp-chip mcp-chip--ok" : "mcp-chip" }, tr("panel.stats.working", { count: workingCount })),
					toolCount > 0 ? h("span", { className: "mcp-chip" }, tr("card.tools", { count: toolCount })) : null,
					errorCount > 0 ? h("span", { className: "mcp-chip mcp-chip--error" }, tr("panel.stats.errors", { count: errorCount })) : null
				)
			: null,
		view.error
			? h(
					"div",
					{ className: "mcp-alert", role: "alert" },
					h("span", { style: { flex: 1 } }, view.error),
					h("button", { type: "button", className: "mcp-btn mcp-btn--secondary mcp-btn--sm", onClick: () => void refreshState() }, tr("common.retry"))
				)
			: null,
		importing
			? h(ImportCard, {
					value: importText,
					error: importError,
					busy,
					onChange: setImportText,
					onImport: () => void doImport(),
					onCancel: () => setImporting(false)
				})
			: null,
		creating ? h(ConnectionEditor, { key: "new", onDone: () => setCreating(false) }) : null,
		editing ? h(ConnectionEditor, { key: editing.id, connection: editing, onDone: () => setEditing(null) }) : null,
		toolsConnection ? h(ToolsCard, { key: toolsConnection.id, connection: toolsConnection, onClose: () => setToolsFor(null) }) : null,
		view.error
			? null
			: view.loading
				? h(LoadingCards)
				: connections.length === 0
					? h(EmptyState, { onAdd: () => openEditor(null), onImport: openImport })
					: h(
							"div",
							{ className: "mcp-list" },
							connections.map((connection) => h(ConnectionCard, { key: connection.id, connection, onEdit: openEditor, onTools: openTools }))
						),
		view.storePath
			? h(
					"div",
					{ className: "mcp-foot" },
					h("span", null, tr("panel.store.label")),
					h("code", null, view.storePath),
					h(CopyButton, { value: view.storePath, label: tr("card.copyPath"), copiedLabel: tr("card.copied") })
				)
			: null
	);
}
//#endregion

//#region workbench app
/** The tool a freshly-opened App reads for its first snapshot. */
function snapshotToolFor(connectionId, currentRaw) {
	const connection = state.connections.find((candidate) => candidate.id === connectionId);
	const tools = (connection && connection.tools) || [];
	const readLike = /(^|_)(overview|summary|status|list|get)(_|$)/i;
	const pick = tools.find((tool) => readLike.test(tool.name) && tool.name !== currentRaw) || tools.find((tool) => readLike.test(tool.name));
	if (!pick) return null;
	return { name: pick.name, arguments: {} };
}

/** Colour scheme the host currently paints; MCP Apps receive it as `hostContext.theme`. */
function hostTheme() {
	if (typeof document === "undefined") return "light";
	const body = document.body;
	if (!body) return "light";
	if (body.hasAttribute("data-ds-dark-theme")) return "dark";
	if (document.documentElement.getAttribute("data-ds-dark-theme") !== null) return "dark";
	return "light";
}

/** One MCP App: its `ui://` resource rendered in a sandboxed frame with the UI protocol. */
function AppCard(props) {
	const toolName = props.toolName || "";
	const minHeight = props.minHeight || 420;
	const meta = toolMeta.get(toolName);
	const connectionId = meta ? meta.connectionId : props.connectionId || "";
	const [html, setHtml] = React.useState(null);
	const [status, setStatus] = React.useState("idle");
	const [error, setError] = React.useState("");
	const [height, setHeight] = React.useState(minHeight);
	const [attempt, setAttempt] = React.useState(0);
	const frameRef = React.useRef(null);
	const handshakeRef = React.useRef(false);
	const handshakeTimer = React.useRef(null);

	React.useEffect(() => {
		if (!meta || !meta.resourceUri || !connectionId) return undefined;
		let cancelled = false;
		setStatus("loading");
		setError("");
		setHtml(null);
		handshakeRef.current = false;
		mcpRpc(connectionId, "resources/read", { uri: meta.resourceUri })
			.then((result) => {
				const contents = (result && result.contents) || [];
				const page = contents.find((item) => item && typeof item.text === "string");
				if (!page) throw new Error(tr("error.resourceNotHtml", { uri: meta.resourceUri }));
				if (cancelled) return;
				setHtml(page.text);
				setStatus("ready");
				if (handshakeTimer.current) clearTimeout(handshakeTimer.current);
				handshakeTimer.current = setTimeout(() => {
					if (cancelled || handshakeRef.current) return;
					setError(tr("error.noHandshake"));
				}, HANDSHAKE_TIMEOUT_MS);
			})
			.catch((error) => {
				if (cancelled) return;
				setStatus("error");
				setError(error && error.message ? error.message : String(error));
			});
		return () => {
			cancelled = true;
			if (handshakeTimer.current) {
				clearTimeout(handshakeTimer.current);
				handshakeTimer.current = null;
			}
		};
	}, [connectionId, meta && meta.resourceUri, attempt]);

	React.useEffect(() => {
		const post = (message) => {
			const frame = frameRef.current;
			if (!frame || !frame.contentWindow) return;
			try {
				frame.contentWindow.postMessage(message, "*");
			} catch (error) {
				/* frame gone */
			}
		};

		const onMessage = (event) => {
			const frame = frameRef.current;
			if (!frame || event.source !== frame.contentWindow) return;
			const data = event.data;
			if (!data || data.jsonrpc !== "2.0") return;
			if (typeof data.method === "string" && data.id !== undefined && data.id !== null) {
				if (data.method === "ui/initialize") {
					post({
						jsonrpc: "2.0",
						id: data.id,
						result: {
							protocolVersion: UI_PROTOCOL,
							hostInfo: { name: "dsh-plugin-mcp-apps", version: __DSH_PLUGIN_VERSION__ },
							hostCapabilities: {},
							hostContext: { theme: hostTheme(), displayMode: "inline" }
						}
					});
					return;
				}
				if (data.method === "ui/resource-teardown") {
					post({ jsonrpc: "2.0", id: data.id, result: {} });
					return;
				}
				if (data.method === "ui/open-link" || data.method === "ui/notifications/open-link") {
					const url = data.params && data.params.url;
					if (url) window.open(url, "_blank", "noopener");
					if (data.id !== undefined && data.id !== null) post({ jsonrpc: "2.0", id: data.id, result: {} });
					return;
				}
				if (!connectionId) {
					post({ jsonrpc: "2.0", id: data.id, error: { code: -32000, message: tr("error.notReady") } });
					return;
				}
				mcpRpc(connectionId, data.method, data.params)
					.then((result) => post({ jsonrpc: "2.0", id: data.id, result }))
					.catch((error) => post({ jsonrpc: "2.0", id: data.id, error: { code: -32000, message: error && error.message ? error.message : String(error) } }));
				return;
			}
			if (data.method === "ui/notifications/initialized") {
				handshakeRef.current = true;
				if (handshakeTimer.current) {
					clearTimeout(handshakeTimer.current);
					handshakeTimer.current = null;
				}
				setError("");
				const snapshot = snapshotToolFor(connectionId, meta ? meta.rawName : "");
				if (!snapshot || !connectionId) return;
				mcpRpc(connectionId, "tools/call", { name: snapshot.name, arguments: snapshot.arguments })
					.then((result) => post({ jsonrpc: "2.0", method: "ui/notifications/tool-result", params: result }))
					.catch((error) => setError(error && error.message ? error.message : String(error)));
				return;
			}
			if (data.method === "ui/notifications/size-changed") {
				const next = data.params && data.params.height;
				if (typeof next === "number" && next > 160) setHeight(Math.min(Math.round(next) + 8, 3200));
			}
		};

		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, [connectionId, meta && meta.rawName]);

	if (!meta || !meta.resourceUri) {
		return h("div", { className: "mcp-iframe-note" }, h(Glyph, { name: "plug" }), tr("app.noResource"));
	}

	return h(
		"div",
		{ className: "mcp-frame" },
		error ? h("div", { className: "mcp-alert", style: { margin: "8px" } }, error) : null,
		status === "error"
			? h(
					"div",
					{ style: { padding: "0 8px 8px" } },
					h("button", { type: "button", className: "mcp-btn mcp-btn--primary mcp-btn--sm", onClick: () => setAttempt((value) => value + 1) }, h(Glyph, { name: "refresh" }), tr("common.retry"))
				)
			: null,
		!html ? h("div", { className: "mcp-iframe-note", style: { margin: "8px" } }, status === "loading" ? tr("app.loading") : tr("app.preparing")) : null,
		html
			? h("iframe", {
					ref: frameRef,
					title: "MCP App: " + toolName,
					sandbox: "allow-scripts allow-forms",
					srcDoc: html,
					style: { display: "block", width: "100%", border: "0", background: "transparent", height: height + "px" }
				})
			: null
	);
}

/** Chat-side row: hands the interface to the right Sidebar, one line left behind. */
function WorkbenchRow(props) {
	useLocaleRevision();
	const phase = props.phase;
	const toolName = props.toolName || (props.block && props.block.name) || "";
	const callId = props.callId;
	const live = startedCalls.has(callId);
	const seen = openState.get(callId);
	const [view, setView] = React.useState(seen || "idle");
	const [message, setMessage] = React.useState("");
	const meta = toolMeta.get(toolName);

	const attempt = React.useCallback(() => {
		const result = openWorkbench(toolName, callId);
		setView(result.ok ? "opened" : "failed");
		setMessage(result.ok ? "" : result.message || "");
	}, [toolName, callId]);

	React.useEffect(() => {
		if (phase === "result") return;
		startedCalls.add(callId);
	}, [phase, callId]);

	React.useEffect(() => {
		if (phase !== "result" || !live) return;
		const known = openState.get(callId);
		if (known) {
			setView(known);
			return;
		}
		attempt();
	}, [phase, callId, live, attempt]);

	if (phase !== "result") {
		return h("div", { className: "mcp-iframe-note" }, h(Glyph, { name: "plug" }), tr("workbench.preparing"));
	}
	if (view === "idle") {
		return h(
			"div",
			{ className: "mcp-iframe-note" },
			h("span", null, tr("workbench.previousCall")),
			h("button", { type: "button", className: "mcp-btn mcp-btn--secondary mcp-btn--sm", onClick: attempt }, tr("workbench.openRight"))
		);
	}
	if (view === "opened") {
		return h(
			"div",
			{ className: "mcp-iframe-note" },
			h("span", { className: "mcp-workbench-title" }, tr("workbench.openedMarker")),
			h("span", null, tr("workbench.resultHint")),
			h("button", { type: "button", className: "mcp-btn mcp-btn--secondary mcp-btn--sm", onClick: attempt }, tr("workbench.openRight"))
		);
	}
	// Right column unavailable: render the App inline instead of losing it.
	const text = resultText(props.block);
	return h(
		"div",
		{ className: "mcp-list" },
		h(
			"div",
			{ className: "mcp-alert", role: "alert" },
			h("div", null, tr("workbench.failed")),
			message ? h("div", { style: { opacity: 0.8 } }, tr("workbench.reason", { message })) : null,
			meta && meta.resourceUri ? h("div", { style: { marginTop: "4px" } }, tr("workbench.resource", { uri: meta.resourceUri })) : null
		),
		h(AppCard, { toolName, minHeight: 420 }),
		text ? h("pre", { className: "mcp-iframe-note", style: { maxHeight: "220px", overflow: "auto", margin: 0 } }, text) : null
	);
}

/** Body of the right Sidebar's workbench tab. */
function WorkbenchBody(props) {
	useLocaleRevision();
	const useTabInfo = props.useTabInfo;
	const info = typeof useTabInfo === "function" ? useTabInfo() : null;
	const tab = info && info.tab;
	const navigation = (tab && tab.navigation) || {};
	const params = navigation.params || {};
	const revision = typeof navigation.revision === "number" ? navigation.revision : 0;
	const toolName = typeof params.toolName === "string" ? params.toolName : "";
	const meta = toolMeta.get(toolName);
	return h(
		"div",
		{ className: "mcp-root mcp-workbench" },
		h(
			"div",
			{ className: "mcp-workbench-head" },
			h("span", { className: "mcp-workbench-title" }, meta ? meta.connectionName : tr("tool.unknown")),
			meta ? h("span", null, "· " + meta.rawName) : null
		),
		h(AppCard, { key: revision, toolName, minHeight: 560 })
	);
}
//#endregion

//#region workbench routing
/** Client root context, captured so a tool row can open the tab. */
let shell = null;
/** Injected scope carrying the right Sidebar services. */
let rightScope = null;
/** Calls whose running row was rendered after this bundle loaded (i.e. live). */
const startedCalls = new Set();
const openState = new Map();
/** Registered tool rows, so discovery can add and remove them. */
const claims = new Map();

/** Open (or reveal) this Session's single workbench tab. */
function openWorkbench(toolName, callId) {
	try {
		const right = (rightScope && rightScope.sidebarRight) || (shell && shell.sidebarRight);
		if (!right) throw new Error(tr("error.sidebarMissing"));
		right.openTab(WORKBENCH_KIND, { params: { toolName, callId } });
		if (typeof right.isExpanded === "function" && typeof right.toggleExpanded === "function" && !right.isExpanded()) right.toggleExpanded();
		openState.set(callId, "opened");
		return { ok: true };
	} catch (error) {
		const message = error && error.message ? error.message : String(error);
		openState.set(callId, "failed");
		return { ok: false, message };
	}
}

/**
 * Register a chat row for every connected tool that advertises a `ui://`
 * resource. Called whenever `/state` refreshes; rows for vanished tools are
 * released so a disabled connection stops rendering in the transcript.
 */
function syncClaims() {
	if (!shell) return;
	const wanted = new Set();
	for (const [publicName, meta] of toolMeta) if (meta.resourceUri) wanted.add(publicName);
	for (const [publicName, dispose] of claims) {
		if (wanted.has(publicName)) continue;
		try {
			dispose();
		} catch (error) {
			/* already released */
		}
		claims.delete(publicName);
	}
	for (const publicName of wanted) {
		if (claims.has(publicName)) continue;
		try {
			claims.set(publicName, shell.slots.register({ name: "tool.call.toolview", key: publicName }, WorkbenchRow));
		} catch (error) {
			/* duplicate key */
		}
	}
}
//#endregion

export const inject = ["slots"];

/**
 * Register the left-sidebar page, the workbench tab, and the tool rows.
 * @param ctx - client root context.
 */
export function apply(ctx) {
	shell = ctx;
	ctx.effect(() => installStyles(), "mcp-apps: styles");

	// The client locale service, when the host ships it, owns the active language and the
	// registry our dictionaries belong to. Without it `tr()` keeps resolving against the
	// browser language, because the dictionaries ride in this bundle.
	ctx.inject(["locale"], (scope) => {
		scope.effect(() => scope.locale.register(NAMESPACE, dictionaries), "mcp-apps: dictionaries");
		setLanguage(scope.locale.getSnapshot().active);
		reportLocale();
		scope.effect(() => scope.on("locale/change", (snapshot) => {
			setLanguage(snapshot.active);
			reportLocale();
		}), "mcp-apps: locale changes");
	});

	ctx.slots.inject("main", () => ctx.slots.register({ name: "main", key: PANEL_ID }, ConnectAppsPage));
	ctx.slots.inject("sidebar.panellist", () =>
		ctx.slots.register(
			{ name: "sidebar.panellist", id: PANEL_ID, order: PANEL_ORDER, label: () => panelTitle() },
			function PanelIcon() {
				return h(
					"svg",
					{ width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true },
					h("path", { d: "M9 7V3M15 7V3" }),
					h("path", { d: "M7 7h10v4a5 5 0 0 1-10 0z" }),
					h("path", { d: "M12 16v5" })
				);
			}
		)
	);

	ctx.inject(["sidebarRight", "sidebarRightTabs"], (scope) => {
		rightScope = scope;
		scope.effect(
			() =>
				scope.sidebarRightTabs.register({
					id: WORKBENCH_ID,
					kind: WORKBENCH_KIND,
					multiple: false,
					priority: "extension",
					title: () => tr("workbench.title")
				}),
			"mcp-apps.workbench-type"
		);
		scope.slots.inject("sidebar.right.pane.tab", () =>
			scope.slots.register({ name: "sidebar.right.pane.tab", key: WORKBENCH_ID }, WorkbenchBody)
		);
	});

	ctx.effect(() => {
		void refreshState();
		const timer = setInterval(() => {
			void refreshState();
		}, 15000);
		return () => clearInterval(timer);
	}, "mcp-apps: state poller");
}

