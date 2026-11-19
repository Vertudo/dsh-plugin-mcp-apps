# dsh-plugin-mcp-apps

通用 MCP 连接器 + MCP Apps 工作台。

- **连接应用**页（左侧栏「技能」下方，`order: 3`）：添加 / 编辑 / 启停任意 MCP 服务器，
  支持粘贴 Claude Code 的 `servers.json`（`{"mcpServers": {...}}`）或表单逐项填写。
- **传输**：Streamable HTTP、SSE、stdio（本地进程）。
- **鉴权**：三种模式
  - 无鉴权；
  - API 参数（`header` / `query` / `body` 三个位置，任意多个，每个连接一套；保存后值以
    `••••` 回显，留空表示沿用旧值）；
  - OAuth 2.0（浏览器授权码 + PKCE）：客户端注册方式可选**自动注册（DCR）**、
    **CIMD**（用本插件的元数据文档地址当 `client_id`）、或**手填 `client_id` /
    `client_secret`**。
- **启停**：关闭的连接不向模型注册任何工具（`ctx.tools.register` 的 disposer 全部执行），
  模型下一轮就看不到它；重新启用会重新连接并注册。
- **MCP Apps**：带 `_meta.ui.resourceUri`（`ui://…`）的工具，其调用完成后自动在右侧
  「工作台」标签页里渲染对应 App；聊天里只留一行 `【已开启工作台】`。右侧栏不可用时
  改为在对话内联渲染，并给出 `ui://` 资源地址。

## 行为

| 场景 | 聊天里的工具行 | 右侧栏 |
|---|---|---|
| 带 `ui://` 资源的工具调用完成 | `【已开启工作台】` + 「在右侧打开」按钮 | 自动展开一个 `mcp-app` 标签页，渲染该工具对应的 App |
| 同一会话再次调用 | 同上（不重复开标签页） | 复用同一个标签页，按新的 `navigation.revision` 重挂一遍 App |
| 右侧栏打不开（无会话 / 服务缺席 / 注册失败） | 「工作台未能打开，改为在对话内渲染。」+ **MCP 资源地址**（`ui://…`）+ 内联 App + 原始结果文本 | 无 |
| 刷新页面后重渲染的历史调用 | 「历史调用」+「在右侧打开」按钮（不自动开） | 无 |
| 其它（不带 UI 的）工具 | 完全不变，走通用行 | 无 |

宿主侧（`lib/index.js`）另外注册一段系统提示词：这些工具成功后只回一行
`【已开启工作台】`，不复述金额与明细；用户要看数据请到右侧工作台。提示词**需要重启
宿主**才生效。

## OAuth 2.0

1. 连接的鉴权模式选「OAuth 2.0」，可填 `scope`；点保存后在卡片上点「授权登录」。
2. 宿主按 MCP 规范做 RFC 9728 资源元数据发现 → RFC 8414 授权服务器发现 → 动态客户端注册
   （服务器不支持时改填 `client_id` / `client_secret`）→ 生成 PKCE（S256）授权地址，返回给页面。
3. 页面打开授权页；服务器回调到**本页同源**的 `/api/mcp-apps/oauth/callback`
   （地址按发起授权时的 `Host` / `X-Forwarded-Proto` 推导，所以走反向代理也成立）。
4. 客户端的三种来源：
   - `auto`（默认）：服务器支持动态注册时自动注册；
   - `cimd`：插件在 **`https://<本页域名>/api/mcp-apps/oauth/client-metadata.json`**
     发布 CIMD 文档（免鉴权 GET，内容随请求域名生成），文档里的 `client_id` 就是该地址，
     `redirect_uris` 指向同源回调。适用于只支持 URL 形式 client_id
     （`client_id_metadata_document_supported`）或不允许动态注册的服务器；需要 HTTPS 访问。
   - `manual`：填服务器预先分配的 `client_id` / `client_secret`。
   切换注册方式会丢弃旧的客户端注册（DCR 的 client id 不能当作 CIMD 用），已取到的令牌保留、可继续用。
5. 回调用 `state` 校验（PKCE + state 双保险，128 位随机），换到的 access/refresh token
   只写进宿主 `$DSH_HOME/mcp-apps/connections.json`（0600），随后自动重连并注册工具。
6. 令牌过期由 MCP SDK 用 refresh_token 续期；「清除授权」会断开连接并丢弃令牌
   （客户端注册信息保留，下次直接重新授权）。

回调页是一个极简 HTML，授权成功后自动 `window.close()` 并通知打开它的页面刷新列表。

## 数据与安全

- 连接配置存在 `$DSH_HOME/mcp-apps/connections.json`（权限 `0600`），宿主重启后自动
  重连所有启用的连接；首次运行会写入一条 `mcp-stuxx（示例）`（默认关闭，填好 token 再启用）。
- **凭据只在宿主进程里**（API 参数与 OAuth 令牌都是）：浏览器从不接触 token，也不直接连
  MCP 端点。页面与工作台都通过同源接口 `/api/mcp-apps/*` 走宿主代理
  （`tools/call`、`resources/read`）。OAuth 回调是唯一免 cookie 的路由，靠 `state` 防伪。
