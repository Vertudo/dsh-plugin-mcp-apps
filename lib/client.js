window.__ModuleLoader__.load({
	id: "dsh-plugin-mcp-apps",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.js
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);
var React2 = __toESM(require("react"), 1);

// src/i18n.js
var React = __toESM(require("react"), 1);

// lib/locales.js
var zh = {
  // shared controls
  "common.cancel": "\u53D6\u6D88",
  "common.save": "\u4FDD\u5B58",
  "common.saving": "\u4FDD\u5B58\u4E2D\u2026",
  "common.delete": "\u5220\u9664",
  "common.edit": "\u7F16\u8F91",
  "common.retry": "\u91CD\u8BD5",
  "common.test": "\u6D4B\u8BD5",
  "common.testing": "\u6D4B\u8BD5\u4E2D\u2026",
  "common.processing": "\u5904\u7406\u4E2D\u2026",
  "common.noName": "\u672A\u547D\u540D",
  // left-sidebar page
  "panel.title": "\u8FDE\u63A5\u5E94\u7528",
  "panel.intro": "\u63A5\u5165\u4EFB\u610F MCP \u670D\u52A1\u5668\uFF08HTTP / SSE / stdio\uFF09\u3002\u5173\u95ED\u7684\u8FDE\u63A5\u4E0D\u4F1A\u628A\u5DE5\u5177\u4EA4\u7ED9\u6A21\u578B\uFF1B\u5E26 ui:// \u8D44\u6E90\u7684\u5DE5\u5177\u4F1A\u5728\u53F3\u4FA7\u5DE5\u4F5C\u53F0\u6E32\u67D3 MCP Apps\u3002",
  "panel.add": "\u6DFB\u52A0 MCP \u670D\u52A1\u5668",
  "panel.import": "\u5BFC\u5165 servers.json",
  "panel.import.action": "\u5BFC\u5165",
  "panel.import.busy": "\u5BFC\u5165\u4E2D\u2026",
  "panel.import.title": "\u7C98\u8D34 Claude Code \u7684 mcpServers \u914D\u7F6E",
  "panel.refresh": "\u5237\u65B0",
  "panel.loading": "\u8BFB\u53D6\u8FDE\u63A5\u5217\u8868\u2026",
  "panel.empty": "\u8FD8\u6CA1\u6709\u8FDE\u63A5\u3002\u70B9\u300C\u6DFB\u52A0 MCP \u670D\u52A1\u5668\u300D\u6216\u300C\u5BFC\u5165 servers.json\u300D\u3002",
  // add/edit form
  "editor.title.new": "\u6DFB\u52A0 MCP \u670D\u52A1\u5668",
  "editor.title.edit": "\u7F16\u8F91\uFF1A{name}",
  "editor.name": "\u540D\u79F0\uFF08\u540C\u4E00\u53F0\u673A\u5668\u5185\u552F\u4E00\uFF09",
  "editor.name.ph": "\u4F8B\u5982 notion",
  "editor.transport": "\u4F20\u8F93\u65B9\u5F0F",
  "editor.transport.stdio": "stdio\uFF08\u672C\u5730\u8FDB\u7A0B\uFF09",
  "editor.command": "\u547D\u4EE4",
  "editor.args": "\u53C2\u6570\uFF08\u6BCF\u884C\u4E00\u4E2A\uFF09",
  "editor.env": "\u73AF\u5883\u53D8\u91CF\uFF08\u6BCF\u884C KEY=VALUE\uFF09",
  "editor.cwd": "\u5DE5\u4F5C\u76EE\u5F55\uFF08\u53EF\u9009\uFF09",
  "editor.url": "\u670D\u52A1\u5668\u5730\u5740",
  "editor.auth": "\u9274\u6743",
  "editor.auth.none": "\u65E0\u9274\u6743",
  "editor.auth.api": "API \u53C2\u6570\uFF08header / query / body\uFF09",
  "editor.auth.oauth": "OAuth 2.0\uFF08\u6D4F\u89C8\u5668\u6388\u6743\uFF09",
  "editor.params.empty": "\u8FD8\u6CA1\u6709\u53C2\u6570\uFF0C\u70B9\u4E0B\u9762\u6DFB\u52A0\u3002",
  "editor.params.name": "\u53C2\u6570\u540D",
  "editor.params.value": "\u53C2\u6570\u503C",
  "editor.params.add": "\u6DFB\u52A0\u9274\u6743\u53C2\u6570",
  "editor.params.secret": "\u5DF2\u6709\u53C2\u6570\u4FDD\u5B58\u540E\u503C\u4EE5 \u2022\u2022\u2022\u2022 \u663E\u793A\uFF0C\u7559\u7A7A\u8868\u793A\u6CBF\u7528\u65E7\u503C\u3002",
  "editor.scope": "\u6743\u9650\u8303\u56F4 scope\uFF08\u53EF\u9009\uFF0C\u7A7A\u683C\u5206\u9694\uFF09",
  "editor.scope.ph": "\u4F8B\u5982 mcp:tools",
  "editor.clientMode": "\u5BA2\u6237\u7AEF\u6CE8\u518C\u65B9\u5F0F",
  "editor.clientMode.auto": "\u81EA\u52A8\u6CE8\u518C\uFF08DCR\uFF0C\u63A8\u8350\uFF09",
  "editor.clientMode.cimd": "CIMD\uFF1A\u7528\u672C\u9875\u5730\u5740\u4F5C\u4E3A client_id",
  "editor.clientMode.manual": "\u624B\u586B client_id / client_secret",
  "editor.clientId": "client_id",
  "editor.clientId.ph": "\u670D\u52A1\u5668\u9884\u5148\u5206\u914D\u7684 client id",
  "editor.clientSecret": "client_secret\uFF08\u7559\u7A7A\u6CBF\u7528\u5DF2\u4FDD\u5B58\u7684\u503C\uFF09",
  "editor.clientSecret.ph": "\u516C\u5171\u5BA2\u6237\u7AEF\u7559\u7A7A",
  "editor.cimd.hint": "client_id \u5C06\u4F7F\u7528 {url}\uFF08\u9700 HTTPS \u8BBF\u95EE\uFF1B\u670D\u52A1\u5668\u9700\u652F\u6301 CIMD\uFF09",
  "editor.oauth.hint": "\u4FDD\u5B58\u540E\u5728\u8BE5\u8FDE\u63A5\u5361\u7247\u4E0A\u70B9\u300C\u6388\u6743\u767B\u5F55\u300D\uFF1A\u6D4F\u89C8\u5668\u8DF3\u8F6C\u5230\u670D\u52A1\u5668\u7684\u6388\u6743\u9875\uFF0C\u56DE\u8C03\u5730\u5740\u662F\u672C\u9875\u540C\u6E90 /api/mcp-apps/oauth/callback\uFF0C\u4EE4\u724C\u53EA\u5B58\u5728\u5BBF\u4E3B\u8FDB\u7A0B\u3002",
  "editor.note": "\u5907\u6CE8\uFF08\u53EF\u9009\uFF09",
  "editor.enableNow": "\u4FDD\u5B58\u540E\u7ACB\u5373\u542F\u7528\uFF08\u5173\u95ED\u65F6\u4E0D\u4F1A\u5411\u6A21\u578B\u66B4\u9732\u5B83\u7684\u5DE5\u5177\uFF09",
  "editor.save": "\u6DFB\u52A0\u5E76\u4FDD\u5B58",
  "editor.test": "\u6D4B\u8BD5\u8FDE\u63A5",
  "editor.test.ok": "\u8FDE\u63A5\u6210\u529F\uFF0C\u53D1\u73B0 {count} \u4E2A\u5DE5\u5177\uFF1A",
  "editor.test.error": "\u8FDE\u63A5\u5931\u8D25\uFF1A{message}",
  // connection card
  "card.status.ready": "\u5DF2\u8FDE\u63A5",
  "card.status.connecting": "\u8FDE\u63A5\u4E2D",
  "card.status.error": "\u8FDE\u63A5\u5931\u8D25",
  "card.status.needs_auth": "\u9700\u8981\u6388\u6743",
  "card.status.disabled": "\u5DF2\u5173\u95ED",
  "card.tools.other": "{count} \u4E2A\u5DE5\u5177",
  "card.tools.disabled": "\u5DE5\u5177\u672A\u66B4\u9732",
  "card.noUrl": "\uFF08\u672A\u586B\u5199\u5730\u5740\uFF09",
  "card.auth.params": "\u9274\u6743 {count} \u9879",
  "card.auth.cimd": "CIMD",
  "card.auth.manual": "\u624B\u586B client",
  "card.auth.authorized": "\u5DF2\u6388\u6743",
  "card.auth.unauthorized": "\u672A\u6388\u6743",
  "card.toggle.on": "\u542F\u7528",
  "card.toggle.off": "\u5173\u95ED\uFF08\u4E0D\u66B4\u9732\u5DE5\u5177\uFF09",
  "card.auth.startFail": "\u53D1\u8D77\u6388\u6743\u5931\u8D25",
  "card.auth.blocked": "\u6D4F\u89C8\u5668\u62E6\u4F4F\u4E86\u6388\u6743\u7A97\u53E3\uFF0C\u8BF7\u5141\u8BB8\u5F39\u7A97\u540E\u91CD\u8BD5\uFF0C\u6216\u624B\u52A8\u6253\u5F00\uFF1A{url}",
  "card.auth.waiting": "\u7B49\u5F85\u6388\u6743\u2026",
  "card.auth.reauthorize": "\u91CD\u65B0\u6388\u6743",
  "card.auth.login": "\u6388\u6743\u767B\u5F55",
  "card.auth.reset": "\u6E05\u9664\u6388\u6743",
  // right-hand workbench and MCP App frames
  "workbench.title": "\u5DE5\u4F5C\u53F0",
  "workbench.preparing": "\u5DE5\u4F5C\u53F0\u51C6\u5907\u4E2D\u2026",
  "workbench.previousCall": "\u5386\u53F2\u8C03\u7528",
  "workbench.openRight": "\u5728\u53F3\u4FA7\u6253\u5F00",
  "workbench.openedMarker": "\u3010\u5DF2\u5F00\u542F\u5DE5\u4F5C\u53F0\u3011",
  "workbench.resultHint": "\u7ED3\u679C\u4E0E\u64CD\u4F5C\u90FD\u5728\u53F3\u4FA7\u5DE5\u4F5C\u53F0",
  "workbench.failed": "\u5DE5\u4F5C\u53F0\u672A\u80FD\u6253\u5F00\uFF0C\u6539\u4E3A\u5728\u5BF9\u8BDD\u5185\u6E32\u67D3\u3002",
  "workbench.reason": "\u539F\u56E0\uFF1A{message}",
  "workbench.resource": "MCP \u8D44\u6E90\u5730\u5740\uFF1A{uri}",
  "app.noResource": "\u8BE5\u5DE5\u5177\u6CA1\u6709\u58F0\u660E ui:// \u8D44\u6E90\uFF0C\u65E0\u6CD5\u6E32\u67D3 MCP Apps\u3002",
  "app.loading": "\u52A0\u8F7D MCP App\u2026",
  "app.preparing": "\u51C6\u5907\u4E2D\u2026",
  "tool.unknown": "\u672A\u8BC6\u522B\u7684\u5DE5\u5177",
  // transport-level failures, shown in the panel
  "error.badJson": "\u5BBF\u4E3B\u8FD4\u56DE\u4E86\u975E JSON \u54CD\u5E94\uFF1A{body}",
  "error.generic": "\u64CD\u4F5C\u5931\u8D25",
  "error.sidebarMissing": "\u53F3\u4FA7\u680F\u670D\u52A1\u672A\u52A0\u8F7D",
  "error.resourceNotHtml": "resources/read \u672A\u8FD4\u56DE HTML\uFF1A{uri}",
  "error.noHandshake": "\u754C\u9762\u5DF2\u52A0\u8F7D\u4F46\u672A\u63E1\u624B\uFF1A\u6D4F\u89C8\u5668\u53EF\u80FD\u963B\u6B62\u4E86\u9875\u9762\u811A\u672C",
  "error.notReady": "\u8FDE\u63A5\u672A\u5C31\u7EEA",
  "error.unknownCode": "{code}",
  // host half: prompt section, OAuth callback page, API error texts
  "host.prompt.title": "\u53F3\u4FA7\u300C\u5DE5\u4F5C\u53F0\u300D\uFF08MCP Apps\uFF09\u89C4\u5219\uFF1A",
  "host.prompt.afterCall": "\u5E26\u4EA4\u4E92\u5DE5\u4F5C\u53F0\u7684\u5DE5\u5177\uFF08MCP \u670D\u52A1\u5668\u58F0\u660E\u4E86 ui:// \u8D44\u6E90\u7684\u5DE5\u5177\uFF09\u8C03\u7528\u5B8C\u6210\u540E\uFF0C\u5BBF\u4E3B\u4F1A\u81EA\u52A8\u628A\u53EF\u4EA4\u4E92\u754C\u9762\u5F00\u5728\u4F1A\u8BDD\u53F3\u4FA7\u7684\u5DE5\u4F5C\u53F0\u91CC\uFF0C\u804A\u5929\u91CC\u7684\u5DE5\u5177\u884C\u4E5F\u4F1A\u6807\u8BB0\u3010\u5DF2\u5F00\u542F\u5DE5\u4F5C\u53F0\u3011\u3002",
  "host.prompt.rule1": "1. \u8FD9\u4E9B\u5DE5\u5177\u6210\u529F\u540E\uFF0C\u6B63\u6587\u53EA\u5199\u4E00\u884C\u3010\u5DF2\u5F00\u542F\u5DE5\u4F5C\u53F0\u3011\uFF0C\u4E0D\u8981\u590D\u8FF0\u91D1\u989D\u3001\u4F59\u989D\u3001\u8D26\u76EE\u660E\u7EC6\u6216\u8868\u683C\u3002",
  "host.prompt.rule2": "2. \u7528\u6237\u8981\u67E5\u770B\u6216\u4FEE\u6539\u6570\u636E\u65F6\uFF0C\u8BF7\u4ED6\u5728\u53F3\u4FA7\u5DE5\u4F5C\u53F0\u91CC\u64CD\u4F5C\uFF0C\u4E0D\u8981\u4EE3\u8BFB\u6216\u4EE3\u6539\u6570\u636E\u3002",
  "host.prompt.rule3": "3. \u4EC5\u5F53\u7528\u6237\u660E\u786E\u8981\u6C42\u300C\u628A\u7ED3\u679C\u5199\u5728\u5BF9\u8BDD\u91CC\u300D\u65F6\uFF0C\u624D\u8D34\u51FA\u5FC5\u8981\u6570\u5B57\u3002",
  "host.prompt.rule4": "4. \u5DE5\u5177\u8FD4\u56DE isError \u65F6\u6309\u666E\u901A\u9519\u8BEF\u5904\u7406\uFF0C\u6B63\u5E38\u8BF4\u660E\u5931\u8D25\u539F\u56E0\u3002",
  "host.seed.name": "mcp-stuxx\uFF08\u793A\u4F8B\uFF09",
  "host.seed.note": "\u793A\u4F8B\uFF1A\u586B\u5165 Bearer token \u540E\u542F\u7528\u3002\u8FDE\u63A5 id \u53D6 mcpstuxx\uFF0C\u5DE5\u5177\u540D\u4E0E\u5185\u7F6E mcp-client \u4E00\u81F4\uFF08mcp__mcpstuxx__*\uFF09\uFF0C\u5E76\u989D\u5916\u5E26\u4E0A ui:// \u5143\u6570\u636E\u3002",
  "host.callback.title": "DSH \u8FDE\u63A5\u5E94\u7528",
  "host.callback.mismatch": "\u65E0\u6548\u7684\u6388\u6743\u56DE\u8C03\uFF1Astate \u4E0D\u5339\u914D\u3002\u8BF7\u56DE\u5230\u300C\u8FDE\u63A5\u5E94\u7528\u300D\u91CD\u65B0\u53D1\u8D77\u6388\u6743\u3002",
  "host.callback.refused": "\u6388\u6743\u88AB\u62D2\u7EDD\uFF1A{error}",
  "host.callback.noCode": "\u6388\u6743\u56DE\u8C03\u7F3A\u5C11 code\u3002",
  "host.callback.done": "\u6388\u6743\u5B8C\u6210\uFF0C\u53EF\u4EE5\u5173\u95ED\u6B64\u7A97\u53E3\u3002",
  "host.callback.error": "\u6388\u6743\u9519\u8BEF\uFF1A{message}",
  "host.callback.cimdHttps": "CIMD \u9700\u8981 HTTPS \u8BBF\u95EE\u5730\u5740\uFF1A\u8BF7\u7528 https:// \u57DF\u540D\u6253\u5F00\u672C\u9875\u518D\u505A\u6388\u6743",
  "host.error.noUrl": "{transport}\uFF1A\u8FDE\u63A5\u4E2D\u6CA1\u6709 url",
  "host.error.noCommand": "stdio \u8FDE\u63A5\u7F3A\u5C11 command",
  "host.error.emptyResult": "\uFF08\u7A7A\u7ED3\u679C\uFF09",
  "host.error.disconnected": "\u8FDE\u63A5\u5DF2\u65AD\u5F00",
  "host.error.toolError": "MCP \u5DE5\u5177\u8FD4\u56DE\u9519\u8BEF",
  "host.error.badServers": 'servers.json \u9700\u8981\u5F62\u5982 {"mcpServers": {...}}',
  "host.error.bodyTooLarge": "\u8BF7\u6C42\u4F53\u8FC7\u5927",
  "host.error.registerConflict": "\u5DE5\u5177\u6CE8\u518C\u51B2\u7A81\uFF1A{message}",
  "host.error.unknownConnection": "\u672A\u77E5\u8FDE\u63A5\uFF1A{id}",
  "host.error.notEnabled": "\u8FDE\u63A5\u672A\u542F\u7528",
  "host.error.badRpc": "\u4E0D\u652F\u6301\u7684 RPC\uFF1A{method}",
  "host.error.unknownEndpoint": "\u672A\u77E5\u63A5\u53E3",
  "host.error.unsupportedRequest": "\u4E0D\u652F\u6301\u7684\u8BF7\u6C42",
  "host.error.generic": "\u5185\u90E8\u9519\u8BEF\uFF1A{message}"
};
var en = {
  "common.cancel": "Cancel",
  "common.save": "Save",
  "common.saving": "Saving\u2026",
  "common.delete": "Delete",
  "common.edit": "Edit",
  "common.retry": "Retry",
  "common.test": "Test",
  "common.testing": "Testing\u2026",
  "common.processing": "Working\u2026",
  "common.noName": "Untitled",
  "panel.title": "Connections",
  "panel.intro": "Connect any MCP server (HTTP / SSE / stdio). A disabled connection exposes no tools to the model; tools that declare a ui:// resource render as MCP Apps in the workbench on the right.",
  "panel.add": "Add MCP server",
  "panel.import": "Import servers.json",
  "panel.import.action": "Import",
  "panel.import.busy": "Importing\u2026",
  "panel.import.title": "Paste the mcpServers block from Claude Code",
  "panel.refresh": "Refresh",
  "panel.loading": "Reading the connection list\u2026",
  "panel.empty": "No connections yet. Use \u201CAdd MCP server\u201D or \u201CImport servers.json\u201D.",
  "editor.title.new": "Add MCP server",
  "editor.title.edit": "Editing: {name}",
  "editor.name": "Name (unique on this machine)",
  "editor.name.ph": "for example notion",
  "editor.transport": "Transport",
  "editor.transport.stdio": "stdio (local process)",
  "editor.command": "Command",
  "editor.args": "Arguments (one per line)",
  "editor.env": "Environment variables (one KEY=VALUE per line)",
  "editor.cwd": "Working directory (optional)",
  "editor.url": "Server URL",
  "editor.auth": "Authorization",
  "editor.auth.none": "No authorization",
  "editor.auth.api": "API parameters (header / query / body)",
  "editor.auth.oauth": "OAuth 2.0 (browser sign-in)",
  "editor.params.empty": "No parameters yet \u2014 add them below.",
  "editor.params.name": "Parameter name",
  "editor.params.value": "Value",
  "editor.params.add": "Add an authorization parameter",
  "editor.params.secret": "Saved values show as \u2022\u2022\u2022\u2022; leave the field empty to keep the stored one.",
  "editor.scope": "Scope (optional, space separated)",
  "editor.scope.ph": "for example mcp:tools",
  "editor.clientMode": "Client registration",
  "editor.clientMode.auto": "Automatic registration (DCR, recommended)",
  "editor.clientMode.cimd": "CIMD: this page URL as the client_id",
  "editor.clientMode.manual": "client_id / client_secret entered by hand",
  "editor.clientId": "client_id",
  "editor.clientId.ph": "client id assigned by the server",
  "editor.clientSecret": "client_secret (empty keeps the saved value)",
  "editor.clientSecret.ph": "Leave empty for a public client",
  "editor.cimd.hint": "client_id will be {url} (must be reachable over HTTPS; the server must support CIMD)",
  "editor.oauth.hint": "After saving, press \u201CSign in with OAuth\u201D on the connection card: the browser opens the server authorization page, the redirect goes to /api/mcp-apps/oauth/callback on this host, and the token stays in the host process.",
  "editor.note": "Note (optional)",
  "editor.enableNow": "Enable right after saving (a disabled connection exposes no tools to the model)",
  "editor.save": "Add and save",
  "editor.test": "Test connection",
  "editor.test.ok": "Connected, {count} tool(s) found:",
  "editor.test.error": "Connection failed: {message}",
  "card.status.ready": "Connected",
  "card.status.connecting": "Connecting",
  "card.status.error": "Connection failed",
  "card.status.needs_auth": "Authorization required",
  "card.status.disabled": "Disabled",
  "card.tools.one": "{count} tool",
  "card.tools.other": "{count} tools",
  "card.tools.disabled": "Tools not exposed",
  "card.noUrl": "(URL not filled in)",
  "card.auth.params": "Authorization: {count} parameter(s)",
  "card.auth.cimd": "CIMD",
  "card.auth.manual": "client entered by hand",
  "card.auth.authorized": "Authorized",
  "card.auth.unauthorized": "Not authorized",
  "card.toggle.on": "Enable",
  "card.toggle.off": "Disable (stop exposing tools)",
  "card.auth.startFail": "Could not start authorization",
  "card.auth.blocked": "The browser blocked the authorization window. Allow pop-ups and retry, or open it manually: {url}",
  "card.auth.waiting": "Waiting for authorization\u2026",
  "card.auth.reauthorize": "Authorize again",
  "card.auth.login": "Sign in with OAuth",
  "card.auth.reset": "Clear authorization",
  "workbench.title": "Workbench",
  "workbench.preparing": "Preparing the workbench\u2026",
  "workbench.previousCall": "Previous call",
  "workbench.openRight": "Open on the right",
  "workbench.openedMarker": "[Workbench opened]",
  "workbench.resultHint": "Results and actions live in the workbench on the right",
  "workbench.failed": "The workbench could not open, so the result renders inside the conversation.",
  "workbench.reason": "Reason: {message}",
  "workbench.resource": "MCP resource URL: {uri}",
  "app.noResource": "This tool declares no ui:// resource, so MCP Apps cannot render it.",
  "app.loading": "Loading the MCP App\u2026",
  "app.preparing": "Preparing\u2026",
  "tool.unknown": "Unknown tool",
  "error.badJson": "The host returned a non-JSON response: {body}",
  "error.generic": "The operation failed",
  "error.sidebarMissing": "The sidebar service is not loaded",
  "error.resourceNotHtml": "resources/read returned no HTML: {uri}",
  "error.noHandshake": "The page loaded but never handshaked: the browser may be blocking scripts",
  "error.notReady": "The connection is not ready",
  "error.unknownCode": "{code}",
  "host.prompt.title": "Rules for the workbench (MCP Apps) on the right:",
  "host.prompt.afterCall": "When a tool with an interactive workbench completes (its MCP server declared a ui:// resource), the host opens the interactive surface in the workbench on the right and marks the tool row in the chat with [Workbench opened].",
  "host.prompt.rule1": "1. After these tools succeed, write exactly one line [Workbench opened] in the reply and do not restate amounts, balances, entries, or tables.",
  "host.prompt.rule2": "2. When the user needs to look at or change data, ask them to do it in the workbench on the right \u2014 do not read or change that data for them.",
  "host.prompt.rule3": "3. Quote numbers only when the user explicitly asks for the result in the conversation.",
  "host.prompt.rule4": "4. When a tool returns isError, treat it as an ordinary failure and explain the reason normally.",
  "host.seed.name": "mcp-stuxx (example)",
  "host.seed.note": "Example: fill in a Bearer token and enable it. The connection id is mcpstuxx, tool names match the built-in mcp-client (mcp__mcpstuxx__*), and ui:// metadata rides along.",
  "host.callback.title": "DSH Connections",
  "host.callback.mismatch": "Invalid authorization callback: the state does not match. Return to \u201CConnections\u201D and start the authorization again.",
  "host.callback.refused": "Authorization refused: {error}",
  "host.callback.noCode": "the authorization callback carries no code.",
  "host.callback.done": "Authorization complete \u2014 you can close this window.",
  "host.callback.error": "Authorization error: {message}",
  "host.callback.cimdHttps": "CIMD needs an HTTPS address: open this page over an https:// domain and authorize again",
  "host.error.noUrl": "{transport}: the connection has no url",
  "host.error.noCommand": "the stdio connection has no command",
  "host.error.emptyResult": "(empty result)",
  "host.error.disconnected": "the connection was closed",
  "host.error.toolError": "the MCP tool returned an error",
  "host.error.badServers": 'servers.json must look like {"mcpServers": {...}}',
  "host.error.bodyTooLarge": "the request body is too large",
  "host.error.registerConflict": "Tool registration conflict: {message}",
  "host.error.unknownConnection": "Unknown connection: {id}",
  "host.error.notEnabled": "the connection is not enabled",
  "host.error.badRpc": "Unsupported RPC: {method}",
  "host.error.unknownEndpoint": "Unknown endpoint",
  "host.error.unsupportedRequest": "Unsupported request",
  "host.error.generic": "Internal error: {message}"
};
var ru = {
  "common.cancel": "\u041E\u0442\u043C\u0435\u043D\u0430",
  "common.save": "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  "common.saving": "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u2026",
  "common.delete": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
  "common.edit": "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
  "common.retry": "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C",
  "common.test": "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C",
  "common.testing": "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430\u2026",
  "common.processing": "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430\u2026",
  "common.noName": "\u0411\u0435\u0437 \u0438\u043C\u0435\u043D\u0438",
  "panel.title": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
  "panel.intro": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043B\u044E\u0431\u043E\u0433\u043E MCP-\u0441\u0435\u0440\u0432\u0435\u0440\u0430 (HTTP / SSE / stdio). \u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u043E\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043E\u0442\u0434\u0430\u0451\u0442 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u043C\u043E\u0434\u0435\u043B\u0438; \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0441 \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u043C ui:// \u0440\u0435\u043D\u0434\u0435\u0440\u044F\u0442\u0441\u044F \u043A\u0430\u043A MCP Apps \u0432 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0441\u043F\u0440\u0430\u0432\u0430.",
  "panel.add": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C MCP-\u0441\u0435\u0440\u0432\u0435\u0440",
  "panel.import": "\u0418\u043C\u043F\u043E\u0440\u0442 servers.json",
  "panel.import.action": "\u0418\u043C\u043F\u043E\u0440\u0442",
  "panel.import.busy": "\u0418\u043C\u043F\u043E\u0440\u0442\u2026",
  "panel.import.title": "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044E mcpServers \u0438\u0437 Claude Code",
  "panel.refresh": "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C",
  "panel.loading": "\u0427\u0442\u0435\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439\u2026",
  "panel.empty": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C MCP-\u0441\u0435\u0440\u0432\u0435\u0440\xBB \u0438\u043B\u0438 \xAB\u0418\u043C\u043F\u043E\u0440\u0442 servers.json\xBB.",
  "editor.title.new": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C MCP-\u0441\u0435\u0440\u0432\u0435\u0440",
  "editor.title.edit": "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435: {name}",
  "editor.name": "\u0418\u043C\u044F (\u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u043D\u0430 \u044D\u0442\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u0435)",
  "editor.name.ph": "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 notion",
  "editor.transport": "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442",
  "editor.transport.stdio": "stdio (\u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441)",
  "editor.command": "\u041A\u043E\u043C\u0430\u043D\u0434\u0430",
  "editor.args": "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B (\u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u0432 \u0441\u0442\u0440\u043E\u043A\u0435)",
  "editor.env": "\u041F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F (\u043F\u043E \u043E\u0434\u043D\u043E\u0439 KEY=VALUE \u0432 \u0441\u0442\u0440\u043E\u043A\u0435)",
  "editor.cwd": "\u0420\u0430\u0431\u043E\u0447\u0438\u0439 \u043A\u0430\u0442\u0430\u043B\u043E\u0433 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",
  "editor.url": "\u0410\u0434\u0440\u0435\u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
  "editor.auth": "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
  "editor.auth.none": "\u0411\u0435\u0437 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
  "editor.auth.api": "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B API (header / query / body)",
  "editor.auth.oauth": "OAuth 2.0 (\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435)",
  "editor.params.empty": "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u2014 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043D\u0438\u0436\u0435.",
  "editor.params.name": "\u0418\u043C\u044F \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430",
  "editor.params.value": "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435",
  "editor.params.add": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
  "editor.params.secret": "\u0421\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u043A\u0430\u043A \u2022\u2022\u2022\u2022; \u043F\u0443\u0441\u0442\u043E\u0435 \u043F\u043E\u043B\u0435 \u2014 \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u0435\u0436\u043D\u0435\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435.",
  "editor.scope": "Scope (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E, \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u043E\u0431\u0435\u043B)",
  "editor.scope.ph": "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 mcp:tools",
  "editor.clientMode": "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430",
  "editor.clientMode.auto": "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F (DCR, \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u0442\u0441\u044F)",
  "editor.clientMode.cimd": "CIMD: \u0430\u0434\u0440\u0435\u0441 \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043A\u0430\u043A client_id",
  "editor.clientMode.manual": "client_id / client_secret \u0432\u0440\u0443\u0447\u043D\u0443\u044E",
  "editor.clientId": "client_id",
  "editor.clientId.ph": "client id, \u0432\u044B\u0434\u0430\u043D\u043D\u044B\u0439 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C",
  "editor.clientSecret": "client_secret (\u043F\u0443\u0441\u0442\u043E \u2014 \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u043E\u0435)",
  "editor.clientSecret.ph": "\u0414\u043B\u044F \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u043E\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u0443\u0441\u0442\u044B\u043C",
  "editor.cimd.hint": "client_id \u0431\u0443\u0434\u0435\u0442 {url} (\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043F\u043E HTTPS; \u0441\u0435\u0440\u0432\u0435\u0440 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C CIMD)",
  "editor.oauth.hint": "\u041F\u043E\u0441\u043B\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0412\u043E\u0439\u0442\u0438 \u043F\u043E OAuth\xBB \u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F: \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043E\u0442\u043A\u0440\u043E\u0435\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u0430, \u0430\u0434\u0440\u0435\u0441 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430 \u2014 /api/mcp-apps/oauth/callback \u043D\u0430 \u044D\u0442\u043E\u043C \u0436\u0435 \u0445\u043E\u0441\u0442\u0435, \u0442\u043E\u043A\u0435\u043D \u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0445\u043E\u0441\u0442\u0430.",
  "editor.note": "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",
  "editor.enableNow": "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u0440\u0430\u0437\u0443 \u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F (\u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u043E\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043E\u0442\u0434\u0430\u0451\u0442 \u0441\u0432\u043E\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u043C\u043E\u0434\u0435\u043B\u0438)",
  "editor.save": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  "editor.test": "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
  "editor.test.ok": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432: {count}",
  "editor.test.error": "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F: {message}",
  "card.status.ready": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",
  "card.status.connecting": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
  "card.status.error": "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
  "card.status.needs_auth": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
  "card.status.disabled": "\u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E",
  "card.tools.one": "{count} \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442",
  "card.tools.few": "{count} \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430",
  "card.tools.many": "{count} \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432",
  "card.tools.other": "{count} \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430",
  "card.tools.disabled": "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u043D\u0435 \u043E\u0442\u0434\u0430\u044E\u0442\u0441\u044F",
  "card.noUrl": "(\u0430\u0434\u0440\u0435\u0441 \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D)",
  "card.auth.params": "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F: {count}",
  "card.auth.cimd": "CIMD",
  "card.auth.manual": "client \u0432\u0440\u0443\u0447\u043D\u0443\u044E",
  "card.auth.authorized": "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043E",
  "card.auth.unauthorized": "\u041D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043E",
  "card.toggle.on": "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C",
  "card.toggle.off": "\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C (\u043D\u0435 \u043E\u0442\u0434\u0430\u0432\u0430\u0442\u044C \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B)",
  "card.auth.startFail": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0447\u0430\u0442\u044C \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044E",
  "card.auth.blocked": "\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043B \u043E\u043A\u043D\u043E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438. \u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0438\u0435 \u043E\u043A\u043D\u0430 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u2014 \u043B\u0438\u0431\u043E \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0432\u0440\u0443\u0447\u043D\u0443\u044E: {url}",
  "card.auth.waiting": "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438\u2026",
  "card.auth.reauthorize": "\u041F\u0435\u0440\u0435\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C",
  "card.auth.login": "\u0412\u043E\u0439\u0442\u0438 \u043F\u043E OAuth",
  "card.auth.reset": "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044E",
  "workbench.title": "\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C",
  "workbench.preparing": "\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438\u2026",
  "workbench.previousCall": "\u041F\u0440\u043E\u0448\u043B\u044B\u0439 \u0432\u044B\u0437\u043E\u0432",
  "workbench.openRight": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u043F\u0440\u0430\u0432\u0430",
  "workbench.openedMarker": "\u3010\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u0430\u3011",
  "workbench.resultHint": "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u2014 \u0432 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0441\u043F\u0440\u0430\u0432\u0430",
  "workbench.failed": "\u0420\u0430\u0431\u043E\u0447\u0443\u044E \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u2014 \u0440\u0435\u043D\u0434\u0435\u0440 \u0432\u043D\u0443\u0442\u0440\u0438 \u0434\u0438\u0430\u043B\u043E\u0433\u0430.",
  "workbench.reason": "\u041F\u0440\u0438\u0447\u0438\u043D\u0430: {message}",
  "workbench.resource": "\u0410\u0434\u0440\u0435\u0441 MCP-\u0440\u0435\u0441\u0443\u0440\u0441\u0430: {uri}",
  "app.noResource": "\u0423 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430 \u043D\u0435\u0442 \u0440\u0435\u0441\u0443\u0440\u0441\u0430 ui:// \u2014 MCP Apps \u043E\u0442\u0440\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043D\u0435\u043B\u044C\u0437\u044F.",
  "app.loading": "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 MCP App\u2026",
  "app.preparing": "\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430\u2026",
  "tool.unknown": "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442",
  "error.badJson": "\u0425\u043E\u0441\u0442 \u0432\u0435\u0440\u043D\u0443\u043B \u043D\u0435-JSON \u043E\u0442\u0432\u0435\u0442: {body}",
  "error.generic": "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u044F \u043D\u0435 \u0443\u0434\u0430\u043B\u0430\u0441\u044C",
  "error.sidebarMissing": "\u0421\u043B\u0443\u0436\u0431\u0430 \u0431\u043E\u043A\u043E\u0432\u043E\u0439 \u043F\u0430\u043D\u0435\u043B\u0438 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430",
  "error.resourceNotHtml": "resources/read \u043D\u0435 \u0432\u0435\u0440\u043D\u0443\u043B HTML: {uri}",
  "error.noHandshake": "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0430\u0441\u044C, \u043D\u043E \u0440\u0443\u043A\u043E\u043F\u043E\u0436\u0430\u0442\u0438\u044F \u043D\u0435\u0442: \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442 \u0441\u043A\u0440\u0438\u043F\u0442\u044B",
  "error.notReady": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u0433\u043E\u0442\u043E\u0432\u043E",
  "error.unknownCode": "{code}",
  "host.prompt.title": "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 (MCP Apps) \u0441\u043F\u0440\u0430\u0432\u0430:",
  "host.prompt.afterCall": "\u041F\u043E\u0441\u043B\u0435 \u0432\u044B\u0437\u043E\u0432\u0430 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430 \u0441 \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u044C\u044E (\u0443 \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E MCP-\u0441\u0435\u0440\u0432\u0435\u0440 \u043E\u0431\u044A\u044F\u0432\u0438\u043B \u0440\u0435\u0441\u0443\u0440\u0441 ui://) \u0445\u043E\u0441\u0442 \u0441\u0430\u043C \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u0432 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0441\u043F\u0440\u0430\u0432\u0430, \u0430 \u0441\u0442\u0440\u043E\u043A\u0430 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430 \u0432 \u0447\u0430\u0442\u0435 \u043F\u043E\u043C\u0435\u0447\u0430\u0435\u0442\u0441\u044F \u3010\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u0430\u3011.",
  "host.prompt.rule1": "1. \u041F\u043E\u0441\u043B\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E\u0433\u043E \u0432\u044B\u0437\u043E\u0432\u0430 \u044D\u0442\u0438\u0445 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0432 \u0442\u0435\u043A\u0441\u0442\u0435 \u043F\u0438\u0448\u0438\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0434\u043D\u0443 \u0441\u0442\u0440\u043E\u043A\u0443 \u3010\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u0430\u3011 \u0438 \u043D\u0435 \u043F\u0435\u0440\u0435\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u0439\u0442\u0435 \u0441\u0443\u043C\u043C\u044B, \u043E\u0441\u0442\u0430\u0442\u043A\u0438, \u043F\u0440\u043E\u0432\u043E\u0434\u043A\u0438 \u0438 \u0442\u0430\u0431\u043B\u0438\u0446\u044B.",
  "host.prompt.rule2": "2. \u0415\u0441\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E \u043D\u0443\u0436\u043D\u043E \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0438\u043B\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435, \u043F\u043E\u043F\u0440\u043E\u0441\u0438\u0442\u0435 \u0435\u0433\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u0432 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0441\u043F\u0440\u0430\u0432\u0430 \u2014 \u043D\u0435 \u0447\u0438\u0442\u0430\u0439\u0442\u0435 \u0438 \u043D\u0435 \u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0437\u0430 \u043D\u0435\u0433\u043E.",
  "host.prompt.rule3": "3. \u0427\u0438\u0441\u043B\u0430 \u043F\u0440\u0438\u0432\u043E\u0434\u0438\u0442\u0435, \u0442\u043E\u043B\u044C\u043A\u043E \u0435\u0441\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u044F\u0432\u043D\u043E \u043F\u0440\u043E\u0441\u0438\u0442 \xAB\u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0432 \u0434\u0438\u0430\u043B\u043E\u0433\u0435\xBB.",
  "host.prompt.rule4": "4. \u0415\u0441\u043B\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 \u0432\u0435\u0440\u043D\u0443\u043B isError, \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0439\u0442\u0435 \u044D\u0442\u043E \u043A\u0430\u043A \u043E\u0431\u044B\u0447\u043D\u0443\u044E \u043E\u0448\u0438\u0431\u043A\u0443 \u0438 \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u0442\u0435 \u043F\u0440\u0438\u0447\u0438\u043D\u0443.",
  "host.seed.name": "mcp-stuxx (\u043F\u0440\u0438\u043C\u0435\u0440)",
  "host.seed.note": "\u041F\u0440\u0438\u043C\u0435\u0440: \u0443\u043A\u0430\u0436\u0438\u0442\u0435 Bearer-\u0442\u043E\u043A\u0435\u043D \u0438 \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u0435. id \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u2014 mcpstuxx, \u0438\u043C\u0435\u043D\u0430 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043A\u0430\u043A \u0443 \u0448\u0442\u0430\u0442\u043D\u043E\u0433\u043E mcp-client (mcp__mcpstuxx__*), \u043F\u043B\u044E\u0441 \u043C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u0435 ui://.",
  "host.callback.title": "DSH \u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
  "host.callback.mismatch": "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438: state \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0435\u0442. \u0412\u0435\u0440\u043D\u0438\u0442\u0435\u0441\u044C \u0432 \xAB\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F\xBB \u0438 \u043D\u0430\u0447\u043D\u0438\u0442\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044E \u0437\u0430\u043D\u043E\u0432\u043E.",
  "host.callback.refused": "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u0430: {error}",
  "host.callback.noCode": "\u0432 \u043E\u0442\u0432\u0435\u0442\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u043D\u0435\u0442 code.",
  "host.callback.done": "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430, \u043E\u043A\u043D\u043E \u043C\u043E\u0436\u043D\u043E \u0437\u0430\u043A\u0440\u044B\u0442\u044C.",
  "host.callback.error": "\u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438: {message}",
  "host.callback.cimdHttps": "\u0414\u043B\u044F CIMD \u043D\u0443\u0436\u0435\u043D HTTPS-\u0430\u0434\u0440\u0435\u0441: \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u044D\u0442\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043F\u043E \u0434\u043E\u043C\u0435\u043D\u0443 https:// \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044E",
  "host.error.noUrl": "{transport}: \u0432 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438 \u043D\u0435\u0442 url",
  "host.error.noCommand": "\u0434\u043B\u044F stdio-\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043D\u0435 \u0437\u0430\u0434\u0430\u043D\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430",
  "host.error.emptyResult": "(\u043F\u0443\u0441\u0442\u043E\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442)",
  "host.error.disconnected": "\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0440\u0430\u0437\u043E\u0440\u0432\u0430\u043D\u043E",
  "host.error.toolError": "MCP-\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 \u0432\u0435\u0440\u043D\u0443\u043B \u043E\u0448\u0438\u0431\u043A\u0443",
  "host.error.badServers": 'servers.json \u0434\u043E\u043B\u0436\u0435\u043D \u0438\u043C\u0435\u0442\u044C \u0432\u0438\u0434 {"mcpServers": {...}}',
  "host.error.bodyTooLarge": "\u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0442\u0435\u043B\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430",
  "host.error.registerConflict": "\u041A\u043E\u043D\u0444\u043B\u0438\u043A\u0442 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432: {message}",
  "host.error.unknownConnection": "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435: {id}",
  "host.error.notEnabled": "\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E",
  "host.error.badRpc": "\u043D\u0435\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u044B\u0439 RPC: {method}",
  "host.error.unknownEndpoint": "\u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u044D\u043D\u0434\u043F\u043E\u0439\u043D\u0442",
  "host.error.unsupportedRequest": "\u043D\u0435\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441",
  "host.error.generic": "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043E\u0448\u0438\u0431\u043A\u0430: {message}"
};
var dictionaries = { zh, en, ru };
var FALLBACK_LOCALE = "en";
var NAMESPACE = "mcp-apps";
function normalizeLocale(tag) {
  const value = String(tag ?? "").trim().toLowerCase();
  if (value === "") return FALLBACK_LOCALE;
  const primary = value.split("-")[0];
  return Object.prototype.hasOwnProperty.call(dictionaries, primary) ? primary : FALLBACK_LOCALE;
}
function interpolate(template, params) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) => name in params ? String(params[name]) : match);
}
function translate(lang, key, params) {
  const chain = [normalizeLocale(lang)];
  if (chain[0] !== FALLBACK_LOCALE) chain.push(FALLBACK_LOCALE);
  const candidates = [];
  if (params && typeof params.count === "number") {
    const category = pluralCategory(chain[0], params.count);
    if (category !== "other") candidates.push(key + "." + category);
    candidates.push(key + ".other");
  }
  candidates.push(key);
  for (const candidate of candidates) {
    for (const candidateLang of chain) {
      const template = dictionaries[candidateLang][candidate];
      if (template !== void 0) return interpolate(template, params);
    }
  }
  return key;
}
function pluralCategory(lang, count) {
  try {
    return new Intl.PluralRules(lang).select(count);
  } catch {
    return "other";
  }
}

