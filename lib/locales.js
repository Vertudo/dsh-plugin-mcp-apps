// Every user-visible and model-facing string of dsh-plugin-mcp-apps, one module for both
// halves.
//
// `zh` is the key source: it carries the upstream literals, so the fork stays diffable
// against the original package, and the other languages are written against exactly this
// key set. `scripts/check-i18n.mjs` enforces that parity — a missing or extra key fails the
// check, and `{placeholder}` sets must match, because a dropped `{count}` silently loses
// information instead of breaking loudly.
//
// Who reads what:
//   - the browser half (`src/client.js`) imports `dictionaries` and registers them through
//     `ctx.locale.register('mcp-apps', lang, dict)`, so the UI follows the DSH language
//     switch;
//   - the host half (`lib/index.js`) imports `dictionaries` directly, because the locale
//     service is browser-only; `translate()` in this module is the shared resolver.
//
// The plugin *card* (title and description in the plugin list) is NOT here: the host reads
// it from `locale/<lang>.json`, scanned by DSH's package-meta reader.

/**
 * Count-sensitive strings carry one key per CLDR plural category plus `other`, and
 * `translate()` picks the category with `Intl.PluralRules`. Chinese uses `other` only.
 */

/** Chinese: the key source, kept verbatim from upstream. */
const zh = {
	// shared controls
	'common.cancel': '取消',
	'common.save': '保存',
	'common.saving': '保存中…',
	'common.delete': '删除',
	'common.edit': '编辑',
	'common.retry': '重试',
	'common.test': '测试',
	'common.testing': '测试中…',
	'common.processing': '处理中…',
	'common.noName': '未命名',

	// left-sidebar page
	'panel.title': '连接应用',
	'panel.intro': '接入任意 MCP 服务器（HTTP / SSE / stdio）。关闭的连接不会把工具交给模型；带 ui:// 资源的工具会在右侧工作台渲染 MCP Apps。',
	'panel.add': '添加 MCP 服务器',
	'panel.import': '导入 servers.json',
	'panel.import.action': '导入',
	'panel.import.busy': '导入中…',
	'panel.import.title': '粘贴 Claude Code 的 mcpServers 配置',
	'panel.refresh': '刷新',
	'panel.store': '数据目录：{path}',
	'panel.loading': '读取连接列表…',
	'panel.empty': '还没有连接。点「添加 MCP 服务器」或「导入 servers.json」。',

	// add/edit form
	'editor.title.new': '添加 MCP 服务器',
	'editor.title.edit': '编辑：{name}',
	'editor.name': '名称（同一台机器内唯一）',
	'editor.name.ph': '例如 notion',
	'editor.transport': '传输方式',
	'editor.transport.stdio': 'stdio（本地进程）',
	'editor.command': '命令',
	'editor.args': '参数（每行一个）',
	'editor.env': '环境变量（每行 KEY=VALUE）',
	'editor.cwd': '工作目录（可选）',
	'editor.url': '服务器地址',
	'editor.auth': '鉴权',
	'editor.auth.none': '无鉴权',
	'editor.auth.api': 'API 参数（header / query / body）',
	'editor.auth.oauth': 'OAuth 2.0（浏览器授权）',
	'editor.params.empty': '还没有参数，点下面添加。',
	'editor.params.name': '参数名',
	'editor.params.value': '参数值',
	'editor.params.add': '添加鉴权参数',
	'editor.params.secret': '已有参数保存后值以 •••• 显示，留空表示沿用旧值。',
	'editor.scope': '权限范围 scope（可选，空格分隔）',
	'editor.scope.ph': '例如 mcp:tools',
	'editor.clientMode': '客户端注册方式',
	'editor.clientMode.auto': '自动注册（DCR，推荐）',
	'editor.clientMode.cimd': 'CIMD：用本页地址作为 client_id',
	'editor.clientMode.manual': '手填 client_id / client_secret',
	'editor.clientId': 'client_id',
	'editor.clientId.ph': '服务器预先分配的 client id',
	'editor.clientSecret': 'client_secret（留空沿用已保存的值）',
	'editor.clientSecret.ph': '公共客户端留空',
	'editor.cimd.hint': 'client_id 将使用 {url}（需 HTTPS 访问；服务器需支持 CIMD）',
	'editor.oauth.hint': '保存后在该连接卡片上点「授权登录」：浏览器跳转到服务器的授权页，回调地址是本页同源 /api/mcp-apps/oauth/callback，令牌只存在宿主进程。',
	'editor.note': '备注（可选）',
	'editor.enableNow': '保存后立即启用（关闭时不会向模型暴露它的工具）',
	'editor.save': '添加并保存',
	'editor.test': '测试连接',
	'editor.test.ok': '连接成功，发现 {count} 个工具：',
	'editor.test.error': '连接失败：{message}',

	// connection card
	'card.status.ready': '已连接',
	'card.status.connecting': '连接中',
	'card.status.refreshing': '刷新工具列表',
	'card.status.reconnecting': '正在重连',
	'card.status.error': '连接失败',
	'card.status.needs_auth': '需要授权',
	'card.status.disabled': '已关闭',
	'card.tools.other': '{count} 个工具',
	'card.tools.disabled': '工具未暴露',
	'card.refresh': '重新连接',
	'card.refresh.hint': '工具列表已重新读取。模型会在下一条消息中看到新列表。',
	'card.listedAt': '更新于 {time}',
	'card.noUrl': '（未填写地址）',
	'card.auth.params': '鉴权 {count} 项',
	'card.auth.cimd': 'CIMD',
	'card.auth.manual': '手填 client',
	'card.auth.authorized': '已授权',
	'card.auth.unauthorized': '未授权',
	'card.toggle.on': '启用',
	'card.toggle.off': '关闭（不暴露工具）',
	'card.auth.startFail': '发起授权失败',
	'card.auth.blocked': '浏览器拦住了授权窗口，请允许弹窗后重试，或手动打开：{url}',
	'card.auth.waiting': '等待授权…',
	'card.auth.reauthorize': '重新授权',
	'card.auth.login': '授权登录',
	'card.auth.reset': '清除授权',

	// right-hand workbench and MCP App frames
	'workbench.title': '工作台',
	'workbench.preparing': '工作台准备中…',
	'workbench.previousCall': '历史调用',
	'workbench.openRight': '在右侧打开',
	'workbench.openedMarker': '【已开启工作台】',
	'workbench.resultHint': '结果与操作都在右侧工作台',
	'workbench.failed': '工作台未能打开，改为在对话内渲染。',
	'workbench.reason': '原因：{message}',
	'workbench.resource': 'MCP 资源地址：{uri}',
	'app.noResource': '该工具没有声明 ui:// 资源，无法渲染 MCP Apps。',
	'app.loading': '加载 MCP App…',
	'app.preparing': '准备中…',
	'tool.unknown': '未识别的工具',

	// transport-level failures, shown in the panel
	'error.badJson': '宿主返回了非 JSON 响应：{body}',
	'error.generic': '操作失败',
	'error.sidebarMissing': '右侧栏服务未加载',
	'error.resourceNotHtml': 'resources/read 未返回 HTML：{uri}',
	'error.noHandshake': '界面已加载但未握手：浏览器可能阻止了页面脚本',
	'error.notReady': '连接未就绪',
	'error.unknownCode': '{code}',

	// host half: prompt section, OAuth callback page, API error texts
	'host.prompt.title': '右侧「工作台」（MCP Apps）规则：',
	'host.prompt.afterCall': '带交互工作台的工具（MCP 服务器声明了 ui:// 资源的工具）调用完成后，宿主会自动把可交互界面开在会话右侧的工作台里，聊天里的工具行也会标记【已开启工作台】。',
	'host.prompt.rule1': '1. 这些工具成功后，正文只写一行【已开启工作台】，不要复述金额、余额、账目明细或表格。',
	'host.prompt.rule2': '2. 用户要查看或修改数据时，请他在右侧工作台里操作，不要代读或代改数据。',
	'host.prompt.rule3': '3. 仅当用户明确要求「把结果写在对话里」时，才贴出必要数字。',
	'host.prompt.rule4': '4. 工具返回 isError 时按普通错误处理，正常说明失败原因。',
	'host.callback.title': 'DSH 连接应用',
	'host.callback.mismatch': '无效的授权回调：state 不匹配。请回到「连接应用」重新发起授权。',
	'host.callback.refused': '授权被拒绝：{error}',
	'host.callback.noCode': '授权回调缺少 code。',
	'host.callback.done': '授权完成，可以关闭此窗口。',
	'host.callback.error': '授权错误：{message}',
	'host.callback.cimdHttps': 'CIMD 需要 HTTPS 访问地址：请用 https:// 域名打开本页再做授权',
	'host.error.noUrl': '{transport}：连接中没有 url',
	'host.error.noCommand': 'stdio 连接缺少 command',
	'host.error.emptyResult': '（空结果）',
	'host.error.disconnected': '连接已断开',
	'host.error.toolError': 'MCP 工具返回错误',
	'host.error.badServers': 'servers.json 需要形如 {"mcpServers": {...}}',
	'host.error.bodyTooLarge': '请求体过大',
	'host.error.registerConflict': '工具注册冲突：{message}',
	'host.error.unknownConnection': '未知连接：{id}',
	'host.error.notEnabled': '连接未启用',
	'host.error.badRpc': '不支持的 RPC：{method}',
	'host.error.unknownEndpoint': '未知接口',
	'host.error.unsupportedRequest': '不支持的请求',
	'host.error.generic': '内部错误：{message}'
};

