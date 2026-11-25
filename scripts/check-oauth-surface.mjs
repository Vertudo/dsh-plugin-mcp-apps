// Table check for lib/oauth-surface.js: one row per promise the pre-admission surface makes.
//
// The callback runs before WebServer admission, so the harness source policy is not there to
// hold its hand: every check that policy would have performed — exact path, method, origin —
// is asserted here instead, together with the ones the surface adds for itself (the recorded
// `state`, single-valued parameters) and the one it must never lose (no secret in the page).
import assert from 'node:assert'
import { createOAuthSurface } from '../lib/oauth-surface.js'

const CALLBACK = '/api/mcp-apps/oauth/callback'
const METADATA = '/api/mcp-apps/oauth/client-metadata.json'
const ORIGIN = 'http://127.0.0.1:47100'
const STATE = 'a'.repeat(32)
const OTHER_STATE = 'b'.repeat(32)

/** Response stand-in that records status, headers and body. */
function recorder() {
	const out = { status: 0, headers: {}, body: '' }
	const res = {
		destroyed: false,
		headersSent: false,
		writeHead(status, headers = {}) {
			out.status = status
			out.headers = { ...out.headers, ...headers }
			res.headersSent = true
			return res
		},
		end(body) {
			out.body = body ?? ''
		}
	}
	return { out, res }
}

/** Request stand-in: the surface reads only `method`, `url`, `headers` and `socket`. */
function request(url, { method = 'GET', host = '127.0.0.1:47100', headers = {} } = {}) {
	return { method, url, headers: { host, ...headers }, socket: { remoteAddress: '127.0.0.1', destroyed: false } }
}

/** One live connection carrying a pending authorization attempt. */
function connection({ state = STATE, redirectBase = ORIGIN, enabled = true } = {}) {
	const calls = { stopped: 0, started: 0 }
	return {
		calls,
		live: {
			record: {
				id: 'oneinvest-uat',
				url: 'https://mcp-uat.oneinvest.app',
				enabled,
				auth: { mode: 'oauth', scopes: 'openid', oauth: { state, codeVerifier: 'verifier-1', redirectBase } }
			},
			oauthProvider: () => ({ provider: 'stub' }),
			stop: async () => {
				calls.stopped += 1
			},
			start: async () => {
				calls.started += 1
			}
		}
	}
}

/** Build a surface over stubs and record what it asked them to do. */
function harness({ connections = [], exchange } = {}) {
	const seen = { exchange: [], persisted: 0, warnings: [] }
	const surface = createOAuthSurface({
		records: async () => connections.map((entry) => entry.live),
		exchange: async (provider, options) => {
			seen.exchange.push({ provider, options })
			if (exchange !== undefined) await exchange(provider, options)
		},
		persist: async () => {
			seen.persisted += 1
		},
		page: (res, status, lang, key, params, script) => {
			res.writeHead(status, { 'content-type': 'text/html; charset=utf-8' })
			// The pages carry one script: the success page closes the tab, the others only
			// scrub the address bar. Record which one this page got.
			res.end(JSON.stringify({ lang, key, params: params ?? null, closes: String(script ?? '').includes('window.close') }))
		},
		language: () => 'ru',
		logger: { warn: (line) => seen.warnings.push(line) }
	})
	return { seen, surface }
}

/** Body of a callback page, parsed back. */
const page = (body) => JSON.parse(body)

