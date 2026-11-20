# dsh-plugin-mcp-apps

A general MCP connector plus an MCP Apps workbench, forked from `xiaoqin422/dsh-plugin-mcp-apps@0.5.7` with modular localization: Russian, English and Chinese, following the DSH language switch.

- **Connections** page (left sidebar, below Skills, `order: 3`): add, edit, enable, disable and delete any MCP server; paste Claude Code's `servers.json` (`{"mcpServers": {...}}`) or fill the form field by field.
- **Transports**: Streamable HTTP, SSE, stdio (local process).
- **Authorization**: none; API parameters (`header` / `query` / `body`, any number per connection, values echoed as `••••` and kept when the field stays empty); OAuth 2.0 (authorization code + PKCE) with client registration by DCR, CIMD or a hand-entered `client_id`/`client_secret`.
- **Workbench**: a tool that declares a `ui://` resource renders its MCP App in the right-hand pane; a disabled connection exposes no tools to the model.
- **Reconnect** on a card re-reads the tool list (`POST /api/mcp-apps/connections/<id>/refresh`); a server that sends `notifications/tools/list_changed` updates it on its own, and a dropped connection reconnects with a growing delay. The model sees the refreshed list from its next message: the tool snapshot is taken when a turn starts.

## Localization

Every string lives in one module, `lib/locales.js`, with one dictionary per language. The key set is defined by `zh` — it carries the upstream literals, so the fork stays diffable against the original — and the other languages are written against exactly that key set.

Both halves read the same module:

- **browser half** (`src/client.js`) registers the dictionaries with the DSH locale service (`ctx.locale.register("mcp-apps", dictionaries)`) and translates through `tr()` from `src/i18n.js`; switching the language in Settings re-renders the panel in place, without a reload;
- **host half** (`lib/index.js`) imports `lib/locales.js` directly, because the locale service is browser-only: the panel reports its language to `POST /api/mcp-apps/locale`, the host remembers it in `$DSH_HOME/mcp-apps/locale.json` and rebuilds the system-prompt section. The OAuth callback page takes the language from the request's `Accept-Language`.

The plugin card in the plugin list is a separate path: DSH reads it from `locale/<lang>.json`, which holds only `meta.title` and `meta.description`. Three files ship today (`en`, `ru`, `zh`); `en.json` is the anchor, and without it DSH reads no metadata at all.

### Adding a language

1. Add a dictionary to `lib/locales.js` (copy any language, keep the `zh` key set).
2. Add `locale/<lang>.json` with `meta.title` and `meta.description`.
3. Run `npm run check` — it fails when keys or `{name}` placeholders drift.
4. Rebuild (`npm run build`) and restart DSH.

A language DSH does not ship (say `it`) is registered through `ctx.locale.addLanguage` using the name from the dictionary. Russian, English and Chinese need no such call — they are built in.

### Build

`lib/client.js` is an artifact, not a source:

```sh
npm install      # once: esbuild
npm run build    # src/client.js + lib/locales.js -> lib/client.js
npm run check    # dictionary parity, build, artifact gates
```

The bundle has to stay one self-contained file: the browser module table resolves only React and registered packages, so `lib/locales.js` is inlined at build time rather than imported at runtime.

## Changes against upstream

- UI copy, error messages, the OAuth callback page and the workbench prompt section moved into `lib/locales.js`; no Cyrillic literals remain in the sources. Chinese code comments are kept as they were.
- `package.json`: `src`, `lib/locales.js`, the build and check scripts and the esbuild devDependency are added, and `@deepseek-ai/dsh-client-locale` joins `dsh.client.inject`.
- The host answers API failures with codes (`{ok:false, error:{code, params}}`) and the panel translates the code with its own dictionary, so both ends speak one language.
- `lib/index.js`: the client is created with `versionNegotiation: { mode: "auto" }` (in `Connection.start()` and the `/test` probe). The SDK default, `legacy`, sends `initialize` first; a server that only supports the `2026-07-28` protocol revision (EFTR.MCP) answers `-32601`, and the connection failed right after OAuth. In `auto` the SDK probes with `server/discover` and falls back to `initialize` only for legacy servers. The native `dsh-mcp-client` uses the same option.
- `lib/oauth.js`, `lib/index.js`: `oauth-start` starts discovery from a clean state (it resets `discoveryState`, `authorizationUrl`, `authorizationServerUrl`, `codeVerifier` and keeps the tokens) and passes the protected-resource metadata URL from the server's 401 challenge into `auth()` (`protectedResourceChallenge`). Without that hint the SDK looks for `/.well-known/oauth-protected-resource` under the connection URL: for a bare origin it gets 404, treats the origin itself as the authorization server, and builds a nonexistent `https://host/authorize`. The discovery cache pinned that result, so the hint alone was not enough.

## Install as a DSH plugin

```sh
dsh plugin --profile desktop add https://github.com/Vertudo/dsh-plugin-mcp-apps
```

Working from a local checkout, pass `link:<path to your checkout>` instead, or call `plugin_manager` with the same argument. A tarball works too: `npm pack`, then `sh scripts/install-remote.sh ./dsh-plugin-mcp-apps-<ver>.tgz <profile>`, restart DSH and hard-refresh the page.

Prerequisites: DSH `>= 0.2.1-rc.2`; the right-hand workbench needs `@deepseek-ai/dsh-client-ui-sidebar-right` (or any package providing `sidebarRight`) enabled. Without it the tool rows render inline and the plugin still loads.

## Uninstall

```sh
dsh plugin --profile web remove dsh-plugin-mcp-apps
# then drop the entry from <profile>/package.json dsh.profile.bundles and restart
```

## Development

- `npm run check` — dictionary parity, bundle build, artifact gates.
- `lib/auth.js` keeps auth injection separate, so `import { authFetch }` can be checked against a fake fetch for all three positions and for preserved headers; OAuth storage lives in `lib/oauth.js` (`RecordOAuthProvider`).
- Client changes need a page reload (hard refresh when in doubt); host changes need a DSH restart.

## Where connections live

`$DSH_HOME/mcp-apps/connections.json`, by default `~/.dsh/mcp-apps/connections.json`, mode 0600. `GET /api/mcp-apps/state` reports the path together with `dshHome` and `homeSource` (`core`, `env` or `default` — which rule won), and the panel prints it.

Earlier releases wrote to `/data` (on Windows that is `C:\data`), outside the harness home: the machine ended up with two stores, and the panel showed whichever one its host resolved. On the first start after this change the old file is imported — records merge by `id`, the `mcpstuxx` example is dropped, the original is renamed to `connections.json.bak`, and the import is recorded in `.legacy-store-imported`.

The native MCP settings (`mcp-manager`) neither list nor restart these connections: it has its own config and its own servers.

## Limits

- The package name matches the npm release, so both cannot be installed at once.
- `@modelcontextprotocol/client` is a peer dependency supplied by the DSH host; do not install it separately.
- The prompt language comes from the last panel message: until the panel has been opened once in an installation, the host uses `en` (or `MCP_APPS_LOCALE` when set).