/** English: the fallback every other language resolves against. */
const en = {
	'common.cancel': 'Cancel',
	'common.save': 'Save',
	'common.saving': 'Saving…',
	'common.delete': 'Delete',
	'common.edit': 'Edit',
	'common.retry': 'Retry',
	'common.test': 'Test',
	'common.testing': 'Testing…',
	'common.processing': 'Working…',
	'common.noName': 'Untitled',

	'panel.title': 'Connections',
	'panel.intro': 'Connect any MCP server (HTTP / SSE / stdio). A disabled connection exposes no tools to the model; tools that declare a ui:// resource render as MCP Apps in the workbench on the right.',
	'panel.add': 'Add MCP server',
	'panel.import': 'Import servers.json',
	'panel.import.action': 'Import',
	'panel.import.busy': 'Importing…',
	'panel.import.title': 'Paste the mcpServers block from Claude Code',
	'panel.refresh': 'Refresh',
	'panel.store': 'Data directory: {path}',
	'panel.loading': 'Reading the connection list…',
	'panel.empty': 'No connections yet. Use “Add MCP server” or “Import servers.json”.',

	'editor.title.new': 'Add MCP server',
	'editor.title.edit': 'Editing: {name}',
	'editor.name': 'Name (unique on this machine)',
	'editor.name.ph': 'for example notion',
	'editor.transport': 'Transport',
	'editor.transport.stdio': 'stdio (local process)',
	'editor.command': 'Command',
	'editor.args': 'Arguments (one per line)',
	'editor.env': 'Environment variables (one KEY=VALUE per line)',
	'editor.cwd': 'Working directory (optional)',
	'editor.url': 'Server URL',
	'editor.auth': 'Authorization',
	'editor.auth.none': 'No authorization',
	'editor.auth.api': 'API parameters (header / query / body)',
	'editor.auth.oauth': 'OAuth 2.0 (browser sign-in)',
	'editor.params.empty': 'No parameters yet — add them below.',
	'editor.params.name': 'Parameter name',
	'editor.params.value': 'Value',
	'editor.params.add': 'Add an authorization parameter',
	'editor.params.secret': 'Saved values show as ••••; leave the field empty to keep the stored one.',
	'editor.scope': 'Scope (optional, space separated)',
	'editor.scope.ph': 'for example mcp:tools',
	'editor.clientMode': 'Client registration',
	'editor.clientMode.auto': 'Automatic registration (DCR, recommended)',
	'editor.clientMode.cimd': 'CIMD: this page URL as the client_id',
	'editor.clientMode.manual': 'client_id / client_secret entered by hand',
	'editor.clientId': 'client_id',
	'editor.clientId.ph': 'client id assigned by the server',
	'editor.clientSecret': 'client_secret (empty keeps the saved value)',
	'editor.clientSecret.ph': 'Leave empty for a public client',
	'editor.cimd.hint': 'client_id will be {url} (must be reachable over HTTPS; the server must support CIMD)',
	'editor.oauth.hint': 'After saving, press “Sign in with OAuth” on the connection card: the browser opens the server authorization page, the redirect goes to /api/mcp-apps/oauth/callback on this host, and the token stays in the host process.',
	'editor.note': 'Note (optional)',
	'editor.enableNow': 'Enable right after saving (a disabled connection exposes no tools to the model)',
	'editor.save': 'Add and save',
	'editor.test': 'Test connection',
	'editor.test.ok': 'Connected, {count} tool(s) found:',
	'editor.test.error': 'Connection failed: {message}',

	'card.status.ready': 'Connected',
	'card.status.connecting': 'Connecting',
	'card.status.refreshing': 'Re-reading tools',
	'card.status.reconnecting': 'Reconnecting',
	'card.status.error': 'Connection failed',
	'card.status.needs_auth': 'Authorization required',
	'card.status.disabled': 'Disabled',
	'card.tools.one': '{count} tool',
	'card.tools.other': '{count} tools',
	'card.tools.disabled': 'Tools not exposed',
	'card.refresh': 'Reconnect',
	'card.refresh.hint': 'The tool list was re-read. The model sees it from the next message on.',
	'card.listedAt': 'updated {time}',
	'card.noUrl': '(URL not filled in)',
	'card.auth.params': 'Authorization: {count} parameter(s)',
	'card.auth.cimd': 'CIMD',
	'card.auth.manual': 'client entered by hand',
	'card.auth.authorized': 'Authorized',
	'card.auth.unauthorized': 'Not authorized',
	'card.toggle.on': 'Enable',
	'card.toggle.off': 'Disable (stop exposing tools)',
	'card.auth.startFail': 'Could not start authorization',
	'card.auth.blocked': 'The browser blocked the authorization window. Allow pop-ups and retry, or open it manually: {url}',
	'card.auth.waiting': 'Waiting for authorization…',
	'card.auth.reauthorize': 'Authorize again',
	'card.auth.login': 'Sign in with OAuth',
	'card.auth.reset': 'Clear authorization',

	'workbench.title': 'Workbench',
	'workbench.preparing': 'Preparing the workbench…',
	'workbench.previousCall': 'Previous call',
	'workbench.openRight': 'Open on the right',
	'workbench.openedMarker': '[Workbench opened]',
	'workbench.resultHint': 'Results and actions live in the workbench on the right',
	'workbench.failed': 'The workbench could not open, so the result renders inside the conversation.',
	'workbench.reason': 'Reason: {message}',
	'workbench.resource': 'MCP resource URL: {uri}',
	'app.noResource': 'This tool declares no ui:// resource, so MCP Apps cannot render it.',
	'app.loading': 'Loading the MCP App…',
	'app.preparing': 'Preparing…',
	'tool.unknown': 'Unknown tool',

	'error.badJson': 'The host returned a non-JSON response: {body}',
	'error.generic': 'The operation failed',
	'error.sidebarMissing': 'The sidebar service is not loaded',
	'error.resourceNotHtml': 'resources/read returned no HTML: {uri}',
	'error.noHandshake': 'The page loaded but never handshaked: the browser may be blocking scripts',
	'error.notReady': 'The connection is not ready',
	'error.unknownCode': '{code}',

	'host.prompt.title': 'Rules for the workbench (MCP Apps) on the right:',
	'host.prompt.afterCall': 'When a tool with an interactive workbench completes (its MCP server declared a ui:// resource), the host opens the interactive surface in the workbench on the right and marks the tool row in the chat with [Workbench opened].',
	'host.prompt.rule1': '1. After these tools succeed, write exactly one line [Workbench opened] in the reply and do not restate amounts, balances, entries, or tables.',
	'host.prompt.rule2': '2. When the user needs to look at or change data, ask them to do it in the workbench on the right — do not read or change that data for them.',
	'host.prompt.rule3': '3. Quote numbers only when the user explicitly asks for the result in the conversation.',
	'host.prompt.rule4': '4. When a tool returns isError, treat it as an ordinary failure and explain the reason normally.',
	'host.callback.title': 'DSH Connections',
	'host.callback.mismatch': 'Invalid authorization callback: the state does not match. Return to “Connections” and start the authorization again.',
	'host.callback.refused': 'Authorization refused: {error}',
	'host.callback.noCode': 'the authorization callback carries no code.',
	'host.callback.done': 'Authorization complete — you can close this window.',
	'host.callback.error': 'Authorization error: {message}',
	'host.callback.cimdHttps': 'CIMD needs an HTTPS address: open this page over an https:// domain and authorize again',
	'host.error.noUrl': '{transport}: the connection has no url',
	'host.error.noCommand': 'the stdio connection has no command',
	'host.error.emptyResult': '(empty result)',
	'host.error.disconnected': 'the connection was closed',
	'host.error.toolError': 'the MCP tool returned an error',
	'host.error.badServers': 'servers.json must look like {"mcpServers": {...}}',
	'host.error.bodyTooLarge': 'the request body is too large',
	'host.error.registerConflict': 'Tool registration conflict: {message}',
	'host.error.unknownConnection': 'Unknown connection: {id}',
	'host.error.notEnabled': 'the connection is not enabled',
	'host.error.badRpc': 'Unsupported RPC: {method}',
	'host.error.unknownEndpoint': 'Unknown endpoint',
	'host.error.unsupportedRequest': 'Unsupported request',
	'host.error.generic': 'Internal error: {message}'
};

