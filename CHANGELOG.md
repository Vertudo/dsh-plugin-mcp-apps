# Changelog

## 0.10.1

- OAuth: адрес возврата `/api/mcp-apps/oauth/callback` обслуживается до приёма запроса (middleware `webserver/request`), а не маршрутом. Маршрут отбивал переход от Keycloak ответом `403 forbidden` — у кросс-сайтовой навигации срабатывает проверка источника запроса, так что ни один вход через браузер не завершался. Порт и `redirect_uri` прежние: регистрацию клиента в Keycloak менять не нужно.
- `client-metadata.json` по той же причине отдавал `401` серверу авторизации; теперь режим CIMD достижим.
- Callback сверяет origin с `redirectBase` своей попытки, отбрасывает повторяющиеся `code`/`state`/`error`/`iss` и снимает `state` вместе с PKCE-верификатором после обмена. Страница ответа убирает `code` из адресной строки и отдаётся под CSP.
- `scripts/check-oauth-surface.mjs` — новый гейт в `npm run check`: 13 групп случаев на поверхность callback.
- `lib/oauth-endpoints.js` — пути, документ CIMD и вычисление origin вынесены из `oauth.js`, чтобы гейт не тянул peer-зависимость SDK.

## 0.10.0

- Renamed to `@dkasparov/dsh-plugin-mcp-apps` and published to npm: the unscoped name belongs to the upstream release. A bundle installed from Git under the old name has to be removed and added again — the profile lists the package by name.
- The loader row keeps the id `dsh-plugin-mcp-apps` and the panel keeps its own tab keys, so row configuration written for earlier releases stays valid.

## 0.9.1

- Declares the DSH releases it supports in `engines.dsh` (`>= 0.2.2 < 0.3.0`): installation and profile start refuse an incompatible DSH instead of loading the plugin into it.
- Drops `dsh.compatibility.dshReleases`, a field no DSH release reads; `engines.dsh` decides compatibility alone.
- Runs the checks in CI: `npm ci && npm run check` on Ubuntu and Windows with Node 20 and 22.

## 0.9.0

- A tools card on each connection: the server's declarations split into read-only and write/delete tools, each with a description, plus search.

## 0.5.8 – 0.8.0

These releases predate this file; their subjects are in `git log`.