// src/i18n.js
var active = normalizeLocale(typeof navigator === "object" ? navigator.language : "en");
var revision = 0;
var listeners = /* @__PURE__ */ new Set();
function currentLanguage() {
  return active;
}
function setLanguage(tag) {
  const next = normalizeLocale(tag);
  if (next === active) return;
  active = next;
  revision += 1;
  for (const listener of [...listeners]) {
    try {
      listener();
    } catch (error) {
    }
  }
}
function tr(key, params) {
  return translate(active, key, params);
}
function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function useLocaleRevision() {
  return React.useSyncExternalStore(subscribe, () => revision, () => revision);
}

// src/client.js
var UI_PROTOCOL = "2026-01-26";
var API_BASE = "/api/mcp-apps";
var HANDSHAKE_TIMEOUT_MS = 6e3;
var WORKBENCH_ID = "dsh-plugin-mcp-apps";
var WORKBENCH_KIND = "mcp-app";
var PANEL_ID = "mcp-apps";
var PANEL_ORDER = 3;
var panelTitle = () => tr("panel.title");
function hostError(body, fallback) {
  const raw = body && body.error;
  if (raw && typeof raw === "object" && typeof raw.code === "string") return new Error(tr("host.error." + raw.code, raw.params));
  if (typeof raw === "string" && raw !== "") return new Error(raw);
  return new Error(fallback || tr("error.generic"));
}
async function api(path, init) {
  const options = init ? { ...init } : {};
  options.headers = { "content-type": "application/json", ...options.headers || {} };
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
function reportLocale() {
  void api("/locale", { method: "POST", body: JSON.stringify({ active: currentLanguage() }) }).catch(() => {
  });
}
function mcpRpc(connectionId, method, params) {
  return api("/rpc", {
    method: "POST",
    body: JSON.stringify({ connectionId, method, params: params || {} })
  }).then((body) => body.result);
}
function publicToolName(connectionId, raw) {
  const joined = "mcp__" + connectionId + "__" + raw;
  const normalized = joined.replace(/[^A-Za-z0-9_-]/g, "_");
  if (normalized === joined && normalized.length <= 64) return normalized;
  return normalized.slice(0, 64);
}
var toolMeta = /* @__PURE__ */ new Map();
var subscribers = /* @__PURE__ */ new Set();
var state = { connections: [], loading: true, error: "", loadedAt: 0 };
function notify() {
  for (const listener of subscribers) {
    try {
      listener();
    } catch (error) {
    }
  }
}
var refreshing = null;
function refreshState() {
  if (refreshing) return refreshing;
  refreshing = api("/state").then((body) => {
    state.connections = body.connections || [];
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
  }).catch((error) => {
    state.loading = false;
    state.error = error && error.message ? error.message : String(error);
    notify();
    return state;
  }).finally(() => {
    refreshing = null;
  });
  return refreshing;
}
function useStore() {
  const [, setTick] = React2.useState(0);
  React2.useEffect(() => {
    const listener = () => setTick((value) => value + 1);
    subscribers.add(listener);
    if (state.loadedAt === 0) refreshState();
    return () => subscribers.delete(listener);
  }, []);
  return state;
}
var h = React2.createElement;
var cardStyle = {
  border: "1px solid var(--dsh-border-subtle, rgba(127,127,127,.28))",
  borderRadius: "12px",
  padding: "14px",
  display: "grid",
  gap: "8px",
  background: "var(--dsh-surface-raised, transparent)"
};
var headerRow = { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" };
var titleStyle = { fontSize: "14px", fontWeight: 600 };
var subtitle = { fontSize: "12px", opacity: 0.7 };
var monoStyle = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "11px",
  padding: "1px 5px",
  borderRadius: "4px",
  background: "var(--dsh-surface-sunken, rgba(127,127,127,.14))",
  wordBreak: "break-all"
};
var inputStyle = {
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
var buttonStyle = {
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
var ghostButton = {
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
var dangerButton = { ...ghostButton, color: "var(--dsh-danger, #d0453f)" };
var labelStyle = { fontSize: "12px", opacity: 0.75, marginBottom: "2px", display: "block" };
var errorText = { fontSize: "12px", color: "var(--dsh-danger, #d0453f)", lineHeight: "18px", wordBreak: "break-word" };
var noteBox = {
  fontSize: "12px",
  lineHeight: "18px",
  padding: "8px 10px",
  borderRadius: "8px",
  background: "var(--dsh-surface-sunken, rgba(127,127,127,.08))",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word"
};
var STATUS_COLORS = { ready: "#2f9e5f", connecting: "#d8a01a", error: "#d0453f", needs_auth: "#d8a01a", disabled: "rgba(127,127,127,.55)" };
var STATUS_KEY = { ready: "card.status.ready", connecting: "card.status.connecting", error: "card.status.error", needs_auth: "card.status.needs_auth", disabled: "card.status.disabled" };
var statusText = (status) => STATUS_KEY[status] ? tr(STATUS_KEY[status]) : status;
function Field(props) {
  return h(
    "div",
    null,
    h("label", { style: labelStyle }, props.label),
    props.kind === "select" ? h(
      "select",
      { value: props.value, onChange: (event) => props.onChange(event.target.value), style: inputStyle },
      (props.options || []).map((option) => h("option", { key: option.value, value: option.value }, option.label))
    ) : h("input", {
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
function ConnectionEditor(props) {
  const connection = props.connection;
  const isNew = !connection;
  const [draft, setDraft] = React2.useState(
    () => isNew ? { name: "", transport: "http", url: "", command: "", argsText: "", envText: "", cwd: "", note: "", enabled: false, authMode: "none", scopes: "", clientMode: "auto", clientId: "", clientSecret: "", params: [] } : {
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
      authMode: connection.auth && connection.auth.mode || "none",
      scopes: connection.auth && connection.auth.scopes || "",
      clientMode: connection.auth && connection.auth.clientMode || "auto",
      clientId: connection.auth && connection.auth.clientId || "",
      clientSecret: "",
      params: (connection.auth && connection.auth.params || []).map((param) => ({ in: param.in, name: param.name, value: "" }))
    }
  );
  const [busy, setBusy] = React2.useState("");
  const [error, setError] = React2.useState("");
  const [testResult, setTestResult] = React2.useState(null);
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
        draft.envText.split("\n").map((line) => line.trim()).filter((line) => line !== "" && line.indexOf("=") > 0).map((line) => [line.slice(0, line.indexOf("=")), line.slice(line.indexOf("=") + 1)])
      ),
      cwd: draft.cwd.trim(),
      auth: {
        mode: draft.authMode,
        scopes: draft.authMode === "oauth" ? draft.scopes.trim() : "",
        clientMode: draft.authMode === "oauth" ? draft.clientMode : "auto",
        clientId: draft.authMode === "oauth" ? draft.clientId.trim() : "",
        clientSecret: draft.authMode === "oauth" ? draft.clientSecret : void 0,
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
    } catch (error2) {
      setError(error2.message || String(error2));
    } finally {
      setBusy("");
    }
  };
  const test = async () => {
    setBusy("test");
    setError("");
    setTestResult(null);
    try {
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
    } catch (error2) {
      setError(error2.message || String(error2));
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
    draft.transport === "stdio" ? h(
      "div",
      { style: { display: "grid", gap: "8px" } },
      h(Field, { label: tr("editor.command"), value: draft.command, placeholder: "npx", onChange: (value) => set({ command: value }) }),
      h(Field, { label: tr("editor.args"), value: draft.argsText, placeholder: "-y\n@modelcontextprotocol/server-everything", onChange: (value) => set({ argsText: value }) }),
      h(Field, { label: tr("editor.env"), value: draft.envText, placeholder: "API_KEY=xxx", onChange: (value) => set({ envText: value }) }),
      h(Field, { label: tr("editor.cwd"), value: draft.cwd, placeholder: "/opt/mcp", onChange: (value) => set({ cwd: value }) })
    ) : h(Field, { label: tr("editor.url"), value: draft.url, placeholder: "https://mcp.example.com/mcp", onChange: (value) => set({ url: value }) }),
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
    draft.authMode === "api" ? h(
      "div",
      { style: { display: "grid", gap: "6px" } },
      draft.params.length === 0 ? h("div", { style: subtitle }, tr("editor.params.empty")) : null,
      draft.params.map(
        (param, index) => h(
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
    ) : null,
    draft.authMode === "oauth" ? h(
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
      draft.clientMode === "cimd" ? h("div", { style: subtitle }, tr("editor.cimd.hint", { url: window.location.origin + "/api/mcp-apps/oauth/client-metadata.json" })) : null,
      draft.clientMode === "manual" ? h(Field, { label: tr("editor.clientId"), value: draft.clientId, placeholder: tr("editor.clientId.ph"), onChange: (value) => set({ clientId: value }) }) : null,
      draft.clientMode === "manual" ? h(Field, { label: tr("editor.clientSecret"), value: draft.clientSecret, type: "password", placeholder: tr("editor.clientSecret.ph"), onChange: (value) => set({ clientSecret: value }) }) : null,
      h(
        "div",
        { style: subtitle },
        tr("editor.oauth.hint")
      )
    ) : null,
    h(Field, { label: tr("editor.note"), value: draft.note, onChange: (value) => set({ note: value }) }),
    h(
      "label",
      { style: { display: "flex", gap: "8px", alignItems: "center", fontSize: "12px" } },
      h("input", { type: "checkbox", checked: draft.enabled, onChange: (event) => set({ enabled: event.target.checked }) }),
      tr("editor.enableNow")
    ),
    error ? h("div", { style: errorText }, error) : null,
    testResult ? testResult.ok ? h(
      "div",
      { style: noteBox },
      tr("editor.test.ok", { count: (testResult.tools || []).length }),
      h(
        "div",
        { style: { marginTop: "4px", display: "grid", gap: "2px" } },
        (testResult.tools || []).slice(0, 40).map(
          (tool) => h("div", { key: tool.name }, h("code", { style: monoStyle }, tool.name), tool.resourceUri ? h("span", { style: subtitle }, "  ui://") : null)
        )
      )
    ) : h("div", { style: errorText }, tr("editor.test.error", { message: testResult.error })) : null,
    h(
      "div",
      { style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
      h("button", { type: "button", style: buttonStyle, disabled: busy !== "", onClick: save }, busy === "save" ? tr("common.saving") : isNew ? tr("editor.save") : tr("common.save")),
      h("button", { type: "button", style: ghostButton, disabled: busy !== "", onClick: test }, busy === "test" ? tr("common.testing") : tr("editor.test")),
      h("button", { type: "button", style: ghostButton, onClick: props.onDone }, tr("common.cancel"))
    )
  );
}
function ConnectionCard(props) {
  const connection = props.connection;
  const [busy, setBusy] = React2.useState("");
  const [error, setError] = React2.useState("");
  const run = async (label, action) => {
    setBusy(label);
    setError("");
    try {
      await action();
      await refreshState();
    } catch (error2) {
      setError(error2.message || String(error2));
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
      for (let attempt = 0; attempt < 90; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        await refreshState();
        const current = state.connections.find((candidate) => candidate.id === connection.id);
        if (current && current.auth && current.auth.oauth && current.auth.oauth.authorized) return;
        if (popup.closed && attempt > 2) return;
      }
    } catch (error2) {
      setError(error2.message || String(error2));
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
      connection.auth && connection.auth.mode === "api" ? h("span", null, tr("card.auth.params", { count: (connection.auth.params || []).filter((param) => param.hasValue).length })) : connection.auth && connection.auth.mode === "oauth" ? h("span", null, "OAuth 2.0" + (connection.auth.clientMode === "cimd" ? " \xB7 " + tr("card.auth.cimd") : connection.auth.clientMode === "manual" ? " \xB7 " + tr("card.auth.manual") : "") + " \xB7 " + (connection.auth.oauth && connection.auth.oauth.authorized ? tr("card.auth.authorized") : tr("card.auth.unauthorized")) + (connection.auth.scopes ? " \xB7 " + connection.auth.scopes : "")) : h("span", null, tr("editor.auth.none"))
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
        onClick: () => run(
          "toggle",
          () => api("/connections/" + encodeURIComponent(connection.id) + "/enabled", {
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
      oauthMode ? h("button", { type: "button", style: authorized ? ghostButton : buttonStyle, disabled: busy !== "", onClick: authorize }, busy === "auth" ? tr("card.auth.waiting") : authorized ? tr("card.auth.reauthorize") : tr("card.auth.login")) : null,
      oauthMode && authorized ? h("button", {
        type: "button",
        style: ghostButton,
        disabled: busy !== "",
        onClick: () => run("oauth-reset", () => api("/connections/" + encodeURIComponent(connection.id) + "/oauth-reset", { method: "POST", body: "{}" }))
      }, tr("card.auth.reset")) : null,
      h("button", {
        type: "button",
        style: dangerButton,
        disabled: busy !== "",
        onClick: () => run("delete", () => api("/connections/" + encodeURIComponent(connection.id), { method: "DELETE" }))
      }, tr("common.delete"))
    )
  );
}
function ConnectAppsPage() {
  useLocaleRevision();
  const view = useStore();
  const [editing, setEditing] = React2.useState(null);
  const [creating, setCreating] = React2.useState(false);
  const [importing, setImporting] = React2.useState(false);
  const [importText, setImportText] = React2.useState("");
  const [importError, setImportError] = React2.useState("");
  const [busy, setBusy] = React2.useState(false);
  React2.useEffect(() => {
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
      h("div", { style: { ...subtitle, marginTop: "4px", lineHeight: "18px" } }, tr("panel.intro"))
    ),
    h(
      "div",
      { style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
      h("button", { type: "button", style: buttonStyle, onClick: () => {
        setCreating(true);
        setEditing(null);
        setImporting(false);
      } }, tr("panel.add")),
      h("button", { type: "button", style: ghostButton, onClick: () => {
        setImporting(true);
        setCreating(false);
        setEditing(null);
      } }, tr("panel.import")),
      h("button", { type: "button", style: ghostButton, onClick: () => void refreshState() }, tr("panel.refresh")),
      view.error ? h("span", { style: errorText }, view.error) : null
    ),
    importing ? h(
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
    ) : null,
    creating ? h(ConnectionEditor, { onDone: () => setCreating(false) }) : null,
    editing ? h(ConnectionEditor, { connection: editing, onDone: () => setEditing(null) }) : null,
    view.loading ? h("div", { style: subtitle }, tr("panel.loading")) : view.connections.length === 0 ? h("div", { style: noteBox }, tr("panel.empty")) : view.connections.map(
      (connection) => h(ConnectionCard, { key: connection.id, connection, onEdit: (target) => {
        setEditing(target);
        setCreating(false);
        setImporting(false);
      } })
    )
  );
}
function snapshotToolFor(connectionId, currentRaw) {
  const connection = state.connections.find((candidate) => candidate.id === connectionId);
  const tools = connection && connection.tools || [];
  const readLike = /(^|_)(overview|summary|status|list|get)(_|$)/i;
  const pick = tools.find((tool) => readLike.test(tool.name) && tool.name !== currentRaw) || tools.find((tool) => readLike.test(tool.name));
  if (!pick) return null;
  return { name: pick.name, arguments: {} };
}
function AppCard(props) {
  const toolName = props.toolName || "";
  const minHeight = props.minHeight || 420;
  const meta = toolMeta.get(toolName);
  const connectionId = meta ? meta.connectionId : props.connectionId || "";
  const [html, setHtml] = React2.useState(null);
  const [status, setStatus] = React2.useState("idle");
  const [error, setError] = React2.useState("");
  const [height, setHeight] = React2.useState(minHeight);
  const [attempt, setAttempt] = React2.useState(0);
  const frameRef = React2.useRef(null);
  const handshakeRef = React2.useRef(false);
  const handshakeTimer = React2.useRef(null);
  React2.useEffect(() => {
    if (!meta || !meta.resourceUri || !connectionId) return void 0;
    let cancelled = false;
    setStatus("loading");
    setError("");
    setHtml(null);
    handshakeRef.current = false;
    mcpRpc(connectionId, "resources/read", { uri: meta.resourceUri }).then((result) => {
      const contents = result && result.contents || [];
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
    }).catch((error2) => {
      if (cancelled) return;
      setStatus("error");
      setError(error2 && error2.message ? error2.message : String(error2));
    });
    return () => {
      cancelled = true;
      if (handshakeTimer.current) {
        clearTimeout(handshakeTimer.current);
        handshakeTimer.current = null;
      }
    };
  }, [connectionId, meta && meta.resourceUri, attempt]);
  React2.useEffect(() => {
    const post = (message) => {
      const frame = frameRef.current;
      if (!frame || !frame.contentWindow) return;
      try {
        frame.contentWindow.postMessage(message, "*");
      } catch (error2) {
      }
    };
    const onMessage = (event) => {
      const frame = frameRef.current;
      if (!frame || event.source !== frame.contentWindow) return;
      const data = event.data;
      if (!data || data.jsonrpc !== "2.0") return;
      if (typeof data.method === "string" && data.id !== void 0 && data.id !== null) {
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
          if (data.id !== void 0 && data.id !== null) post({ jsonrpc: "2.0", id: data.id, result: {} });
          return;
        }
        if (!connectionId) {
          post({ jsonrpc: "2.0", id: data.id, error: { code: -32e3, message: tr("error.notReady") } });
          return;
        }
        mcpRpc(connectionId, data.method, data.params).then((result) => post({ jsonrpc: "2.0", id: data.id, result })).catch((error2) => post({ jsonrpc: "2.0", id: data.id, error: { code: -32e3, message: error2 && error2.message ? error2.message : String(error2) } }));
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
        mcpRpc(connectionId, "tools/call", { name: snapshot.name, arguments: snapshot.arguments }).then((result) => post({ jsonrpc: "2.0", method: "ui/notifications/tool-result", params: result })).catch((error2) => setError(error2 && error2.message ? error2.message : String(error2)));
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
    html ? h("iframe", {
      ref: frameRef,
      title: "MCP App: " + toolName,
      sandbox: "allow-scripts allow-forms",
      srcDoc: html,
      style: { display: "block", width: "100%", border: "0", background: "transparent", height: height + "px" }
    }) : null
  );
}
function WorkbenchRow(props) {
  useLocaleRevision();
  const phase = props.phase;
  const toolName = props.toolName || props.block && props.block.name || "";
  const callId = props.callId;
  const live = startedCalls.has(callId);
  const seen = openState.get(callId);
  const [view, setView] = React2.useState(seen || "idle");
  const [message, setMessage] = React2.useState("");
  const meta = toolMeta.get(toolName);
  const attempt = React2.useCallback(() => {
    const result = openWorkbench(toolName, callId);
    setView(result.ok ? "opened" : "failed");
    setMessage(result.ok ? "" : result.message || "");
  }, [toolName, callId]);
  React2.useEffect(() => {
    if (phase === "result") return;
    startedCalls.add(callId);
  }, [phase, callId]);
  React2.useEffect(() => {
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
function WorkbenchBody(props) {
  useLocaleRevision();
  const useTabInfo = props.useTabInfo;
  const info = typeof useTabInfo === "function" ? useTabInfo() : null;
  const tab = info && info.tab;
  const navigation = tab && tab.navigation || {};
  const params = navigation.params || {};
  const revision2 = typeof navigation.revision === "number" ? navigation.revision : 0;
  const toolName = typeof params.toolName === "string" ? params.toolName : "";
  const meta = toolMeta.get(toolName);
  return h(
    "div",
    { style: { height: "100%", overflow: "auto", padding: "8px" } },
    h("div", { style: { ...subtitle, padding: "0 4px 8px" } }, meta ? meta.connectionName + " \xB7 " + meta.rawName : tr("tool.unknown")),
    h(AppCard, { key: revision2, toolName, minHeight: 560 })
  );
}
function resultText(block) {
  const content = block && block.content;
  if (!Array.isArray(content)) return "";
  const parts = [];
  for (const item of content) {
    if (item && item.type === "text" && typeof item.text === "string") parts.push(item.text);
  }
  return parts.join("\n").trim();
}
var shell = null;
var rightScope = null;
var startedCalls = /* @__PURE__ */ new Set();
var openState = /* @__PURE__ */ new Map();
var claims = /* @__PURE__ */ new Map();
function openWorkbench(toolName, callId) {
  try {
    const right = rightScope && rightScope.sidebarRight || shell && shell.sidebarRight;
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
function syncClaims() {
  if (!shell) return;
  const wanted = /* @__PURE__ */ new Set();
  for (const [publicName, meta] of toolMeta) if (meta.resourceUri) wanted.add(publicName);
  for (const [publicName, dispose] of claims) {
    if (wanted.has(publicName)) continue;
    try {
      dispose();
    } catch (error) {
    }
    claims.delete(publicName);
  }
  for (const publicName of wanted) {
    if (claims.has(publicName)) continue;
    try {
      claims.set(publicName, shell.slots.register({ name: "tool.call.toolview", key: publicName }, WorkbenchRow));
    } catch (error) {
    }
  }
}
var inject = ["slots"];
function apply(ctx) {
  shell = ctx;
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
  ctx.slots.inject(
    "sidebar.panellist",
    () => ctx.slots.register(
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
      () => scope.sidebarRightTabs.register({
        id: WORKBENCH_ID,
        kind: WORKBENCH_KIND,
        multiple: false,
        priority: "extension",
        title: () => tr("workbench.title")
      }),
      "mcp-apps.workbench-type"
    );
    scope.slots.inject(
      "sidebar.right.pane.tab",
      () => scope.slots.register({ name: "sidebar.right.pane.tab", key: WORKBENCH_ID }, WorkbenchBody)
    );
  });
  ctx.effect(() => {
    void refreshState();
    const timer = setInterval(() => {
      void refreshState();
    }, 15e3);
    return () => clearInterval(timer);
  }, "mcp-apps: state poller");
}

		return module.exports;
	}
});
