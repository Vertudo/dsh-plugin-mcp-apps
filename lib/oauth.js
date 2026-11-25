/**
 * OAuth 2.0 support for MCP connections.
 *
 * The MCP client SDK owns discovery, dynamic client registration, PKCE and the
 * authorization-code exchange; this module only supplies the persistence hooks
 * (`OAuthClientProvider`) and names the redirect address it reports, which lives with the
 * rest of the endpoint contract in `oauth-endpoints.js`. Tokens and the client registration
 * live in the connection record, which the host writes to a 0600 file — the browser never
 * sees them.
 *
 * @module dsh-plugin-mcp-apps/oauth
 */
import { randomBytes } from "node:crypto";
import { extractWWWAuthenticateParams } from "@modelcontextprotocol/client";
import { CALLBACK_PATH, CLIENT_METADATA_PATH, CLIENT_NAME } from "./oauth-endpoints.js";

/**
 * Protected-resource metadata named by the resource server's 401 challenge.
 *
 * Discovery only walks `/.well-known/oauth-protected-resource` below the
 * connection URL. When that URL is a bare origin and the resource is published
 * under a path, the derived address 404s and the SDK falls back to treating the
 * origin as the authorization server — it then builds `https://host/authorize`,
 * which does not exist. The `WWW-Authenticate` challenge carries the real
 * address as its `resource_metadata` parameter, so it is worth one
 * unauthenticated request before starting discovery.
 *
 * @param serverUrl - the MCP endpoint the connection points at.
 * @param options - fetch to use and the client identity to present.
 * @returns `resourceMetadataUrl` and `scope` from the challenge; empty when the
 *   endpoint answers without one or is unreachable (discovery then proceeds on
 *   its own, as before).
 */
export async function protectedResourceChallenge(serverUrl, { fetch: fetchImpl = globalThis.fetch, clientInfo } = {}) {
	try {
		const response = await fetchImpl(serverUrl, {
			method: "POST",
			headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: "oauth-discovery-probe",
				method: "initialize",
				params: { capabilities: {}, clientInfo: clientInfo ?? { name: "dsh-mcp-apps", version: "0.5.7" } }
			})
		});
		const { resourceMetadataUrl, scope } = extractWWWAuthenticateParams(response);
		await response.text?.().catch(() => {});
		return { resourceMetadataUrl, scope };
	} catch {
		return {};
	}
}

/** OAuth storage section of one connection record, created on demand. */
function section(record) {
	record.auth = record.auth ?? {};
	record.auth.oauth = record.auth.oauth ?? {};
	return record.auth.oauth;
}

/**
 * `OAuthClientProvider` over a connection record.
 */
export class RecordOAuthProvider {
	/**
	 * @param record - connection record mutated in place.
	 * @param persist - async callback saving the record.
	 * @param options - scopes and the browser origin for the callback.
	 */
	constructor(record, persist, options) {
		this.record = record;
		this.persist = persist;
		this.options = options;
	}

	/** CIMD mode: the metadata document URL is the client id (HTTPS only). */
	get clientMetadataUrl() {
		if (this.options.clientMode !== "cimd") return undefined;
		const base = this.options.redirectBase ?? "";
		return /^https:/i.test(base) ? base + CLIENT_METADATA_PATH : undefined;
	}

	/** Pre-registered client id, when the server does not support registration. */
	configuredClientId() {
		const value = this.options.clientId;
		return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
	}

	/** Where the authorization server sends the browser back. */
	get redirectUrl() {
		return this.options.redirectBase + CALLBACK_PATH;
	}

	/** What this client tells the authorization server about itself. */
	get clientMetadata() {
		const metadata = {
			client_name: CLIENT_NAME,
			redirect_uris: [this.redirectUrl],
			grant_types: ["authorization_code", "refresh_token"],
			response_types: ["code"],
			token_endpoint_auth_method: this.options.clientSecret ? "client_secret_basic" : "none"
		};
		const scope = this.options.scopes;
		if (typeof scope === "string" && scope.trim() !== "") metadata.scope = scope.trim();
		return metadata;
	}