- 该接口要求浏览器携带 DSH 会话 cookie；仅本机回环地址放行，便于 `curl` 自测。
- 工具的模型可见名是 `mcp__<连接 id>__<原始工具名>`（超长/非法字符会追加哈希），
  与内置 `@deepseek-ai/dsh-mcp-client` 的 `mcp__<serverName>__*` 命名空间互不干扰。

## 限制

- `body` 位置的鉴权参数会被合并进每个 JSON-RPC 请求体的顶层字段；只对标准 JSON-RPC
  服务器有意义，对严格校验请求字段的服务器可能无效。
- 图片 / 音频内容块在文本投影里降级为占位说明，不写入附件存储。
- 单连接工具目录上限 500 条（仅影响 `/state` 展示）。
- 「工作台是否真的打开」只有浏览器知道，模型拿不到这个信号；失败兜底由工具行渲染，
  而不是由模型生成。

## 安装（作为 DSH 插件）

本包是一个完整插件：`main` 是宿主半边（连接器 + 系统提示词段），`dsh.client` 让 Web 端
加载 `./client` 作为浏览器半边，`dsh.bundle.patch` 指向包内自带的 `cordis.patch.yml` ——
profile 按 `dsh.profile.bundles` 顺序叠加它，插件就会被组装进来。

```sh
npm pack                       # 产出 dsh-plugin-mcp-apps-<ver>.tgz（再挪进 dist/）
sh scripts/install.sh /abs/path/to/dsh-plugin-mcp-apps-<ver>.tgz web
docker restart dsh             # 或你惯用的重启方式
```

`scripts/install.sh` 做三件事（每步都可重复执行）：

1. `dsh plugin --profile <profile> add <tgz>` —— 官方转发器，把包放进 profile 的 `node_modules`；
2. 把包名追加到 `<profile>/package.json` 的 `dsh.profile.bundles`；
3. 删掉 profile 里旧的手工 `- insert:` 条目，避免同一插件被组装两次。

### 装到其他设备

`scripts/install-remote.sh` 是同样的三步，但接受 npm 名、git 地址或 tgz：

```sh
# 1) 从 npm（发布后）
sh scripts/install-remote.sh dsh-plugin-mcp-apps web
# 2) 直接从 git（仓库公开时用 https，私有仓库用 ssh 并配好密钥）
sh scripts/install-remote.sh https://github.com/xiaoqin422/dsh-plugin-mcp-apps web
# 3) 手工拷 tgz
sh scripts/install-remote.sh ./dsh-plugin-mcp-apps-0.5.6.tgz web
```

profile 不存在时先 `dsh --profile <name> --from-default-profile web --dump-config >/dev/null`
生成一份，再跑安装脚本。装完都要重启 dsh 并硬刷新页面。

前置条件：DSH `>= 0.2.1-rc.2`；右侧工作台需要
`@deepseek-ai/dsh-client-ui-sidebar-right`（或任意提供 `sidebarRight` 的包）处于启用状态；
没有它时工具行退化为内联渲染，插件本身不会挂。

## 卸载

```sh
dsh plugin --profile web remove dsh-plugin-mcp-apps
# 再从 <profile>/package.json 的 dsh.profile.bundles 里删掉这一项，重启
```

## 开发

- 回归测试：
  - `node test/auth-injection.test.mjs` —— header / query / body 三个位置的注入、已有参数
    与 Accept 的保留、裸 token 自动补 `Bearer`。
  - `node test/row-fallback.test.cjs` —— 迷你 React 跑真实 bundle，覆盖页面与侧栏入口注册、
    `/state` 驱动的工具行认领与释放、工作台打开、内联兜底。
  - `node test/oauth-flow.test.cjs` —— 起一个 mock 授权服务器 + MCP 资源服务器，跑完整
    OAuth 链路（发现 → 注册 → PKCE 跳转 → 换令牌 → 带令牌调工具 → 按范围清理凭据），
    以及 CIMD 分支（服务器声明支持 URL 形式 client_id 时，`client_id` 就是元数据文档地址、
    不发生动态注册）。
  - 手动验证：`node -e 'require("./test/mock-oauth.cjs").startMock().then(m=>console.log(m.base))'`
    后把该地址 `/mcp` 作为连接加进来，走一遍「授权登录」。
- 鉴权注入：`lib/auth.js` 独立成模块，可直接 `import { authFetch }` 用假 fetch 验证
  header / query / body 三个位置以及已有 header 的保留；OAuth 的存储对接在 `lib/oauth.js`
  的 `RecordOAuthProvider`。
- 生效方式：客户端 bundle 改动刷新页面即可（必要时硬刷新）；宿主半边的改动要重启 dsh。
  调试期间可直接改 `/data/profiles/web/node_modules/dsh-plugin-mcp-apps/lib/*` 后再
  重新打包安装，保持一致。