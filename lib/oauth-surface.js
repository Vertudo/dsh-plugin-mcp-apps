/**
 * The two OAuth endpoints that a browser and an authorization server reach without a DSH
 * session: the redirect back from the identity provider, and the client metadata document
 * (CIMD).
 *
 * Neither of them may be a WebServer route. A matched route passes Connection's source
 * policy first, and that policy refuses every browser navigation marked
 * `Sec-Fetch-Site: cross-site` with 403 — which is exactly how an authorization callback
 * arrives: the browser jumps from the identity provider's origin to the host's own. The
 * `webserver/request` waterfall runs before route lookup and before admission, so the
 * callback is answered there; the harness serves its own MCP OAuth callback and the token
 * login through the same seam.
 *
 * Walking in front of admission also means walking in front of the credential check and the
 * source fence, so this module carries its own: method, exact path, single-valued
 * parameters, the recorded CSRF `state`, and the origin the attempt was registered for.
 * Nothing returns a secret — the code exchange happens in the host, and the browser only
 * gets a page saying what happened.
 *
 * @module dsh-plugin-mcp-apps/oauth-surface
 */
import { CALLBACK_PATH, CLIENT_METADATA_PATH, clientMetadataDocument, redirectBaseFrom } from "./oauth-endpoints.js";

/** Query parameters a callback may carry at most once each. */
const SINGLE_VALUED = ["code", "state", "error", "iss"];

/** Drop the query so a one-time code does not linger in history or in a screenshot. */
const SCRUB = "try{history.replaceState(null,'',location.pathname)}catch(e){}";

/** Success page: scrub the address bar, tell the panel, close the tab. */
const DONE_PAGE = `<script>${SCRUB}try{window.opener&&window.opener.postMessage('mcp-apps-oauth-done','*')}catch(e){};setTimeout(function(){window.close()},800)</script>`;

/** Every other callback page only scrubs the address bar. */
const PLAIN_PAGE = `<script>${SCRUB}</script>`;

/**
 * Build the pre-admission OAuth surface.
 * @param deps - what the surface needs from the plugin.
 * @param deps.records - live connections, each with `record`, `oauthProvider()`, `stop()`, `start()`.
 * @param deps.exchange - authorization-code exchange (`auth` from the MCP client SDK).
 * @param deps.persist - saves the connection records.
 * @param deps.page - renders one callback page (`sendHtml`).
 * @param deps.language - language of a browser request (`requestLocale`).
 * @param deps.logger - host logger, used when a callback arrives on the wrong origin.
 * @returns a `webserver/request` body: `true` when the request was answered here.
 */
export function createOAuthSurface({ records, exchange, persist, page, language, logger }) {
	/** Serve the CIMD document: the authorization server fetches it without a cookie. */
	function serveMetadata(req, res) {
		const { base } = redirectBaseFrom(req, "http://127.0.0.1");
		res.writeHead(200, {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "max-age=60",
			"access-control-allow-origin": "*"
		});
		res.end(JSON.stringify(clientMetadataDocument(base), null, 2));
	}

	/** Reject a method this surface does not answer, on a path it owns. */
	function refuseMethod(res, allow) {
		res.writeHead(405, { allow, "cache-control": "no-store", "content-type": "text/plain; charset=utf-8" });
		res.end("method not allowed\n");
	}

	/**
	 * Complete one authorization attempt: find its record by `state`, exchange the code,
	 * reconnect.
	 * @param req - the callback request.
	 * @param res - the response that receives the page.
	 * @param url - parsed callback URL.
	 */
	async function complete(req, res, url) {
		/** Send one page of this exchange, scrubbing the address bar by default. */
		const reply = (status, key, params, script = PLAIN_PAGE) => page(res, status, language(req), key, params, script);
		const parameters = url.searchParams;
		// A repeated parameter would make `get` pick one of two values the identity provider
		// never sends that way: refuse rather than guess which one is real.
		if (SINGLE_VALUED.some((name) => parameters.getAll(name).length > 1)) return reply(400, "host.callback.mismatch");
		const state = parameters.get("state") ?? "";
		const target = (await records()).find((candidate) => candidate.record.auth?.oauth?.state === state && state !== "");
		if (target === undefined) return reply(400, "host.callback.mismatch");
		// The callback has to land on the origin its attempt was registered for: `redirectBase`
		// is the address this plugin handed the identity provider as `redirect_uri`. Records
		// written before that field existed keep working — they simply skip the comparison.
		const registered = target.record.auth?.oauth?.redirectBase;
		if (typeof registered === "string" && registered !== "") {
			const { base } = redirectBaseFrom(req, registered);
			if (base !== registered) {
				logger?.warn(`mcp-apps(${target.record.id}): authorization callback arrived at ${base}, registered for ${registered}`);
				return reply(400, "host.callback.mismatch");
			}
		}
		const refused = parameters.get("error");
		if (refused !== null) return reply(400, "host.callback.refused", { error: refused });
		const code = parameters.get("code");
		if (code === null || code === "") return reply(400, "host.callback.noCode");
		try {
			await exchange(target.oauthProvider(), {
				serverUrl: target.record.url,
				authorizationCode: code,
				iss: parameters.get("iss") ?? undefined,
				scope: target.record.auth?.scopes || undefined
			});
			// The code is single use: dropping the pending state and the PKCE verifier makes a
			// replay of the same URL read as "wrong state" instead of starting a second exchange.
			const oauth = target.record.auth?.oauth;
			if (oauth !== undefined) {
				delete oauth.state;
				delete oauth.codeVerifier;
			}
			await persist();
			await target.stop();
			if (target.record.enabled) await target.start();
			return reply(200, "host.callback.done", undefined, DONE_PAGE);
		} catch (error) {
			return reply(500, "host.callback.error", { message: String(error instanceof Error ? error.message : error) });
		}
	}

	return async function oauthSurface(req, res) {
		if (typeof req.url !== "string") return false;
		// Cheap rejection first: this listener sits in front of every request the host serves,
		// panel assets included.
		if (!req.url.startsWith(CALLBACK_PATH) && !req.url.startsWith(CLIENT_METADATA_PATH)) return false;
		const url = new URL(req.url, "http://dsh.invalid");
		if (url.pathname === CLIENT_METADATA_PATH) {
			if (req.method !== "GET" && req.method !== "HEAD") {
				refuseMethod(res, "GET, HEAD");
				return true;
			}
			serveMetadata(req, res);
			return true;
		}
		if (url.pathname !== CALLBACK_PATH) return false;
		if (req.method !== "GET") {
			refuseMethod(res, "GET");
			return true;
		}
		await complete(req, res, url);
		return true;
	};
}