// 1) The identity provider's redirect arrives as a cross-site navigation, without the harness
//    session cookie. Both facts are what a matched route refuses; the surface must not care.
{
	const pending = connection()
	const { seen, surface } = harness({ connections: [pending] })
	const { out, res } = recorder()
	const handled = await surface(request(`${CALLBACK}?state=${STATE}&code=code-1&iss=https%3A%2F%2Fidp.example`, { headers: { 'sec-fetch-site': 'cross-site' } }), res)
	assert.strictEqual(handled, true, 'callback: обработан поверхностью')
	assert.strictEqual(out.status, 200, 'callback: страница успеха')
	assert.strictEqual(page(out.body).key, 'host.callback.done', 'callback: ключ страницы «готово»')
	assert.strictEqual(page(out.body).closes, true, 'callback: страница закрывает вкладку')
	assert.strictEqual(seen.exchange.length, 1, 'callback: обмен выполнен один раз')
	assert.strictEqual(seen.exchange[0].options.authorizationCode, 'code-1', 'callback: обмен получает code')
	assert.strictEqual(seen.exchange[0].options.iss, 'https://idp.example', 'callback: iss передан в обмен')
	assert.strictEqual(seen.exchange[0].options.serverUrl, 'https://mcp-uat.oneinvest.app', 'callback: обмен идёт к серверу подключения')
	assert.strictEqual(seen.persisted, 1, 'callback: запись сохранена')
	assert.strictEqual(pending.live.record.auth.oauth.state, undefined, 'callback: state снят после обмена')
	assert.strictEqual(pending.live.record.auth.oauth.codeVerifier, undefined, 'callback: PKCE-верификатор снят после обмена')
	assert.strictEqual(pending.calls.stopped, 1, 'callback: подключение остановлено')
	assert.strictEqual(pending.calls.started, 1, 'callback: подключение перезапущено')
}

// 2) No `Sec-Fetch-Site` at all: a proxy or an older browser may drop it, and the surface
//    still has to finish the attempt.
{
	const pending = connection()
	const { surface } = harness({ connections: [pending] })
	const { out, res } = recorder()
	await surface(request(`${CALLBACK}?state=${STATE}&code=code-2`), res)
	assert.strictEqual(out.status, 200, 'callback без Sec-Fetch-Site: страница успеха')
}

// 3) The CIMD document is fetched by the authorization server itself, without a cookie.
{
	const { surface } = harness({ connections: [connection()] })
	const { out, res } = recorder()
	const handled = await surface(request(METADATA), res)
	assert.strictEqual(handled, true, 'metadata: обработан поверхностью')
	assert.strictEqual(out.status, 200, 'metadata: 200 без сессии')
	const document = page(out.body)
	assert.deepStrictEqual(document.redirect_uris, [`${ORIGIN}${CALLBACK}`], 'metadata: redirect_uris совпадает с callback')
	assert.strictEqual(document.client_id, `${ORIGIN}${METADATA}`, 'metadata: client_id — адрес самого документа')
	assert.strictEqual(document.token_endpoint_auth_method, 'none', 'metadata: клиент публичный')
	assert.strictEqual(out.headers['access-control-allow-origin'], '*', 'metadata: документ читается сервером авторизации')
}

// 4) An unknown or empty state belongs to nobody: no exchange, generic page.
for (const [label, state] of [
	['чужой state', OTHER_STATE],
	['пустой state', '']
]) {
	const pending = connection()
	const { seen, surface } = harness({ connections: [pending] })
	const { out, res } = recorder()
	await surface(request(`${CALLBACK}?state=${state}&code=code-3`), res)
	assert.strictEqual(out.status, 400, `${label}: отказ 400`)
	assert.strictEqual(page(out.body).key, 'host.callback.mismatch', `${label}: страница «state не совпадает»`)
	assert.strictEqual(seen.exchange.length, 0, `${label}: обмена нет`)
	assert.strictEqual(pending.calls.started, 0, `${label}: подключение не перезапущено`)
}

// 5) A repeated parameter would make `get` choose between two values: refuse instead.
{
	const pending = connection()
	const { seen, surface } = harness({ connections: [pending] })
	const { out, res } = recorder()
	await surface(request(`${CALLBACK}?state=${STATE}&code=code-4&code=code-5`), res)
	assert.strictEqual(out.status, 400, 'дублированный code: отказ 400')
	assert.strictEqual(seen.exchange.length, 0, 'дублированный code: обмена нет')
}

// 6) A callback that lands on another origin is not the redirect this attempt registered.
{
	const pending = connection()
	const { seen, surface } = harness({ connections: [pending] })
	const { out, res } = recorder()
	await surface(request(`${CALLBACK}?state=${STATE}&code=code-6`, { host: 'evil.example:47100' }), res)
	assert.strictEqual(out.status, 400, 'чужой Host: отказ 400')
	assert.strictEqual(seen.exchange.length, 0, 'чужой Host: обмена нет')
	assert.strictEqual(seen.warnings.length, 1, 'чужой Host: в лог ушло предупреждение')
}

