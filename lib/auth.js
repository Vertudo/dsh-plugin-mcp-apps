/**
 * Auth parameter injection for MCP HTTP transports.
 *
 * Header and query parameters are applied to every request; body parameters are
 * merged into each outgoing JSON-RPC message. Kept in its own module so the
 * injection rules can be tested without booting a harness.
 *
 * @module dsh-plugin-mcp-apps/auth
 */

/**
 * Build a fetch that applies the connection's auth parameters in place.
 * Header and query parameters are set per request; body parameters are merged
 * into each outgoing JSON-RPC message body.
 * @param record - the connection record.
 * @param base - underlying fetch implementation.
 * @returns an auth-aware fetch.
 */
export function authFetch(record, base) {
	const params = Array.isArray(record.auth?.params) ? record.auth.params : [];
	const headerParams = params.filter((param) => param && param.in === "header" && param.name);
	const queryParams = params.filter((param) => param && param.in === "query" && param.name);
	const bodyParams = params.filter((param) => param && param.in === "body" && param.name);
	return async (input, init = {}) => {
		// The transport may hand over a string, a URL, or a Request; normalize first.
		const request = new Request(input, init);
		const target = new URL(request.url);
		for (const param of queryParams) target.searchParams.set(param.name, String(param.value ?? ""));
		const nextHeaders = new Headers(request.headers);
		for (const param of headerParams) {
			let value = String(param.value ?? "");
			// A bare token in an Authorization header is never valid HTTP auth:
			// default to the Bearer scheme instead of silently sending a 401.
			if (param.name.toLowerCase() === "authorization" && value !== "" && !/^(bearer|token|basic|digest)\s/i.test(value)) value = "Bearer " + value;
			nextHeaders.set(param.name, value);
		}
		for (const [name, value] of Object.entries(record.headers ?? {})) nextHeaders.set(name, String(value));
		let nextBody;
		if (request.method !== "GET" && request.method !== "HEAD" && request.body !== null) {
			nextBody = await request.clone().text();
			if (bodyParams.length > 0 && typeof nextBody === "string") {
				try {
					const message = JSON.parse(nextBody);
					if (message && typeof message === "object" && !Array.isArray(message)) {
						for (const param of bodyParams) message[param.name] = param.value;
						nextBody = JSON.stringify(message);
					}
				} catch {
					/* not JSON: leave the body untouched */
				}
			}
		}
		return base(new Request(target.toString(), {
			method: request.method,
			headers: nextHeaders,
			body: nextBody,
			signal: request.signal
		}));
	};
}