/** Russian: the language this fork exists for. */
const ru = {
	'common.cancel': 'Отмена',
	'common.save': 'Сохранить',
	'common.saving': 'Сохранение…',
	'common.delete': 'Удалить',
	'common.edit': 'Изменить',
	'common.retry': 'Повторить',
	'common.test': 'Проверить',
	'common.testing': 'Проверка…',
	'common.processing': 'Обработка…',
	'common.noName': 'Без имени',

	'panel.title': 'Подключения',
	'panel.intro': 'Подключение любого MCP-сервера (HTTP / SSE / stdio). Выключенное подключение не отдаёт инструменты модели; инструменты с ресурсом ui:// рендерятся как MCP Apps в рабочей области справа.',
	'panel.add': 'Добавить MCP-сервер',
	'panel.import': 'Импорт servers.json',
	'panel.import.action': 'Импорт',
	'panel.import.busy': 'Импорт…',
	'panel.import.title': 'Вставьте конфигурацию mcpServers из Claude Code',
	'panel.refresh': 'Обновить',
	'panel.store': 'Каталог данных: {path}',
	'panel.loading': 'Чтение списка подключений…',
	'panel.empty': 'Подключений пока нет. Нажмите «Добавить MCP-сервер» или «Импорт servers.json».',

	'editor.title.new': 'Добавить MCP-сервер',
	'editor.title.edit': 'Изменение: {name}',
	'editor.name': 'Имя (уникальное на этой машине)',
	'editor.name.ph': 'например notion',
	'editor.transport': 'Транспорт',
	'editor.transport.stdio': 'stdio (локальный процесс)',
	'editor.command': 'Команда',
	'editor.args': 'Параметры (по одному в строке)',
	'editor.env': 'Переменные окружения (по одной KEY=VALUE в строке)',
	'editor.cwd': 'Рабочий каталог (необязательно)',
	'editor.url': 'Адрес сервера',
	'editor.auth': 'Авторизация',
	'editor.auth.none': 'Без авторизации',
	'editor.auth.api': 'Параметры API (header / query / body)',
	'editor.auth.oauth': 'OAuth 2.0 (авторизация в браузере)',
	'editor.params.empty': 'Параметров пока нет — добавьте ниже.',
	'editor.params.name': 'Имя параметра',
	'editor.params.value': 'Значение',
	'editor.params.add': 'Добавить параметр авторизации',
	'editor.params.secret': 'Сохранённые значения показываются как ••••; пустое поле — оставить прежнее значение.',
	'editor.scope': 'Scope (необязательно, через пробел)',
	'editor.scope.ph': 'например mcp:tools',
	'editor.clientMode': 'Регистрация клиента',
	'editor.clientMode.auto': 'Автоматическая регистрация (DCR, рекомендуется)',
	'editor.clientMode.cimd': 'CIMD: адрес этой страницы как client_id',
	'editor.clientMode.manual': 'client_id / client_secret вручную',
	'editor.clientId': 'client_id',
	'editor.clientId.ph': 'client id, выданный сервером',
	'editor.clientSecret': 'client_secret (пусто — оставить сохранённое)',
	'editor.clientSecret.ph': 'Для публичного клиента оставьте пустым',
	'editor.cimd.hint': 'client_id будет {url} (доступен по HTTPS; сервер должен поддерживать CIMD)',
	'editor.oauth.hint': 'После сохранения нажмите «Войти по OAuth» на карточке подключения: браузер откроет страницу авторизации сервера, адрес возврата — /api/mcp-apps/oauth/callback на этом же хосте, токен хранится только в процессе хоста.',
	'editor.note': 'Примечание (необязательно)',
	'editor.enableNow': 'Включить сразу после сохранения (выключенное подключение не отдаёт свои инструменты модели)',
	'editor.save': 'Добавить и сохранить',
	'editor.test': 'Проверить подключение',
	'editor.test.ok': 'Подключено, найдено инструментов: {count}',
	'editor.test.error': 'Ошибка подключения: {message}',

	'card.status.ready': 'Подключено',
	'card.status.connecting': 'Подключение',
	'card.status.refreshing': 'Перечитываю инструменты',
	'card.status.reconnecting': 'Переподключение',
	'card.status.error': 'Ошибка подключения',
	'card.status.needs_auth': 'Требуется авторизация',
	'card.status.disabled': 'Выключено',
	'card.tools.one': '{count} инструмент',
	'card.tools.few': '{count} инструмента',
	'card.tools.many': '{count} инструментов',
	'card.tools.other': '{count} инструмента',
		'card.tools.disabled': 'Инструменты не отдаются',
	'card.refresh': 'Переподключить',
	'card.refresh.hint': 'Список инструментов перечитан. Модель увидит его со следующего сообщения.',
	'card.listedAt': 'обновлено {time}',
	'card.noUrl': '(адрес не заполнен)',
	'card.auth.params': 'Авторизация: {count}',
	'card.auth.cimd': 'CIMD',
	'card.auth.manual': 'client вручную',
	'card.auth.authorized': 'Авторизовано',
	'card.auth.unauthorized': 'Не авторизовано',
	'card.toggle.on': 'Включить',
	'card.toggle.off': 'Выключить (не отдавать инструменты)',
	'card.auth.startFail': 'Не удалось начать авторизацию',
	'card.auth.blocked': 'Браузер заблокировал окно авторизации. Разрешите всплывающие окна и повторите — либо откройте вручную: {url}',
	'card.auth.waiting': 'Ожидание авторизации…',
	'card.auth.reauthorize': 'Переавторизовать',
	'card.auth.login': 'Войти по OAuth',
	'card.auth.reset': 'Сбросить авторизацию',

	'workbench.title': 'Рабочая область',
	'workbench.preparing': 'Подготовка рабочей области…',
	'workbench.previousCall': 'Прошлый вызов',
	'workbench.openRight': 'Открыть справа',
	'workbench.openedMarker': '【Рабочая область открыта】',
	'workbench.resultHint': 'Результаты и действия — в рабочей области справа',
	'workbench.failed': 'Рабочую область открыть не удалось — рендер внутри диалога.',
	'workbench.reason': 'Причина: {message}',
	'workbench.resource': 'Адрес MCP-ресурса: {uri}',
	'app.noResource': 'У инструмента нет ресурса ui:// — MCP Apps отрисовать нельзя.',
	'app.loading': 'Загрузка MCP App…',
	'app.preparing': 'Подготовка…',
	'tool.unknown': 'Неизвестный инструмент',

	'error.badJson': 'Хост вернул не-JSON ответ: {body}',
	'error.generic': 'Операция не удалась',
	'error.sidebarMissing': 'Служба боковой панели не загружена',
	'error.resourceNotHtml': 'resources/read не вернул HTML: {uri}',
	'error.noHandshake': 'Страница загрузилась, но рукопожатия нет: возможно, браузер блокирует скрипты',
	'error.notReady': 'Подключение не готово',
	'error.unknownCode': '{code}',

	'host.prompt.title': 'Правила рабочей области (MCP Apps) справа:',
	'host.prompt.afterCall': 'После вызова инструмента с интерактивной рабочей областью (у которого MCP-сервер объявил ресурс ui://) хост сам открывает интерактивный интерфейс в рабочей области справа, а строка инструмента в чате помечается 【Рабочая область открыта】.',
	'host.prompt.rule1': '1. После успешного вызова этих инструментов в тексте пишите только одну строку 【Рабочая область открыта】 и не пересказывайте суммы, остатки, проводки и таблицы.',
	'host.prompt.rule2': '2. Если пользователю нужно посмотреть или изменить данные, попросите его сделать это в рабочей области справа — не читайте и не правьте данные за него.',
	'host.prompt.rule3': '3. Числа приводите, только если пользователь явно просит «написать результат в диалоге».',
	'host.prompt.rule4': '4. Если инструмент вернул isError, обработайте это как обычную ошибку и нормально объясните причину.',
	'host.callback.title': 'DSH Подключения',
	'host.callback.mismatch': 'Некорректный ответ авторизации: state не совпадает. Вернитесь в «Подключения» и начните авторизацию заново.',
	'host.callback.refused': 'Авторизация отклонена: {error}',
	'host.callback.noCode': 'в ответе авторизации нет code.',
	'host.callback.done': 'Авторизация завершена, окно можно закрыть.',
	'host.callback.error': 'Ошибка авторизации: {message}',
	'host.callback.cimdHttps': 'Для CIMD нужен HTTPS-адрес: откройте эту страницу по домену https:// и повторите авторизацию',
	'host.error.noUrl': '{transport}: в подключении нет url',
	'host.error.noCommand': 'для stdio-подключения не задана команда',
	'host.error.emptyResult': '(пустой результат)',
	'host.error.disconnected': 'подключение разорвано',
	'host.error.toolError': 'MCP-инструмент вернул ошибку',
	'host.error.badServers': 'servers.json должен иметь вид {"mcpServers": {...}}',
	'host.error.bodyTooLarge': 'слишком большое тело запроса',
	'host.error.registerConflict': 'Конфликт регистрации инструментов: {message}',
	'host.error.unknownConnection': 'Неизвестное подключение: {id}',
	'host.error.notEnabled': 'подключение не включено',
	'host.error.badRpc': 'неподдерживаемый RPC: {method}',
	'host.error.unknownEndpoint': 'неизвестный эндпойнт',
	'host.error.unsupportedRequest': 'неподдерживаемый запрос',
	'host.error.generic': 'Внутренняя ошибка: {message}'
};