// 7) A record written before `redirectBase` existed still completes: there is no origin to
//    compare against, and the state remains the gate.
{
	const legacy = connection()
	delete legacy.live.record.auth.oauth.redirectBase
	const { seen, surface } = harness({ connections: [legacy] })
	const { out, res } = recorder()
	await surface(request(`${CALLBACK}?state=${STATE}&code=code-7`, { host: 'proxied.example:443' }), res)
	assert.strictEqual(out.status, 200, 'без redirectBase: страница успеха')
	assert.strictEqual(seen.exchange.length, 1, 'без redirectBase: обмен выполнен')
}

// 8) The identity provider can refuse the authorization itself.
{
	const { seen, surface } = harness({ connections: [connection()] })
	const { out, res } = recorder()
	await surface(request(`${CALLBACK}?state=${STATE}&error=access_denied`), res)
	assert.strictEqual(out.status, 400, 'отказ IdP: 400')
	assert.strictEqual(page(out.body).key, 'host.callback.refused', 'отказ IdP: страница «отклонено»')
	assert.strictEqual(page(out.body).params.error, 'access_denied', 'отказ IdP: причина в странице')
	assert.strictEqual(seen.exchange.length, 0, 'отказ IdP: обмена нет')
}

// 9) A callback without a code cannot be exchanged.
{
	const { seen, surface } = harness({ connections: [connection()] })
	const { out, res } = recorder()
	await surface(request(`${CALLBACK}?state=${STATE}`), res)
	assert.strictEqual(out.status, 400, 'без code: 400')
	assert.strictEqual(page(out.body).key, 'host.callback.noCode', 'без code: страница «нет code»')
	assert.strictEqual(seen.exchange.length, 0, 'без code: обмена нет')
}

// 10) Only GET is answered; the panel keeps its own routes for everything else.
{
	const { seen, surface } = harness({ connections: [connection()] })
	const { out, res } = recorder()
	const handled = await surface(request(`${CALLBACK}?state=${STATE}&code=code-9`, { method: 'POST' }), res)
	assert.strictEqual(handled, true, 'POST: обработан поверхностью, а не маршрутом')
	assert.strictEqual(out.status, 405, 'POST: 405')
	assert.strictEqual(out.headers.allow, 'GET', 'POST: allow заголовок называет GET')
	assert.strictEqual(seen.exchange.length, 0, 'POST: обмена нет')
}

// 11) Any other path under the prefix stays with the panel: the surface declines quietly.
{
	const { surface } = harness({ connections: [connection()] })
	const { out, res } = recorder()
	for (const url of ['/api/mcp-apps/state', `${CALLBACK}-other`, '/api/mcp-apps/']) {
		assert.strictEqual(await surface(request(url), res), false, `посторонний путь ${url}: не наш`)
	}
	assert.strictEqual(out.status, 0, 'посторонний путь: ответ не отправлен')
}

// 12) A failed exchange keeps the attempt usable: the page reports the error, the state stays.
{
	const pending = connection()
	const { seen, surface } = harness({
		connections: [pending],
		exchange: async () => {
			throw new Error('invalid_grant')
		}
	})
	const { out, res } = recorder()
	await surface(request(`${CALLBACK}?state=${STATE}&code=code-11`), res)
	assert.strictEqual(out.status, 500, 'сбой обмена: 500')
	assert.strictEqual(page(out.body).key, 'host.callback.error', 'сбой обмена: страница ошибки')
	assert.strictEqual(page(out.body).params.message, 'invalid_grant', 'сбой обмена: причина в странице')
	assert.strictEqual(seen.persisted, 0, 'сбой обмена: запись не сохранена')
	assert.strictEqual(pending.live.record.auth.oauth.state, STATE, 'сбой обмена: state сохранён для повтора')
	assert.strictEqual(pending.calls.started, 0, 'сбой обмена: подключение не перезапущено')
}

// 13) No page ever carries a token: the exchange stays in the host.
{
	const pending = connection()
	const { surface } = harness({
		connections: [pending],
		exchange: async (provider, options) => {
			options.onToken = 'secret-token'
		}
	})
	const { out, res } = recorder()
	await surface(request(`${CALLBACK}?state=${STATE}&code=code-12`), res)
	assert.ok(!out.body.includes('secret-token'), 'страница не содержит токена')
}

console.log('check-oauth-surface: 13 групп случаев — в порядке')
