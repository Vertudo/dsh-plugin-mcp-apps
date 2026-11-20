// Browser half of dsh-plugin-mcp-apps (source).
//
// scripts/build-client.mjs bundles this file with esbuild and wraps the result in
// window.__ModuleLoader__.load({ id, factory }); lib/client.js is the artifact, not the
// source — edit here and run `npm run build`.
import * as React from "react";
import { currentLanguage, dictionaries, NAMESPACE, setLanguage, tr, useLocaleRevision } from "./i18n.js";

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

//#region styles
const h = React.createElement;
const cardStyle = {
	border: "1px solid var(--dsh-border-subtle, rgba(127,127,127,.28))",
	borderRadius: "12px",
	padding: "14px",
	display: "grid",
	gap: "8px",
	background: "var(--dsh-surface-raised, transparent)"
};
const headerRow = { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" };
const titleStyle = { fontSize: "14px", fontWeight: 600 };
const subtitle = { fontSize: "12px", opacity: 0.7 };
const monoStyle = {
	fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
	fontSize: "11px",
	padding: "1px 5px",
	borderRadius: "4px",
	background: "var(--dsh-surface-sunken, rgba(127,127,127,.14))",
	wordBreak: "break-all"
};
const inputStyle = {
	width: "100%",
	minHeight: "34px",
	padding: "4px 8px",
	borderRadius: "8px",
	border: "1px solid var(--dsh-border-subtle, rgba(127,127,127,.35))",
	background: "transparent",
	color: "inherit",
	font: "inherit",
	boxSizing: "border-box"
};
const buttonStyle = {
	minHeight: "32px",
	padding: "0 14px",
	border: "0",
	borderRadius: "8px",
	background: "var(--dsh-accent, #2f6feb)",
	color: "#fff",
	font: "inherit",
	fontWeight: 600,
	cursor: "pointer"
};
const ghostButton = {
	minHeight: "28px",
	padding: "0 10px",
	border: "1px solid var(--dsh-border-subtle, rgba(127,127,127,.35))",
	borderRadius: "8px",
	background: "transparent",
	color: "inherit",
	font: "inherit",
	fontSize: "12px",
	cursor: "pointer"
};
const dangerButton = { ...ghostButton, color: "var(--dsh-danger, #d0453f)" };
const labelStyle = { fontSize: "12px", opacity: 0.75, marginBottom: "2px", display: "block" };
const errorText = { fontSize: "12px", color: "var(--dsh-danger, #d0453f)", lineHeight: "18px", wordBreak: "break-word" };
const noteBox = {
	fontSize: "12px",
	lineHeight: "18px",
	padding: "8px 10px",
	borderRadius: "8px",
	background: "var(--dsh-surface-sunken, rgba(127,127,127,.08))",
	whiteSpace: "pre-wrap",
	wordBreak: "break-word"
};
const STATUS_COLORS = { ready: "#2f9e5f", connecting: "#d8a01a", error: "#d0453f", needs_auth: "#d8a01a", disabled: "rgba(127,127,127,.55)" };
const STATUS_KEY = { ready: "card.status.ready", connecting: "card.status.connecting", error: "card.status.error", needs_auth: "card.status.needs_auth", disabled: "card.status.disabled" };
/** Localized status label; an unknown status shows raw rather than vanishing. */
const statusText = (status) => (STATUS_KEY[status] ? tr(STATUS_KEY[status]) : status);
//#endregion

//#region connection page
function Field(props) {
	return h(
		"div",
		null,
		h("label", { style: labelStyle }, props.label),
		props.kind === "select"
			? h(
					"select",
					{ value: props.value, onChange: (event) => props.onChange(event.target.value), style: inputStyle },
					(props.options || []).map((option) => h("option", { key: option.value, value: option.value }, option.label))
				)
			: h("input", {
					value: props.value,
					placeholder: props.placeholder || "",
					onChange: (event) => props.onChange(event.target.value),
					style: inputStyle,
					type: props.type || "text"
				})
	);
}

function TextArea(props) {
	return h("textarea", {
		value: props.value,
		placeholder: props.placeholder || "",
		onChange: (event) => props.onChange(event.target.value),
		style: { ...inputStyle, minHeight: "140px", padding: "8px", resize: "vertical", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "12px" }
	});
}

/** Form for one connection: transport, target, auth parameters. */
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

	const payload = () => ({
		record: {
			id: draft.id,
			name: draft.name.trim() || draft.command || draft.url || tr("common.noName"),
			enabled: draft.enabled,
			transport: draft.transport,
			url: draft.url.trim(),
			command: draft.command.trim(),
			args: draft.argsText.split("\n").map((line) => line.trim()).filter((line) => line !== ""),
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

	const save = async () => {
		setBusy("save");
		setError("");
		try {
			const body = payload();
			if (isNew) await api("/connections", { method: "POST", body: JSON.stringify(body) });
			else await api("/connections/" + encodeURIComponent(draft.id), { method: "PUT", body: JSON.stringify(body) });
			await refreshState();
			props.onDone();
		} catch (error) {
			setError(error.message || String(error));
		} finally {
			setBusy("");
		}
	};

	const test = async () => {
		setBusy("test");
		setError("");
		setTestResult(null);
		try {
			// The probe needs the host to hold the record (and its secret), so save first.
			let id = draft.id;
			if (isNew) {
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
		"div",
		{ style: { ...cardStyle, gap: "10px", borderColor: "var(--dsh-accent, #2f6feb)" } },
		h("div", { style: { ...titleStyle, fontSize: "13px" } }, isNew ? tr("editor.title.new") : tr("editor.title.edit", { name: connection.name })),
		h(Field, { label: tr("editor.name"), value: draft.name, placeholder: tr("editor.name.ph"), onChange: (value) => set({ name: value }) }),
		h(
			"div",
			null,
			h("label", { style: labelStyle }, tr("editor.transport")),
			h(
				"select",
				{
					value: draft.transport,
					onChange: (event) => set({ transport: event.target.value }),
					style: { ...inputStyle, minHeight: "32px" }
				},
				h("option", { value: "http" }, "Streamable HTTP"),
				h("option", { value: "sse" }, "SSE"),
				h("option", { value: "stdio" }, tr("editor.transport.stdio"))
			)
		),
		draft.transport === "stdio"
			? h(
					"div",
					{ style: { display: "grid", gap: "8px" } },
					h(Field, { label: tr("editor.command"), value: draft.command, placeholder: "npx", onChange: (value) => set({ command: value }) }),
					h(Field, { label: tr("editor.args"), value: draft.argsText, placeholder: "-y\n@modelcontextprotocol/server-everything", onChange: (value) => set({ argsText: value }) }),
					h(Field, { label: tr("editor.env"), value: draft.envText, placeholder: "API_KEY=xxx", onChange: (value) => set({ envText: value }) }),
					h(Field, { label: tr("editor.cwd"), value: draft.cwd, placeholder: "/opt/mcp", onChange: (value) => set({ cwd: value }) })
				)
			: h(Field, { label: tr("editor.url"), value: draft.url, placeholder: "https://mcp.example.com/mcp", onChange: (value) => set({ url: value }) }),
		h(
			"div",
			null,
			h("label", { style: labelStyle }, tr("editor.auth")),
			h(
				"select",
				{
					value: draft.authMode,
					onChange: (event) => set({ authMode: event.target.value }),
					style: { ...inputStyle, minHeight: "32px" }
				},
				h("option", { value: "none" }, tr("editor.auth.none")),
				h("option", { value: "api" }, tr("editor.auth.api")),
				h("option", { value: "oauth" }, tr("editor.auth.oauth"))
			)
		),
		draft.authMode === "api"
			? h(
					"div",
					{ style: { display: "grid", gap: "6px" } },
					draft.params.length === 0 ? h("div", { style: subtitle }, tr("editor.params.empty")) : null,
					draft.params.map((param, index) =>
						h(
							"div",
							{ key: index, style: { display: "grid", gridTemplateColumns: "92px 1fr 1fr auto", gap: "6px", alignItems: "center" } },
							h(
								"select",
								{
									value: param.in,
									onChange: (event) => {
										const next = draft.params.slice();
										next[index] = { ...param, in: event.target.value };
										set({ params: next });
									},
									style: { ...inputStyle, minHeight: "30px" }
								},
								h("option", { value: "header" }, "Header"),
								h("option", { value: "query" }, "Query"),
								h("option", { value: "body" }, "Body")
							),
							h("input", {
								value: param.name,
								placeholder: tr("editor.params.name"),
								onChange: (event) => {
									const next = draft.params.slice();
									next[index] = { ...param, name: event.target.value };
									set({ params: next });
								},
								style: inputStyle
							}),
							h("input", {
								value: param.value,
								placeholder: tr("editor.params.value"),
								type: "password",
								onChange: (event) => {
									const next = draft.params.slice();
									next[index] = { ...param, value: event.target.value };
									set({ params: next });
								},
								style: inputStyle
							}),
							h(
								"button",
								{
									type: "button",
									style: ghostButton,
									onClick: () => set({ params: draft.params.filter((_, at) => at !== index) })
								},
								tr("common.delete")
							)
						)
					),
					h(
						"button",
						{ type: "button", style: ghostButton, onClick: () => set({ params: draft.params.concat([{ in: "header", name: "", value: "" }]) }) },
						tr("editor.params.add")
					),
					h("div", { style: subtitle }, tr("editor.params.secret"))
				)
			: null,
		draft.authMode === "oauth"
			? h(
					"div",
					{ style: { display: "grid", gap: "6px" } },
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
					draft.clientMode === "cimd"
						? h("div", { style: subtitle }, tr("editor.cimd.hint", { url: window.location.origin + "/api/mcp-apps/oauth/client-metadata.json" }))
						: null,
					draft.clientMode === "manual"
						? h(Field, { label: tr("editor.clientId"), value: draft.clientId, placeholder: tr("editor.clientId.ph"), onChange: (value) => set({ clientId: value }) })
						: null,
					draft.clientMode === "manual"
						? h(Field, { label: tr("editor.clientSecret"), value: draft.clientSecret, type: "password", placeholder: tr("editor.clientSecret.ph"), onChange: (value) => set({ clientSecret: value }) })
						: null,
					h(
						"div",
						{ style: subtitle },
						tr("editor.oauth.hint")
					)
				)
			: null,
		h(Field, { label: tr("editor.note"), value: draft.note, onChange: (value) => set({ note: value }) }),
		h(
			"label",
			{ style: { display: "flex", gap: "8px", alignItems: "center", fontSize: "12px" } },
			h("input", { type: "checkbox", checked: draft.enabled, onChange: (event) => set({ enabled: event.target.checked }) }),
			tr("editor.enableNow")
		),
		error ? h("div", { style: errorText }, error) : null,
		testResult
			? testResult.ok
				? h(
						"div",
						{ style: noteBox },
						tr("editor.test.ok", { count: (testResult.tools || []).length }),
						h(
							"div",
							{ style: { marginTop: "4px", display: "grid", gap: "2px" } },
							(testResult.tools || []).slice(0, 40).map((tool) =>
								h("div", { key: tool.name }, h("code", { style: monoStyle }, tool.name), tool.resourceUri ? h("span", { style: subtitle }, "  ui://") : null)
							)
						)
					)
				: h("div", { style: errorText }, tr("editor.test.error", { message: testResult.error }))
			: null,
		h(
			"div",
			{ style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
			h("button", { type: "button", style: buttonStyle, disabled: busy !== "", onClick: save }, busy === "save" ? tr("common.saving") : isNew ? tr("editor.save") : tr("common.save")),
			h("button", { type: "button", style: ghostButton, disabled: busy !== "", onClick: test }, busy === "test" ? tr("common.testing") : tr("editor.test")),
			h("button", { type: "button", style: ghostButton, onClick: props.onDone }, tr("common.cancel"))
		)
	);
}

/** One connection card in the list. */
function ConnectionCard(props) {
	const connection = props.connection;
	const [busy, setBusy] = React.useState("");
	const [error, setError] = React.useState("");
	const run = async (label, action) => {
		setBusy(label);
		setError("");
		try {
			await action();
			await refreshState();
		} catch (error) {
			setError(error.message || String(error));
		} finally {
			setBusy("");
		}
	};
	const status = connection.status || (connection.enabled ? "connecting" : "disabled");
	const oauthMode = connection.auth && connection.auth.mode === "oauth";
	const authorized = !!(connection.auth && connection.auth.oauth && connection.auth.oauth.authorized);
	const authorize = async () => {
		setBusy("auth");
		setError("");
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
		"div",
		{ style: cardStyle },
		h(
			"div",
			{ style: headerRow },
			h("span", { style: { width: "8px", height: "8px", borderRadius: "50%", background: STATUS_COLORS[status] || STATUS_COLORS.disabled, display: "inline-block" } }),
			h("span", { style: titleStyle }, connection.name),
			h("span", { style: subtitle }, statusText(status)),
			h("span", { style: { ...subtitle, marginLeft: "auto" } }, connection.enabled ? tr("card.tools", { count: connection.toolCount }) : tr("card.tools.disabled"))
		),
		h(
			"div",
			{ style: { ...subtitle, display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" } },
			h("code", { style: monoStyle }, connection.transport === "stdio" ? connection.command : connection.url || tr("card.noUrl")),
			connection.auth && connection.auth.mode === "api"
				? h("span", null, tr("card.auth.params", { count: (connection.auth.params || []).filter((param) => param.hasValue).length }))
				: connection.auth && connection.auth.mode === "oauth"
					? h("span", null, "OAuth 2.0" + (connection.auth.clientMode === "cimd" ? " · " + tr("card.auth.cimd") : connection.auth.clientMode === "manual" ? " · " + tr("card.auth.manual") : "") + " · " + (connection.auth.oauth && connection.auth.oauth.authorized ? tr("card.auth.authorized") : tr("card.auth.unauthorized")) + (connection.auth.scopes ? " · " + connection.auth.scopes : ""))
					: h("span", null, tr("editor.auth.none")),
			connection.enabled && connection.lastListedAt
				? h("span", null, tr("card.listedAt", { time: new Date(connection.lastListedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }))
				: null
		),
		connection.note ? h("div", { style: { ...subtitle, lineHeight: "18px" } }, connection.note) : null,
		error ? h("div", { style: errorText }, error) : null,
		error === "" && connection.status === "error" && connection.error ? h("div", { style: errorText }, connection.error) : null,
		h(
			"div",
			{ style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
			h("button", {
				type: "button",
				style: connection.enabled ? ghostButton : buttonStyle,
				disabled: busy !== "",
				onClick: () =>
					run("toggle", () =>
						api("/connections/" + encodeURIComponent(connection.id) + "/enabled", {
							method: "POST",
							body: JSON.stringify({ enabled: !connection.enabled })
						})
					)
			}, busy === "toggle" ? tr("common.processing") : connection.enabled ? tr("card.toggle.off") : tr("card.toggle.on")),
			h("button", { type: "button", style: ghostButton, onClick: () => props.onEdit(connection) }, tr("common.edit")),
			h("button", {
				type: "button",
				style: ghostButton,
				disabled: busy !== "",
				onClick: () => run("test", () => api("/connections/" + encodeURIComponent(connection.id) + "/test", { method: "POST", body: "{}" }))
			}, busy === "test" ? tr("common.testing") : tr("common.test")),
			oauthMode
				? h("button", { type: "button", style: authorized ? ghostButton : buttonStyle, disabled: busy !== "", onClick: authorize }, busy === "auth" ? tr("card.auth.waiting") : authorized ? tr("card.auth.reauthorize") : tr("card.auth.login"))
				: null,
			oauthMode && authorized
				? h("button", {
						type: "button",
						style: ghostButton,
						disabled: busy !== "",
						onClick: () => run("oauth-reset", () => api("/connections/" + encodeURIComponent(connection.id) + "/oauth-reset", { method: "POST", body: "{}" }))
					}, tr("card.auth.reset"))
				: null,
			h("button", {
				type: "button",
				style: dangerButton,
				disabled: busy !== "",
				onClick: () => run("delete", () => api("/connections/" + encodeURIComponent(connection.id), { method: "DELETE" }))
			}, tr("common.delete"))
		)
	);
}

/** The 「Подключения」 page: list + add form + servers.json import. */
function ConnectAppsPage() {
	useLocaleRevision();
	const view = useStore();
	const [editing, setEditing] = React.useState(null);
	const [creating, setCreating] = React.useState(false);
	const [importing, setImporting] = React.useState(false);
	const [importText, setImportText] = React.useState("");
	const [importError, setImportError] = React.useState("");
	const [busy, setBusy] = React.useState(false);

	React.useEffect(() => {
		const onMessage = (event) => {
			if (event && event.data === "mcp-apps-oauth-done") void refreshState();
		};
		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, []);

	const doImport = async () => {
		setBusy(true);
		setImportError("");
		try {
			const body = await api("/import", { method: "POST", body: JSON.stringify({ json: importText }) });
			setImporting(false);
			setImportText("");
			await refreshState();
			void body;
		} catch (error) {
			setImportError(error.message || String(error));
		} finally {
			setBusy(false);
		}
	};

	return h(
		"div",
		{ style: { padding: "18px", display: "grid", gap: "14px", maxWidth: "920px" } },
		h(
			"div",
			null,
			h("div", { style: { fontSize: "18px", fontWeight: 600 } }, panelTitle()),
			h("div", { style: { ...subtitle, marginTop: "4px", lineHeight: "18px" } }, tr("panel.intro")),
			view.storePath !== ""
				? h("div", { style: { ...subtitle, marginTop: "4px", fontFamily: monoStyle.fontFamily, wordBreak: "break-all" } }, tr("panel.store", { path: view.storePath }))
				: null
		),
		h(
			"div",
			{ style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
			h("button", { type: "button", style: buttonStyle, onClick: () => { setCreating(true); setEditing(null); setImporting(false); } }, tr("panel.add")),
			h("button", { type: "button", style: ghostButton, onClick: () => { setImporting(true); setCreating(false); setEditing(null); } }, tr("panel.import")),
			h("button", { type: "button", style: ghostButton, onClick: () => void refreshState() }, tr("panel.refresh")),
			view.error ? h("span", { style: errorText }, view.error) : null
		),
		importing
			? h(
					"div",
					{ style: { ...cardStyle, gap: "8px" } },
					h("div", { style: titleStyle }, tr("panel.import.title")),
					h(TextArea, {
						value: importText,
						placeholder: '{\n  "mcpServers": {\n    "notion": { "type": "http", "url": "https://mcp.notion.com/mcp", "headers": { "Authorization": "Bearer xxx" } },\n    "local": { "command": "npx", "args": ["-y", "some-mcp"] }\n  }\n}',
						onChange: setImportText
					}),
					importError ? h("div", { style: errorText }, importError) : null,
					h(
						"div",
						{ style: { display: "flex", gap: "8px" } },
						h("button", { type: "button", style: buttonStyle, disabled: busy || importText.trim() === "", onClick: doImport }, busy ? tr("panel.import.busy") : tr("panel.import.action")),
						h("button", { type: "button", style: ghostButton, onClick: () => setImporting(false) }, tr("common.cancel"))
					)
				)
			: null,
		creating ? h(ConnectionEditor, { onDone: () => setCreating(false) }) : null,
		editing ? h(ConnectionEditor, { connection: editing, onDone: () => setEditing(null) }) : null,
		view.loading
			? h("div", { style: subtitle }, tr("panel.loading"))
			: view.connections.length === 0
				? h("div", { style: noteBox }, tr("panel.empty"))
				: view.connections.map((connection) =>
						h(ConnectionCard, { key: connection.id, connection, onEdit: (target) => { setEditing(target); setCreating(false); setImporting(false); } })
					)
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

/** Whether the App is still waiting for its frame to report a handshake. */
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
							hostInfo: { name: "dsh-plugin-mcp-apps", version: "0.5.7" },
							hostCapabilities: {},
							hostContext: { theme: "light", displayMode: "inline" }
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
		return h("div", { style: noteBox }, tr("app.noResource"));
	}

	return h(
		"div",
		{ style: { border: "1px solid var(--dsh-border-subtle, rgba(127,127,127,.28))", borderRadius: "12px", overflow: "hidden" } },
		error ? h("div", { style: { ...errorText, padding: "10px 12px" } }, error) : null,
		status === "error" ? h("div", { style: { padding: "0 12px 12px" } }, h("button", { type: "button", style: buttonStyle, onClick: () => setAttempt((value) => value + 1) }, tr("common.retry"))) : null,
		!html ? h("div", { style: { padding: "10px 12px", ...subtitle } }, status === "loading" ? tr("app.loading") : tr("app.preparing")) : null,
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
		return h("div", { style: noteBox }, tr("workbench.preparing"));
	}
	if (view === "idle") {
		return h(
			"div",
			{ style: { ...noteBox, display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" } },
			h("span", null, tr("workbench.previousCall")),
			h("button", { type: "button", style: ghostButton, onClick: attempt }, tr("workbench.openRight"))
		);
	}
	if (view === "opened") {
		return h(
			"div",
			{ style: { ...noteBox, display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" } },
			h("span", { style: { fontWeight: 600 } }, tr("workbench.openedMarker")),
			h("span", { style: subtitle }, tr("workbench.resultHint")),
			h("button", { type: "button", style: ghostButton, onClick: attempt }, tr("workbench.openRight"))
		);
	}
	// Right column unavailable: render the App inline instead of losing it.
	const text = resultText(props.block);
	return h(
		"div",
		{ style: { display: "grid", gap: "8px" } },
		h(
			"div",
			{ style: { ...errorText, padding: "0" } },
			h("div", null, tr("workbench.failed")),
			message ? h("div", { style: { opacity: 0.75 } }, tr("workbench.reason", { message })) : null,
			meta && meta.resourceUri ? h("div", { style: { marginTop: "4px" } }, tr("workbench.resource", { uri: meta.resourceUri })) : null
		),
		h(AppCard, { toolName, minHeight: 420 }),
		text ? h("pre", { style: { ...noteBox, maxHeight: "220px", overflow: "auto" } }, text) : null
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
		{ style: { height: "100%", overflow: "auto", padding: "8px" } },
		h("div", { style: { ...subtitle, padding: "0 4px 8px" } }, meta ? meta.connectionName + " · " + meta.rawName : tr("tool.unknown")),
		h(AppCard, { key: revision, toolName, minHeight: 560 })
	);
}

/** Convert a settled tool result into the text fallback under an inline App. */
function resultText(block) {
	const content = block && block.content;
	if (!Array.isArray(content)) return "";
	const parts = [];
	for (const item of content) {
		if (item && item.type === "text" && typeof item.text === "string") parts.push(item.text);
	}
	return parts.join("\n").trim();
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