	/** Fresh CSRF state for one authorization request. */
	state() {
		const value = randomBytes(16).toString("hex");
		section(this.record).state = value;
		return value;
	}

	/** Recorded CSRF state, for the callback to compare against. */
	storedState() {
		return section(this.record).state;
	}

	/** Registered client information; a configured client id wins over registration. */
	clientInformation() {
		const configured = this.configuredClientId();
		if (configured !== undefined) {
			const secret = typeof this.options.clientSecret === "string" ? this.options.clientSecret : "";
			return secret === "" ? { client_id: configured } : { client_id: configured, client_secret: secret };
		}
		return section(this.record).clientInformation;
	}

	/** Persist the client registration. */
	async saveClientInformation(clientInformation) {
		section(this.record).clientInformation = clientInformation;
		await this.persist();
	}

	/** Current tokens, if any. */
	tokens() {
		return section(this.record).tokens;
	}

	/** Persist fresh tokens (also used by the SDK's refresh path). */
	async saveTokens(tokens) {
		section(this.record).tokens = tokens;
		await this.persist();
	}

	/** Remember the URL the browser must visit, so the page can open it. */
	async redirectToAuthorization(url) {
		section(this.record).authorizationUrl = String(url);
		await this.persist();
	}

	/** PKCE verifier saved before the redirect. */
	codeVerifier() {
		return section(this.record).codeVerifier;
	}

	/** Persist the PKCE verifier. */
	async saveCodeVerifier(verifier) {
		section(this.record).codeVerifier = verifier;
		await this.persist();
	}

	/** SEP-2352 discovery state: binds the callback leg to the discovered server. */
	discoveryState() {
		return section(this.record).discoveryState;
	}

	/** Persist the discovery state alongside the PKCE verifier. */
	async saveDiscoveryState(state) {
		section(this.record).discoveryState = state;
		await this.persist();
	}

	/** Authorization server identity, replayed on reconnect. */
	authorizationServerUrl() {
		return section(this.record).authorizationServerUrl;
	}

	/** Persist the authorization server URL. */
	async saveAuthorizationServerUrl(url) {
		section(this.record).authorizationServerUrl = url;
		await this.persist();
	}

	/** Drop stored credentials; `all` also forgets the client registration. */
	async invalidateCredentials(scope) {
		const oauth = section(this.record);
		if (scope === "all" || scope === "client") {
			delete oauth.clientInformation;
			delete oauth.authorizationServerUrl;
		}
		if (scope === "all" || scope === "tokens") {
			delete oauth.tokens;
			delete oauth.authorizationUrl;
		}
		if (scope === "all" || scope === "verifier") delete oauth.codeVerifier;
		if (scope === "all" || scope === "discovery") delete oauth.discoveryState;
		await this.persist();
	}

	/** Whether a token is stored (and not expired by the record's own clock). */
	authorized() {
		const tokens = section(this.record).tokens;
		return tokens !== undefined && (tokens.refresh_token !== undefined || tokens.access_token !== undefined);
	}

	/** Page-facing summary; no secret values. */
	summary() {
		const oauth = section(this.record);
		const tokens = oauth.tokens;
		const expiresAt = typeof tokens?.expires_in === "number" && typeof oauth.obtainedAt === "number" ? oauth.obtainedAt + tokens.expires_in * 1000 : undefined;
		return {
			mode: "oauth",
			authorized: this.authorized(),
			scopes: this.options.scopes ?? "",
			expiresAt: expiresAt ?? null,
			hasClientRegistration: oauth.clientInformation !== undefined || this.configuredClientId() !== undefined,
			clientMode: this.options.clientMode ?? "auto",
			clientId: this.configuredClientId() ?? "",
			authorizationUrl: typeof oauth.authorizationUrl === "string" ? oauth.authorizationUrl : "",
			redirectUrl: this.redirectUrl
		};
	}
}

/** Clear the OAuth section of a record (used by 清除授权). */
export function clearOAuth(record) {
	if (record.auth === undefined) return;
	delete record.auth.oauth;
}