/** Language names written in their own language, used by `ctx.locale.addLanguage`. */
export const labels = { zh: '中文', en: 'English', ru: 'Русский' };

/** All dictionaries, one row per language. */
export const dictionaries = { zh, en, ru };

/** The language every lookup ends at. */
export const FALLBACK_LOCALE = 'en';

/** The dictionary used when no locale service is available at all. */
export const fallbackDict = en;

/** Namespace this plugin owns in the client locale registry. */
export const NAMESPACE = 'mcp-apps';

/** Language tags as DSH spells them in its own preference. */
export function normalizeLocale(tag) {
	const value = String(tag ?? '').trim().toLowerCase();
	if (value === '') return FALLBACK_LOCALE;
	const primary = value.split('-')[0];
	return Object.prototype.hasOwnProperty.call(dictionaries, primary) ? primary : FALLBACK_LOCALE;
}

/** Fill `{name}` placeholders; unknown names stay visible so a bug reports itself. */
function interpolate(template, params) {
	if (!params) return template;
	return template.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
}

/**
 * Resolve `key` for `lang`, walking `lang -> en`.
 *
 * Count-sensitive keys name one entry per CLDR category; when `params.count` is present the
 * category form is tried first, then `key.other`, then the bare key. Chinese carries only
 * `other`, English `one`/`other`, Russian `one`/`few`/`many` — a language that lacks a
 * category falls through to `other` instead of rendering a raw key.
 *
 * @param lang - language tag or id (`ru`, `ru-RU`, `en`).
 * @param key - dictionary key.
 * @param params - placeholder values, `count` included.
 * @returns the translated text, or the key itself when nothing matches.
 */
export function translate(lang, key, params) {
	const chain = [normalizeLocale(lang)];
	if (chain[0] !== FALLBACK_LOCALE) chain.push(FALLBACK_LOCALE);
	const candidates = [];
	if (params && typeof params.count === 'number') {
		const category = pluralCategory(chain[0], params.count);
		if (category !== 'other') candidates.push(key + '.' + category);
		candidates.push(key + '.other');
	}
	candidates.push(key);
	for (const candidate of candidates) {
		for (const candidateLang of chain) {
			const template = dictionaries[candidateLang][candidate];
			if (template !== undefined) return interpolate(template, params);
		}
	}
	return key;
}

/** CLDR plural category of `count` in `lang`; `other` when the runtime cannot tell. */
export function pluralCategory(lang, count) {
	try {
		return new Intl.PluralRules(lang).select(count);
	} catch {
		return 'other';
	}
}
