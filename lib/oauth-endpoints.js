/**
 * The OAuth endpoint contract: the two paths this plugin owns on the host, the client
 * metadata document it publishes there, and the origin arithmetic the callback depends on.
 *
 * It sits apart from `oauth.js` for one practical reason: `oauth.js` speaks to the MCP client
 * SDK and therefore imports a peer dependency the host provides at runtime, while everything
 * here is pure data and string work. Keeping the pure half importable is what lets
 * `scripts/check-oauth-surface.mjs` exercise the callback without a host or an installed SDK.
 *
 * @module dsh-plugin-mcp-apps/oauth-endpoints
 */

/**
 * Client name this plugin registers with third-party authorization servers. It is an
 * identity, not interface copy: the consent screen shows it to whoever signs in, and a name
 * that changes with the reader's language would fragment client registrations, so it stays
 * English and out of `lib/locales.js`.
 */
export const CLIENT_NAME = "DSH Connections";

/** Absolute path the authorization server redirects back to. */
export const CALLBACK_PATH = "/api/mcp-apps/oauth/callback";

/** Absolute path of the published client metadata document (CIMD). */
export const CLIENT_METADATA_PATH = "/api/mcp-apps/oauth/client-metadata.json";

/**
 * Client metadata document for CIMD (SEP-991): the `client_id` is this URL.
 * @param origin - browser origin the UI is served from, e.g. https://dsh.example.com.
 * @returns the document to serve, with matching `client_id` and redirect URI.
 */
export function clientMetadataDocument(origin) {
	const base = origin.replace(/\/+$/, "");
	return {
		client_id: base + CLIENT_METADATA_PATH,
		client_name: CLIENT_NAME,
		redirect_uris: [base + CALLBACK_PATH],
		grant_types: ["authorization_code", "refresh_token"],
		response_types: ["code"],
		token_endpoint_auth_method: "none"
	};
}

/**
 * The public origin the browser used to reach the UI, so the callback lands on
 * the same host the user actually browses (a reverse proxy may front the
 * loopback listener).
 * @param req - incoming HTTP request.
 * @param fallback - origin to use when the request carries no usable Host.
 * @returns the origin, without a trailing slash.
 */
export function redirectBaseFrom(req, fallback) {
	const forwardedProto = headerValue(req, "x-forwarded-proto");
	const forwardedHost = headerValue(req, "x-forwarded-host");
	const proto = (forwardedProto ?? (req.socket?.encrypted ? "https" : "http")).split(",")[0].trim();
	const rawHost = forwardedHost ?? headerValue(req, "host");
	const host = rawHost === undefined ? undefined : rawHost.split(",")[0].trim();
	const base = host === undefined ? fallback : `${proto}://${host}`;
	return { proto, base: base.replace(/\/+$/, "") };
}

/** Read one header as a trimmed string. */
function headerValue(req, name) {
	const value = req.headers?.[name];
	if (typeof value === "string" && value.trim() !== "") return value.trim();
	return undefined;
}
