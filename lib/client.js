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
var React3 = __toESM(require("react"), 1);

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
  "common.noName": "\u672A\u547D\u540D",
  // left-sidebar page
  "panel.title": "\u8FDE\u63A5\u5E94\u7528",
  "panel.intro": "\u63A5\u5165\u4EFB\u610F MCP \u670D\u52A1\u5668\uFF08HTTP / SSE / stdio\uFF09\u3002\u5173\u95ED\u7684\u8FDE\u63A5\u4E0D\u4F1A\u628A\u5DE5\u5177\u4EA4\u7ED9\u6A21\u578B\uFF1B\u5E26 ui:// \u8D44\u6E90\u7684\u5DE5\u5177\u4F1A\u5728\u53F3\u4FA7\u5DE5\u4F5C\u53F0\u6E32\u67D3 MCP Apps\u3002",
  "panel.add": "\u6DFB\u52A0 MCP \u670D\u52A1\u5668",
  "panel.import.action": "\u5BFC\u5165",
  "panel.import.busy": "\u5BFC\u5165\u4E2D\u2026",
  "panel.import.title": "\u7C98\u8D34 Claude Code \u7684 mcpServers \u914D\u7F6E",
  "panel.refresh": "\u5237\u65B0",
  "panel.loading": "\u8BFB\u53D6\u8FDE\u63A5\u5217\u8868\u2026",
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
  "editor.save": "\u6DFB\u52A0\u5E76\u4FDD\u5B58",
  "editor.test": "\u6D4B\u8BD5\u8FDE\u63A5",
  "editor.test.error": "\u8FDE\u63A5\u5931\u8D25\uFF1A{message}",
  // connection card
  "card.status.ready": "\u5DF2\u8FDE\u63A5",
  "card.status.connecting": "\u8FDE\u63A5\u4E2D",
  "card.status.reconnecting": "\u6B63\u5728\u91CD\u8FDE",
  "card.status.error": "\u8FDE\u63A5\u5931\u8D25",
  "card.status.needs_auth": "\u9700\u8981\u6388\u6743",
  "card.status.disabled": "\u5DF2\u5173\u95ED",
  "card.tools.other": "{count} \u4E2A\u5DE5\u5177",
  "card.refresh": "\u91CD\u65B0\u8FDE\u63A5",
  "card.listedAt": "\u66F4\u65B0\u4E8E {time}",
  // tool catalog card
  "tools.title": "\u5DE5\u5177",
  "tools.search": "\u641C\u7D22\u5DE5\u5177",
  "tools.search.clear": "\u6E05\u9664\u641C\u7D22",
  "tools.search.empty": "\u6CA1\u6709\u627E\u5230\u5DE5\u5177",
  "tools.group.read": "\u53EA\u8BFB\u5DE5\u5177",
  "tools.group.write": "\u5199\u5165\u548C\u5220\u9664\u5DE5\u5177",
  "tools.group.unknown": "\u672A\u786E\u5B9A",
  "tools.destructive": "\u4F1A\u5220\u9664\u6570\u636E",
  "tools.source.annotation": "\u5206\u7EC4\u4F9D\u636E\u670D\u52A1\u5668\u63D0\u4F9B\u7684\u6CE8\u89E3\u3002",
  "tools.source.heuristic": "\u670D\u52A1\u5668\u6CA1\u6709\u63D0\u4F9B\u6CE8\u89E3\uFF0C\u5DE5\u5177\u6309\u540D\u79F0\u5206\u7EC4\u3002",
  "tools.source.mixed": "\u90E8\u5206\u5DE5\u5177\u6CA1\u6709\u6CE8\u89E3\uFF0C\u5DF2\u6309\u540D\u79F0\u5206\u7EC4\u3002",
  "tools.neverListed": "\u670D\u52A1\u5668\u8FD8\u6CA1\u6709\u8FD4\u56DE\u5DE5\u5177\u5217\u8868\u3002",
  "tools.disabled": "\u8FDE\u63A5\u5DF2\u5173\u95ED\uFF0C\u663E\u793A\u4E0A\u6B21\u8FDE\u63A5\u65F6\u7684\u5217\u8868\u3002",
  "tools.disabled.empty": "\u6253\u5F00\u8FDE\u63A5\u540E\u5373\u53EF\u53D6\u5F97\u5DE5\u5177\u5217\u8868\u3002",
  "tools.connecting": "\u6B63\u5728\u7B49\u5F85\u670D\u52A1\u5668\u2026",
  "tools.reconnecting": "\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5\u2026",
  "tools.error.empty": "\u5217\u8868\u4E0D\u53EF\u7528\uFF1A\u8FDE\u63A5\u51FA\u9519\u3002",
  "tools.auth": "\u9700\u8981\u6388\u6743\u624D\u80FD\u53D6\u5F97\u5DE5\u5177\u5217\u8868\u3002",
  "tools.none": "\u670D\u52A1\u5668\u6CA1\u6709\u58F0\u660E\u4EFB\u4F55\u5DE5\u5177\u3002",
  "tools.truncated": "\u670D\u52A1\u5668\u8FD4\u56DE\u7684\u5DE5\u5177\u591A\u4E8E {max} \u4E2A\uFF0C\u8FD9\u91CC\u663E\u793A\u524D {max} \u4E2A\u3002",
  "tools.showAll": "\u663E\u793A\u5168\u90E8",
  "tools.copyName": "\u590D\u5236\u7ED9\u6A21\u578B\u4F7F\u7528\u7684\u540D\u79F0",
  "card.noUrl": "\uFF08\u672A\u586B\u5199\u5730\u5740\uFF09",
  "card.auth.cimd": "CIMD",
  "card.auth.manual": "\u624B\u586B client",
  "card.auth.authorized": "\u5DF2\u6388\u6743",
  "card.auth.unauthorized": "\u672A\u6388\u6743",
  "card.auth.startFail": "\u53D1\u8D77\u6388\u6743\u5931\u8D25",
  "card.auth.blocked": "\u6D4F\u89C8\u5668\u62E6\u4F4F\u4E86\u6388\u6743\u7A97\u53E3\uFF0C\u8BF7\u5141\u8BB8\u5F39\u7A97\u540E\u91CD\u8BD5\uFF0C\u6216\u624B\u52A8\u6253\u5F00\uFF1A{url}",
  "card.auth.waiting": "\u7B49\u5F85\u6388\u6743\u2026",
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
  "host.error.generic": "\u5185\u90E8\u9519\u8BEF\uFF1A{message}",
  // panel chrome added with the Native restyle
  "panel.import.short": "\u5BFC\u5165",
  "panel.import.hint": "\u7C98\u8D34\u5B8C\u6574\u7684 mcpServers \u914D\u7F6E\uFF0C\u670D\u52A1\u5668\u4F1A\u8FDE\u540C\u5730\u5740\u4E0E\u8BF7\u6C42\u5934\u4E00\u8D77\u6DFB\u52A0\u3002",
  "panel.stats.connections.other": "{count} \u4E2A\u8FDE\u63A5",
  "panel.stats.errors": "{count} \u4E2A\u9519\u8BEF",
  "panel.store.label": "\u8FDE\u63A5\u5B58\u50A8",
  "panel.empty.title": "\u8FD8\u6CA1\u6709\u8FDE\u63A5",
  "panel.empty.text": "\u624B\u52A8\u6DFB\u52A0 MCP \u670D\u52A1\u5668\uFF0C\u6216\u7C98\u8D34 Claude Code \u7684 servers.json\uFF1B\u9762\u677F\u4E0E\u4EE3\u7406\u4F1A\u7ACB\u5373\u8BFB\u53D6\u3002",
  "card.copy": "\u590D\u5236",
  "card.refreshed": "\u5DE5\u5177\u5217\u8868\u5DF2\u66F4\u65B0",
  "card.copied": "\u5DF2\u590D\u5236",
  "card.copyPath": "\u590D\u5236\u8DEF\u5F84",
  "card.menu.more": "\u66F4\u591A\u64CD\u4F5C",
  "card.enableTools": "\u5411\u6A21\u578B\u63D0\u4F9B\u5DE5\u5177",
  "editor.section.main": "\u8FDE\u63A5",
  "editor.section.auth": "\u6388\u6743",
  "editor.auth.mode": "\u6388\u6743\u65B9\u5F0F",
  "editor.section.options": "\u9009\u9879",
  "editor.enable": "\u7ACB\u5373\u542F\u7528",
  "editor.enableHint": "\u5173\u95ED\u7684\u8FDE\u63A5\u4E0D\u4F1A\u628A\u5DE5\u5177\u4EA4\u7ED9\u6A21\u578B\u3002",
  "editor.hint.test": "\u300C\u6D4B\u8BD5\u300D\u4F1A\u4FDD\u5B58\u5F53\u524D\u5185\u5BB9\u5E76\u5C1D\u8BD5\u8FDE\u63A5\u3002",
  "editor.error.url": "\u8BF7\u586B\u5199\u670D\u52A1\u5668\u5730\u5740\u3002",
  "editor.error.command": "\u8BF7\u586B\u5199\u542F\u52A8\u547D\u4EE4\u3002",
  "common.close": "\u5173\u95ED",
  "panel.stats.working.other": "{count} \u4E2A\u6B63\u5E38",
  "card.delete.confirm": "\u5220\u9664\u300C{name}\u300D\uFF1F\u5DF2\u4FDD\u5B58\u7684\u4EE4\u724C\u4E0E\u53C2\u6570\u5C06\u4E00\u5E76\u5220\u9664\u3002",
  "panel.import.json": "mcpServers \u914D\u7F6E JSON",
  "editor.params.in": "\u53C2\u6570\u4F4D\u7F6E",
  "card.auth.params.other": "{count} \u4E2A\u9274\u6743\u53C2\u6570",
  "card.status.refreshing": "\u5237\u65B0\u5DE5\u5177\u5217\u8868",
  "card.auth.reauthorize": "\u91CD\u65B0\u767B\u5F55",
  "card.auth.noParams": "\u672A\u8BBE\u7F6E API \u53C2\u6570",
  "editor.test.ok": "\u8FDE\u63A5\u6210\u529F\uFF0C\u5DE5\u5177\uFF1A{count}"
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
  "common.noName": "Untitled",
  "panel.title": "Connections",
  "panel.intro": "Connect any MCP server (HTTP / SSE / stdio). A disabled connection exposes no tools to the model; tools that declare a ui:// resource render as MCP Apps in the workbench on the right.",
  "panel.add": "Add MCP server",
  "panel.import.action": "Import",
  "panel.import.busy": "Importing\u2026",
  "panel.import.title": "Paste the mcpServers block from Claude Code",
  "panel.refresh": "Refresh",
  "panel.loading": "Reading the connection list\u2026",
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
  "editor.save": "Add and save",
  "editor.test": "Test connection",
  "editor.test.error": "Connection failed: {message}",
  "card.status.ready": "Connected",
  "card.status.connecting": "Connecting",
  "card.status.reconnecting": "Reconnecting",
  "card.status.error": "Connection failed",
  "card.status.needs_auth": "Authorization required",
  "card.status.disabled": "Disabled",
  "card.tools.one": "{count} tool",
  "card.tools.other": "{count} tools",
  "card.refresh": "Reconnect",
  "card.listedAt": "updated {time}",
  // tool catalog card
  "tools.title": "Tools",
  "tools.search": "Search tools",
  "tools.search.clear": "Clear search",
  "tools.search.empty": "No tools found",
  "tools.group.read": "Read-only tools",
  "tools.group.write": "Write/delete tools",
  "tools.group.unknown": "Not determined",
  "tools.destructive": "May delete data",
  "tools.source.annotation": "Grouped by the server's annotations.",
  "tools.source.heuristic": "The server sent no annotations; tools are grouped by name.",
  "tools.source.mixed": "Some tools have no annotations and are grouped by name.",
  "tools.neverListed": "The server has not returned its tool list yet.",
  "tools.disabled": "The connection is off; this is the list from its last session.",
  "tools.disabled.empty": "Turn the connection on to load its tools.",
  "tools.connecting": "Waiting for the server\u2026",
  "tools.reconnecting": "Reconnecting\u2026",
  "tools.error.empty": "No list available: the connection failed.",
  "tools.auth": "Sign in to load the tool list.",
  "tools.none": "The server declares no tools.",
  "tools.truncated": "The server returned more than {max} tools; the first {max} are shown.",
  "tools.showAll": "Show all",
  "tools.copyName": "Copy the name the model sees",
  "card.noUrl": "(URL not filled in)",
  "card.auth.cimd": "CIMD",
  "card.auth.manual": "client entered by hand",
  "card.auth.authorized": "Authorized",
  "card.auth.unauthorized": "Not authorized",
  "card.auth.startFail": "Could not start authorization",
  "card.auth.blocked": "The browser blocked the authorization window. Allow pop-ups and retry, or open it manually: {url}",
  "card.auth.waiting": "Waiting for authorization\u2026",
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
  "host.error.generic": "Internal error: {message}",
  // panel chrome added with the Native restyle
  "panel.import.short": "Import",
  "panel.import.hint": "Paste the whole mcpServers block; its servers are added with their URLs and headers.",
  "panel.stats.connections.one": "{count} connection",
  "panel.stats.connections.other": "{count} connections",
  "panel.stats.errors": "{count} failed",
  "panel.store.label": "Connection store",
  "panel.empty.title": "No connections yet",
  "panel.empty.text": "Add an MCP server by hand or paste a servers.json block from Claude Code; the panel and the agent pick it up immediately.",
  "card.copy": "Copy",
  "card.refreshed": "Tool list updated",
  "card.copied": "Copied",
  "card.copyPath": "Copy path",
  "card.menu.more": "More actions",
  "card.enableTools": "Expose tools to the model",
  "editor.section.main": "Connection",
  "editor.section.auth": "Authorization",
  "editor.auth.mode": "Authorization type",
  "editor.section.options": "Options",
  "editor.enable": "Enable now",
  "editor.enableHint": "A disabled connection exposes no tools to the model.",
  "editor.hint.test": "\u201CTest\u201D saves the entered values and tries to connect.",
  "editor.error.url": "Enter the server URL.",
  "editor.error.command": "Enter the command to run.",
  "common.close": "Close",
  "panel.stats.working.one": "{count} working",
  "panel.stats.working.other": "{count} working",
  "card.delete.confirm": "Delete \u201C{name}\u201D? Saved tokens and parameters are removed with it.",
  "panel.import.json": "mcpServers JSON",
  "editor.params.in": "Where to send the parameter",
  "card.auth.params.one": "{count} authorization parameter",
  "card.auth.params.other": "{count} authorization parameters",
  "card.status.refreshing": "Refreshing tools",
  "card.auth.reauthorize": "Sign in again",
  "card.auth.noParams": "No API parameters set",
  "editor.test.ok": "Connected, tools: {count}"
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
  "common.noName": "\u0411\u0435\u0437 \u0438\u043C\u0435\u043D\u0438",
  "panel.title": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
  "panel.intro": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043B\u044E\u0431\u043E\u0433\u043E MCP-\u0441\u0435\u0440\u0432\u0435\u0440\u0430 (HTTP / SSE / stdio). \u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u043E\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043E\u0442\u0434\u0430\u0451\u0442 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u043C\u043E\u0434\u0435\u043B\u0438; \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0441 \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u043C ui:// \u0440\u0435\u043D\u0434\u0435\u0440\u044F\u0442\u0441\u044F \u043A\u0430\u043A MCP Apps \u0432 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0441\u043F\u0440\u0430\u0432\u0430.",
  "panel.add": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C MCP-\u0441\u0435\u0440\u0432\u0435\u0440",
  "panel.import.action": "\u0418\u043C\u043F\u043E\u0440\u0442",
  "panel.import.busy": "\u0418\u043C\u043F\u043E\u0440\u0442\u2026",
  "panel.import.title": "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044E mcpServers \u0438\u0437 Claude Code",
  "panel.refresh": "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C",
  "panel.loading": "\u0427\u0442\u0435\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439\u2026",
  "editor.title.new": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C MCP-\u0441\u0435\u0440\u0432\u0435\u0440",
  "editor.title.edit": "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C: {name}",
  "editor.name": "\u0418\u043C\u044F (\u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u043D\u0430 \u044D\u0442\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u0435)",
  "editor.name.ph": "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 notion",
  "editor.transport": "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442",
  "editor.transport.stdio": "stdio (\u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441)",
  "editor.command": "\u041A\u043E\u043C\u0430\u043D\u0434\u0430",
  "editor.args": "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B (\u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u0432 \u0441\u0442\u0440\u043E\u043A\u0435)",
  "editor.env": "\u041F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F (\u043F\u043E \u043E\u0434\u043D\u043E\u0439 KEY=VALUE \u0432 \u0441\u0442\u0440\u043E\u043A\u0435)",
  "editor.cwd": "\u0420\u0430\u0431\u043E\u0447\u0438\u0439 \u043A\u0430\u0442\u0430\u043B\u043E\u0433 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",
  "editor.url": "\u0410\u0434\u0440\u0435\u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
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
  "editor.save": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  "editor.test": "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
  "editor.test.error": "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F: {message}",
  "card.status.ready": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E",
  "card.status.connecting": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
  "card.status.reconnecting": "\u041F\u0435\u0440\u0435\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
  "card.status.error": "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
  "card.status.needs_auth": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
  "card.status.disabled": "\u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E",
  "card.tools.one": "{count} \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442",
  "card.tools.few": "{count} \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430",
  "card.tools.many": "{count} \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432",
  "card.tools.other": "{count} \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430",
  "card.refresh": "\u041F\u0435\u0440\u0435\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C",
  "card.listedAt": "\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E {time}",
  // tool catalog card
  "tools.title": "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B",
  "tools.search": "\u041D\u0430\u0439\u0442\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442",
  "tools.search.clear": "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A",
  "tools.search.empty": "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
  "tools.group.read": "\u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u0435\u043D\u0438\u0435",
  "tools.group.write": "\u0417\u0430\u043F\u0438\u0441\u044C \u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435",
  "tools.group.unknown": "\u041D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043E",
  "tools.destructive": "\u041C\u043E\u0436\u0435\u0442 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435",
  "tools.source.annotation": "\u0420\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043F\u043E \u0430\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u044F\u043C \u0441\u0435\u0440\u0432\u0435\u0440\u0430.",
  "tools.source.heuristic": "\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0435 \u043F\u0440\u0438\u0441\u043B\u0430\u043B \u0430\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u0439 \u2014 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u044B \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E.",
  "tools.source.mixed": "\u0423 \u0447\u0430\u0441\u0442\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0435\u0442 \u0430\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u0439 \u2014 \u043E\u043D\u0438 \u043E\u0442\u043D\u0435\u0441\u0435\u043D\u044B \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E.",
  "tools.neverListed": "\u0421\u0435\u0440\u0432\u0435\u0440 \u0435\u0449\u0451 \u043D\u0435 \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u043B \u0441\u043F\u0438\u0441\u043E\u043A \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432.",
  "tools.disabled": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E. \u041F\u043E\u043A\u0430\u0437\u0430\u043D \u0441\u043F\u0438\u0441\u043E\u043A, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u044B\u0439 \u043F\u0440\u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u043C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438.",
  "tools.disabled.empty": "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432.",
  "tools.connecting": "\u0416\u0434\u0451\u043C \u043E\u0442\u0432\u0435\u0442\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u2026",
  "tools.reconnecting": "\u041F\u0435\u0440\u0435\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435\u2026",
  "tools.error.empty": "\u0421\u043F\u0438\u0441\u043A\u0430 \u043D\u0435\u0442: \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0441 \u043E\u0448\u0438\u0431\u043A\u043E\u0439.",
  "tools.auth": "\u041D\u0443\u0436\u043D\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432.",
  "tools.none": "\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0435 \u043E\u0431\u044A\u044F\u0432\u0438\u043B \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430.",
  "tools.truncated": "\u0421\u0435\u0440\u0432\u0435\u0440 \u0432\u0435\u0440\u043D\u0443\u043B \u0431\u043E\u043B\u044C\u0448\u0435 {max} \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u2014 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u043F\u0435\u0440\u0432\u044B\u0435 {max}.",
  "tools.showAll": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435",
  "tools.copyName": "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438\u043C\u044F \u0434\u043B\u044F \u043C\u043E\u0434\u0435\u043B\u0438",
  "card.noUrl": "(\u0430\u0434\u0440\u0435\u0441 \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D)",
  "card.auth.cimd": "CIMD",
  "card.auth.manual": "client \u0432\u0440\u0443\u0447\u043D\u0443\u044E",
  "card.auth.authorized": "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043E",
  "card.auth.unauthorized": "\u041D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043E",
  "card.auth.startFail": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0447\u0430\u0442\u044C \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044E",
  "card.auth.blocked": "\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043B \u043E\u043A\u043D\u043E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438. \u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0438\u0435 \u043E\u043A\u043D\u0430 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u2014 \u043B\u0438\u0431\u043E \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0432\u0440\u0443\u0447\u043D\u0443\u044E: {url}",
  "card.auth.waiting": "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438\u2026",
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
  "host.error.generic": "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043E\u0448\u0438\u0431\u043A\u0430: {message}",
  // panel chrome added with the Native restyle
  "panel.import.short": "\u0418\u043C\u043F\u043E\u0440\u0442",
  "panel.import.hint": "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0431\u043B\u043E\u043A mcpServers \u0446\u0435\u043B\u0438\u043A\u043E\u043C: \u0441\u0435\u0440\u0432\u0435\u0440\u044B \u0434\u043E\u0431\u0430\u0432\u044F\u0442\u0441\u044F \u0441\u043E \u0441\u0432\u043E\u0438\u043C\u0438 \u0430\u0434\u0440\u0435\u0441\u0430\u043C\u0438 \u0438 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430\u043C\u0438.",
  "panel.stats.connections.one": "{count} \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
  "panel.stats.connections.few": "{count} \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
  "panel.stats.connections.many": "{count} \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439",
  "panel.stats.connections.other": "{count} \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
  "panel.stats.errors": "{count} \u0441 \u043E\u0448\u0438\u0431\u043A\u043E\u0439",
  "panel.store.label": "\u0425\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439",
  "panel.empty.title": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
  "panel.empty.text": "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 MCP-\u0441\u0435\u0440\u0432\u0435\u0440 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0438\u043B\u0438 \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 servers.json \u0438\u0437 Claude Code \u2014 \u043F\u0430\u043D\u0435\u043B\u044C \u0438 \u0430\u0433\u0435\u043D\u0442 \u043F\u043E\u0434\u0445\u0432\u0430\u0442\u044F\u0442 \u0435\u0433\u043E \u0441\u0440\u0430\u0437\u0443.",
  "card.copy": "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
  "card.refreshed": "\u0421\u043F\u0438\u0441\u043E\u043A \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D",
  "card.copied": "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E",
  "card.copyPath": "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0443\u0442\u044C",
  "card.menu.more": "\u0415\u0449\u0451 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
  "card.enableTools": "\u041E\u0442\u0434\u0430\u0432\u0430\u0442\u044C \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u043C\u043E\u0434\u0435\u043B\u0438",
  "editor.section.main": "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435",
  "editor.section.auth": "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
  "editor.auth.mode": "\u0421\u043F\u043E\u0441\u043E\u0431 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
  "editor.section.options": "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E",
  "editor.enable": "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u0440\u0430\u0437\u0443",
  "editor.enableHint": "\u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u043E\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043E\u0442\u0434\u0430\u0451\u0442 \u0441\u0432\u043E\u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u043C\u043E\u0434\u0435\u043B\u0438.",
  "editor.hint.test": "\xAB\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C\xBB \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u0432\u0432\u0435\u0434\u0451\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438 \u043F\u0440\u043E\u0431\u0443\u0435\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F.",
  "editor.error.url": "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430.",
  "editor.error.command": "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0443 \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",
  "common.close": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
  "panel.stats.working.one": "{count} \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442",
  "panel.stats.working.few": "{count} \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442",
  "panel.stats.working.many": "{count} \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442",
  "panel.stats.working.other": "{count} \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442",
  "card.delete.confirm": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \xAB{name}\xBB? \u0421\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0435 \u0442\u043E\u043A\u0435\u043D\u044B \u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B.",
  "panel.import.json": "JSON \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 mcpServers",
  "editor.params.in": "\u0413\u0434\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440",
  "card.auth.params.one": "{count} \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
  "card.auth.params.few": "{count} \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
  "card.auth.params.many": "{count} \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
  "card.auth.params.other": "{count} \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
  "card.status.refreshing": "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430",
  "card.auth.reauthorize": "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0432\u0445\u043E\u0434",
  "card.auth.noParams": "API-\u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043D\u0435 \u0437\u0430\u0434\u0430\u043D\u044B",
  "editor.test.ok": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432: {count}"
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

// src/ui.js
var React2 = __toESM(require("react"), 1);

// src/styles.css
var styles_default = '/*\n * Styling for the MCP connections panel.\n *\n * One rule governs the file: every colour, radius, shadow, font and focus metric is read\n * from a public DSH token (`--dsw-*`) with a neutral fallback for hosts that do not define\n * it. The plugin owns no palette of its own, so a DSH or third-party theme reaches the\n * panel without overrides, and the same declarations serve light and dark.\n *\n * The `--mcp-*` layer below exists so component rules stay short and so a single place\n * maps a semantic name onto the host token that carries it.\n */\n\n.mcp-root {\n	--mcp-font: var(--dsw-font-family, var(--dsh-font-family-text, -apple-system, "Segoe UI", sans-serif));\n	--mcp-mono: var(--ds-font-family-code, ui-monospace, "Cascadia Code", Consolas, monospace);\n\n	--mcp-text: var(--dsw-alias-label-primary, inherit);\n	--mcp-text-2: var(--dsw-alias-label-secondary, rgba(127, 127, 127, 0.85));\n	--mcp-text-3: var(--dsw-alias-label-tertiary, rgba(127, 127, 127, 0.7));\n\n	--mcp-surface: var(--dsw-alias-bg-skeleton, rgba(127, 127, 127, 0.1));\n	--mcp-surface-hover: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.12));\n	--mcp-card: var(--dsw-alias-card-fill, var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.05)));\n	--mcp-menu: var(--dsw-specific-menu, var(--dsw-alias-bg-layer-2, #f8f9fa));\n	/* The native option list paints on the platform\'s own surface, underneath the menu\n	 * fill: that fill is translucent for the in-app popover, so the list would show white\n	 * through it. Layer 2 is the opaque popover surface in both themes. */\n	--mcp-popup: var(--dsw-alias-bg-layer-2, var(--dsw-alias-card-fill, #ffffff));\n\n	--mcp-border: var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.22));\n	--mcp-border-strong: var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.32));\n	/* Control outlines: the host\'s l2 is a divider hairline, so controls take l4. */\n	--mcp-border-control: var(--dsw-alias-border-l4, rgba(127, 127, 127, 0.45));\n\n	--mcp-accent: var(--dsw-alias-state-business-primary, #4d6bfe);\n	--mcp-accent-fill: var(--dsw-alias-button-primary-fill, #1f2328);\n	--mcp-accent-fill-hover: var(--dsw-alias-button-primary-hover, #33373d);\n	--mcp-on-accent: var(--dsw-alias-label-primary-foreground, #ffffff);\n	--mcp-thumb: var(--dsw-alias-switch-thumb, #ffffff);\n\n	--mcp-success: var(--dsw-alias-state-success-primary, #2e9e63);\n	--mcp-warn: var(--dsw-alias-state-warn-primary, #b8860b);\n	--mcp-danger: var(--dsw-alias-state-error-primary, #c8433c);\n	--mcp-idle: var(--dsw-alias-state-idle-primary, #8a94a6);\n\n	/* The host publishes `--dsw-focus-ring-color: transparent` for its own automatic-focus\n	 * suppression, so the ring takes the accent and a fixed 2px width instead. */\n	--mcp-focus: var(--dsw-alias-state-business-primary, #4d6bfe);\n	--mcp-focus-width: 2px;\n\n	--mcp-radius-card: var(--dsw-radius-md, 12px);\n	--mcp-radius-control: var(--dsw-radius-sm, 8px);\n	--mcp-radius-chip: 6px;\n\n	--mcp-shadow: var(--dsw-elevation-panel, var(--dsw-shadow-lv2, 0 6px 16px rgba(0, 0, 0, 0.14)));\n\n	color: var(--mcp-text);\n	font-family: var(--mcp-font);\n}\n\n/* \u2500\u2500 page \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n/* The page owns the scrollport: the host\'s main column clips whatever overflows it, so a\n * form taller than the window used to be cut off with no way to reach its lower fields.\n * `align-content: start` keeps short pages from stretching their rows to fill the hole. */\n.mcp-page {\n	display: grid;\n	align-content: start;\n	gap: 18px;\n	width: 100%;\n	max-width: 1000px;\n	height: 100%;\n	padding: 24px 28px 0;\n	box-sizing: border-box;\n	overflow-y: auto;\n	overscroll-behavior: contain;\n}\n\n/* Trailing space sits on the content, not on the scrollport: a scroll container\'s own\n * bottom padding lifts the sticky action bar that far off the window edge. */\n.mcp-page > :last-child {\n	margin-bottom: 40px;\n}\n\n.mcp-head {\n	display: flex;\n	align-items: flex-start;\n	justify-content: space-between;\n	gap: 16px;\n	flex-wrap: wrap;\n}\n\n.mcp-head-text {\n	display: grid;\n	gap: 6px;\n	min-width: 240px;\n	flex: 1 1 360px;\n}\n\n.mcp-title {\n	margin: 0;\n	font-size: var(--dsw-font-l-20-font-size, 20px);\n	line-height: var(--dsw-font-l-20-line-height, 28px);\n	font-weight: var(--dsw-font-l-20-font-weight, 500);\n	color: var(--mcp-text);\n}\n\n.mcp-intro {\n	margin: 0;\n	max-width: 640px;\n	font-size: var(--dsw-font-xs-13-font-size, 13px);\n	line-height: var(--dsw-font-xs-13-line-height, 20px);\n	color: var(--mcp-text-2);\n}\n\n.mcp-head-actions {\n	display: flex;\n	align-items: center;\n	gap: 8px;\n	flex-wrap: wrap;\n}\n\n.mcp-stats {\n	display: flex;\n	align-items: center;\n	gap: 8px;\n	flex-wrap: wrap;\n}\n\n.mcp-stats-spacer {\n	flex: 1;\n}\n\n/* \u2500\u2500 chips \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.mcp-chip {\n	display: inline-flex;\n	align-items: center;\n	gap: 4px;\n	height: 22px;\n	padding: 0 8px;\n	border-radius: var(--mcp-radius-chip);\n	background: var(--mcp-surface);\n	color: var(--mcp-text-2);\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	line-height: 1;\n	white-space: nowrap;\n}\n\n/* Status colour rides a dot, not the letters: the host palette\'s state colours are\n * dot colours, and 12px text in them fails contrast on the card surfaces. */\n.mcp-chip--ok,\n.mcp-chip--warn,\n.mcp-chip--error {\n	color: var(--mcp-text);\n}\n.mcp-chip--ok::before,\n.mcp-chip--warn::before,\n.mcp-chip--error::before {\n	content: "";\n	width: 6px;\n	height: 6px;\n	border-radius: 50%;\n	flex: none;\n}\n.mcp-chip--ok {\n	background: rgba(34, 197, 94, 0.12);\n	background: color-mix(in srgb, var(--mcp-success) 12%, transparent);\n}\n.mcp-chip--ok::before {\n	background: var(--mcp-success);\n}\n.mcp-chip--warn {\n	background: rgba(245, 158, 11, 0.12);\n	background: color-mix(in srgb, var(--mcp-warn) 14%, transparent);\n}\n.mcp-chip--warn::before {\n	background: var(--mcp-warn);\n}\n.mcp-chip--error {\n	background: rgba(242, 90, 90, 0.12);\n	background: color-mix(in srgb, var(--mcp-danger) 12%, transparent);\n}\n.mcp-chip--error::before {\n	background: var(--mcp-danger);\n}\n.mcp-chip--off {\n	opacity: 0.75;\n}\n\n/* \u2500\u2500 buttons \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.mcp-btn {\n	display: inline-flex;\n	align-items: center;\n	justify-content: center;\n	gap: 6px;\n	height: 32px;\n	padding: 0 12px;\n	border: 1px solid transparent;\n	border-radius: var(--mcp-radius-control);\n	background: transparent;\n	color: var(--mcp-text);\n	font: inherit;\n	font-size: var(--dsw-font-xs-13-font-size, 13px);\n	font-weight: 500;\n	line-height: 1;\n	cursor: pointer;\n	transition: background-color 0.12s ease, border-color 0.12s ease, opacity 0.12s ease;\n	-webkit-tap-highlight-color: transparent;\n}\n\n.mcp-btn:disabled {\n	opacity: 0.45;\n	cursor: default;\n}\n\n.mcp-btn--primary {\n	background: var(--mcp-accent-fill);\n	color: var(--mcp-on-accent);\n}\n.mcp-btn--secondary {\n	border-color: var(--mcp-border-control);\n	background: transparent;\n	color: var(--mcp-text);\n}\n.mcp-btn--ghost {\n	color: var(--mcp-text-2);\n}\n.mcp-btn--danger {\n	color: var(--mcp-danger);\n}\n.mcp-btn--icon {\n	width: 30px;\n	height: 30px;\n	padding: 0;\n	color: var(--mcp-text-2);\n}\n.mcp-btn--sm {\n	height: 28px;\n	padding: 0 9px;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n}\n.mcp-btn--icon.mcp-btn--sm {\n	width: 28px;\n	padding: 0;\n}\n\n.mcp-btn svg,\n.mcp-icon svg {\n	display: block;\n	flex: none;\n}\n\n@media (hover: hover) {\n	.mcp-btn--primary:hover:not(:disabled) {\n		background: var(--mcp-accent-fill-hover);\n	}\n	.mcp-btn--secondary:hover:not(:disabled) {\n		background: var(--mcp-surface-hover);\n	}\n	.mcp-btn--ghost:hover:not(:disabled),\n	.mcp-btn--icon:hover:not(:disabled) {\n		background: var(--mcp-surface-hover);\n		color: var(--mcp-text);\n	}\n	.mcp-btn--danger:hover:not(:disabled) {\n		background: var(--dsw-alias-interactive-bg-hover-danger, rgba(200, 67, 60, 0.12));\n	}\n}\n\n.mcp-btn:active:not(:disabled) {\n	transform: translateY(0.5px);\n}\n\n.mcp-btn:focus-visible,\n.mcp-icon-btn:focus-visible,\n.mcp-switch input:focus-visible + .mcp-switch-track {\n	outline: var(--mcp-focus-width) solid var(--mcp-focus);\n	outline-offset: 2px;\n}\n\n/* \u2500\u2500 cards \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.mcp-list {\n	display: grid;\n	gap: 10px;\n}\n\n.mcp-card {\n	display: grid;\n	gap: 10px;\n	padding: 14px 16px;\n	border: 1px solid var(--mcp-border);\n	border-radius: var(--mcp-radius-card);\n	background: var(--mcp-card);\n}\n\n.mcp-card--off {\n	background: transparent;\n}\n\n.mcp-card-head {\n	display: flex;\n	align-items: center;\n	gap: 8px;\n	flex-wrap: wrap;\n}\n\n.mcp-status {\n	width: 8px;\n	height: 8px;\n	border-radius: 50%;\n	flex: none;\n	background: var(--mcp-idle);\n	box-shadow: 0 0 0 3px color-mix(in srgb, var(--mcp-idle) 18%, transparent);\n}\n.mcp-status[data-state="ready"] {\n	background: var(--mcp-success);\n	box-shadow: 0 0 0 3px color-mix(in srgb, var(--mcp-success) 18%, transparent);\n}\n.mcp-status[data-state="connecting"],\n.mcp-status[data-state="refreshing"],\n.mcp-status[data-state="reconnecting"],\n.mcp-status[data-state="needs_auth"] {\n	background: var(--mcp-warn);\n	box-shadow: 0 0 0 3px color-mix(in srgb, var(--mcp-warn) 18%, transparent);\n}\n.mcp-status[data-state="error"] {\n	background: var(--mcp-danger);\n	box-shadow: 0 0 0 3px color-mix(in srgb, var(--mcp-danger) 18%, transparent);\n}\n\n.mcp-card-name {\n	margin: 0;\n	font-size: var(--dsw-font-s-14-font-size, 14px);\n	line-height: var(--dsw-font-s-14-line-height, 22px);\n	font-weight: 600;\n	color: var(--mcp-text);\n	overflow-wrap: anywhere;\n}\n\n.mcp-card-status {\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	color: var(--mcp-text-2);\n}\n\n.mcp-card-tools {\n	margin-left: auto;\n	display: flex;\n	align-items: center;\n	gap: 2px;\n	flex-wrap: wrap;\n}\n\n.mcp-card-meta {\n	display: flex;\n	align-items: center;\n	gap: 6px;\n	flex-wrap: wrap;\n	min-width: 0;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	color: var(--mcp-text-2);\n}\n\n.mcp-endpoint {\n	display: inline-flex;\n	align-items: center;\n	gap: 6px;\n	max-width: 100%;\n	min-width: 0;\n	padding: 2px 4px 2px 8px;\n	border-radius: var(--mcp-radius-control);\n	background: var(--mcp-surface);\n	color: var(--mcp-text-2);\n}\n\n.mcp-endpoint code {\n	font-family: var(--mcp-mono);\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	line-height: 18px;\n	background: transparent;\n	padding: 0;\n	max-width: 46ch;\n	overflow: hidden;\n	text-overflow: ellipsis;\n	white-space: nowrap;\n}\n\n.mcp-meta-sep {\n	color: var(--mcp-text-3);\n}\n\n.mcp-note {\n	margin: 0;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	line-height: 18px;\n	color: var(--mcp-text-2);\n	overflow-wrap: anywhere;\n}\n\n.mcp-alert {\n	display: flex;\n	align-items: flex-start;\n	gap: 8px;\n	padding: 7px 10px;\n	border-radius: var(--mcp-radius-control);\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	line-height: 18px;\n	overflow-wrap: anywhere;\n	background: rgba(242, 90, 90, 0.1);\n	background: color-mix(in srgb, var(--mcp-danger) 10%, transparent);\n	color: var(--mcp-text);\n}\n.mcp-alert::before {\n	content: "";\n	width: 6px;\n	height: 6px;\n	margin-top: 6px;\n	border-radius: 50%;\n	flex: none;\n	background: var(--mcp-danger);\n}\n.mcp-alert--ok {\n	background: rgba(34, 197, 94, 0.1);\n	background: color-mix(in srgb, var(--mcp-success) 10%, transparent);\n	color: var(--mcp-text);\n}\n.mcp-alert--ok::before {\n	background: var(--mcp-success);\n}\n.mcp-alert--muted {\n	background: var(--mcp-surface);\n	color: var(--mcp-text-2);\n}\n.mcp-alert--muted::before {\n	background: var(--mcp-idle);\n}\n\n.mcp-alert .mcp-btn {\n	flex: none;\n}\n\n.mcp-card-actions {\n	display: flex;\n	align-items: center;\n	gap: 6px;\n	flex-wrap: wrap;\n}\n\n.mcp-card-actions-spacer {\n	flex: 1;\n}\n\n/* \u2500\u2500 switch \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.mcp-switch--icon {\n	margin-left: 6px;\n}\n\n.mcp-switch {\n	display: inline-flex;\n	align-items: center;\n	gap: 8px;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	color: var(--mcp-text-2);\n	cursor: pointer;\n	user-select: none;\n}\n\n.mcp-switch input {\n	position: absolute;\n	opacity: 0;\n	width: 1px;\n	height: 1px;\n	margin: 0;\n	pointer-events: none;\n}\n\n.mcp-switch-track {\n	position: relative;\n	width: 34px;\n	height: 20px;\n	flex: none;\n	border-radius: 999px;\n	background: var(--mcp-border-strong);\n	transition: background-color 0.14s ease;\n}\n\n.mcp-switch-thumb {\n	position: absolute;\n	top: 2px;\n	left: 2px;\n	width: 16px;\n	height: 16px;\n	border-radius: 50%;\n	background: var(--mcp-thumb);\n	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);\n	transition: transform 0.14s ease;\n}\n\n.mcp-switch input:checked + .mcp-switch-track {\n	background: var(--mcp-accent-fill);\n}\n\n.mcp-switch input:checked + .mcp-switch-track .mcp-switch-thumb {\n	transform: translateX(14px);\n}\n\n.mcp-switch input:disabled + .mcp-switch-track {\n	opacity: 0.45;\n}\n\n/* \u2500\u2500 overflow menu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.mcp-menu {\n	position: relative;\n}\n\n.mcp-menu > summary {\n	list-style: none;\n}\n\n.mcp-menu > summary::-webkit-details-marker {\n	display: none;\n}\n\n.mcp-menu-pop {\n	position: absolute;\n	right: 0;\n	top: calc(100% + 6px);\n	z-index: 20;\n	min-width: 190px;\n	padding: 4px;\n	border: 1px solid var(--mcp-border);\n	border-radius: var(--mcp-radius-card);\n	background: var(--mcp-menu);\n	box-shadow: var(--mcp-shadow);\n	backdrop-filter: var(--dsw-menu-backdrop-filter, blur(12px));\n}\n\n.mcp-menu-item {\n	display: flex;\n	align-items: center;\n	gap: 8px;\n	width: 100%;\n	padding: 8px 10px;\n	border: 0;\n	border-radius: 6px;\n	background: transparent;\n	color: var(--mcp-text);\n	font: inherit;\n	font-size: var(--dsw-font-xs-13-font-size, 13px);\n	text-align: left;\n	cursor: pointer;\n}\n\n.mcp-menu-item:disabled {\n	opacity: 0.45;\n	cursor: default;\n}\n\n.mcp-menu-item:focus-visible {\n	outline: var(--mcp-focus-width) solid var(--mcp-focus);\n	outline-offset: -2px;\n}\n\n.mcp-menu-item--danger {\n	color: var(--mcp-danger);\n}\n\n@media (hover: hover) {\n	.mcp-menu-item:hover:not(:disabled) {\n		background: var(--mcp-surface-hover);\n	}\n}\n\n/* \u2500\u2500 editor and import \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.mcp-editor {\n	border: 1px solid var(--mcp-border-strong);\n	border-radius: var(--mcp-radius-card);\n	background: var(--mcp-card);\n}\n\n.mcp-editor-head {\n	display: flex;\n	align-items: center;\n	gap: 8px;\n	padding: 12px 16px;\n	border-bottom: 1px solid var(--mcp-border);\n}\n\n.mcp-editor-title {\n	margin: 0;\n	font-size: var(--dsw-font-s-14-font-size, 14px);\n	line-height: 22px;\n	font-weight: 600;\n}\n\n.mcp-editor-body {\n	display: grid;\n	gap: 18px;\n	padding: 16px;\n}\n\n.mcp-group {\n	display: grid;\n	gap: 10px;\n	margin: 0;\n	padding: 0;\n	border: 0;\n	min-width: 0;\n}\n\n.mcp-group + .mcp-group {\n	padding-top: 16px;\n	border-top: 1px solid var(--mcp-border);\n}\n\n.mcp-group-title {\n	padding: 0;\n	margin: 0 0 2px;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	font-weight: 600;\n	color: var(--mcp-text-2);\n}\n\n.mcp-grid-2 {\n	display: grid;\n	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n	gap: 10px;\n}\n\n.mcp-stack {\n	display: grid;\n	gap: 10px;\n}\n\n.mcp-field {\n	display: grid;\n	gap: 5px;\n	min-width: 0;\n}\n\n.mcp-label {\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	line-height: 16px;\n	color: var(--mcp-text-2);\n}\n\n.mcp-input,\n.mcp-textarea,\n.mcp-select {\n	width: 100%;\n	box-sizing: border-box;\n	min-height: 34px;\n	padding: 6px 10px;\n	border: 1px solid var(--mcp-border-control);\n	border-radius: var(--mcp-radius-control);\n	background: transparent;\n	color: var(--mcp-text);\n	font: inherit;\n	font-size: var(--dsw-font-xs-13-font-size, 13px);\n	line-height: 20px;\n}\n\n.mcp-input::placeholder,\n.mcp-textarea::placeholder {\n	color: var(--mcp-text-2);\n}\n\n.mcp-textarea {\n	min-height: 96px;\n	padding: 8px 10px;\n	resize: vertical;\n	font-family: var(--mcp-mono);\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	line-height: 18px;\n}\n\n.mcp-select {\n	appearance: none;\n	padding-right: 30px;\n	cursor: pointer;\n}\n\n/* Without an explicit fill the open list keeps the platform\'s white surface while the\n * option text follows the theme \u2014 a white list with white labels in the dark theme. */\n.mcp-select option {\n	background-color: var(--mcp-popup);\n	color: var(--mcp-text);\n}\n\n.mcp-select-wrap {\n	position: relative;\n}\n\n.mcp-select-wrap::after {\n	content: "";\n	position: absolute;\n	right: 11px;\n	top: 50%;\n	width: 6px;\n	height: 6px;\n	border-right: 1.5px solid var(--mcp-text-2);\n	border-bottom: 1.5px solid var(--mcp-text-2);\n	transform: translateY(-70%) rotate(45deg);\n	pointer-events: none;\n}\n\n.mcp-input:focus-visible,\n.mcp-textarea:focus-visible,\n.mcp-select:focus-visible {\n	outline: var(--mcp-focus-width) solid var(--mcp-focus);\n	outline-offset: 1px;\n	border-color: transparent;\n}\n\n.mcp-check {\n	display: flex;\n	align-items: flex-start;\n	gap: 8px;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	line-height: 18px;\n	color: var(--mcp-text-2);\n	cursor: pointer;\n}\n\n.mcp-check input {\n	margin: 2px 0 0;\n	accent-color: var(--mcp-accent-fill);\n}\n\n.mcp-params {\n	display: grid;\n	gap: 6px;\n}\n\n.mcp-param {\n	display: grid;\n	grid-template-columns: 96px minmax(120px, 1fr) minmax(120px, 1fr) auto;\n	gap: 6px;\n	align-items: center;\n}\n\n.mcp-hint {\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	line-height: 18px;\n	color: var(--mcp-text-2);\n	overflow-wrap: anywhere;\n}\n\n.mcp-editor > .mcp-alert {\n	margin: 0 16px 12px;\n}\n\n.mcp-editor-foot {\n	position: sticky;\n	bottom: 0;\n	z-index: 5;\n	display: flex;\n	align-items: center;\n	gap: 8px;\n	flex-wrap: wrap;\n	padding: 12px 16px;\n	border-top: 1px solid var(--mcp-border);\n	background: var(--mcp-card);\n}\n\n.mcp-editor-foot .mcp-hint {\n	flex: 1 1 220px;\n	margin-right: auto;\n}\n\n/* \u2500\u2500 tool catalog card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.mcp-editor-heading {\n	display: grid;\n	gap: 2px;\n	min-width: 0;\n}\n\n.mcp-tools-subject {\n	overflow: hidden;\n	text-overflow: ellipsis;\n	white-space: nowrap;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	color: var(--mcp-text-2);\n}\n\n/* The status belongs to the right edge, next to the close button; the heading block keeps\n * the left edge. */\n.mcp-tools .mcp-card-status {\n	margin-left: auto;\n	white-space: nowrap;\n}\n\n/* The tool-count chip is a real control: it opens the catalog card. */\n.mcp-chip--action {\n	border: 1px solid transparent;\n	background: var(--mcp-surface);\n	color: var(--mcp-text-2);\n	font-family: inherit;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	cursor: pointer;\n	transition: background-color 120ms ease, color 120ms ease;\n}\n.mcp-chip--action:hover {\n	background: var(--mcp-surface-hover);\n	color: var(--mcp-text);\n}\n.mcp-chip--action:focus-visible {\n	outline: var(--mcp-focus-width) solid var(--mcp-focus);\n	outline-offset: 2px;\n}\n\n.mcp-tools-summary {\n	display: flex;\n	flex-wrap: wrap;\n	gap: 6px;\n}\n\n.mcp-tools-search {\n	display: flex;\n	align-items: center;\n	gap: 6px;\n}\n.mcp-tools-search .mcp-input {\n	flex: 1;\n	min-width: 0;\n}\n\n.mcp-tools-groups {\n	display: grid;\n	gap: 18px;\n}\n\n.mcp-tool-group {\n	display: grid;\n	gap: 4px;\n	min-width: 0;\n}\n\n.mcp-tool-group-title {\n	display: flex;\n	align-items: center;\n	gap: 6px;\n	margin: 0;\n	padding: 0 0 4px;\n	border-bottom: 1px solid var(--mcp-border);\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	font-weight: 600;\n	color: var(--mcp-text-2);\n}\n\n.mcp-tool-group-count {\n	padding: 0 6px;\n	border-radius: 999px;\n	background: var(--mcp-surface);\n	color: var(--mcp-text-3);\n	font-weight: 500;\n	font-variant-numeric: tabular-nums;\n}\n\n.mcp-tool-list {\n	display: grid;\n	gap: 2px;\n	margin: 0;\n	padding: 0;\n	list-style: none;\n}\n\n.mcp-tool {\n	padding: 8px;\n	border-radius: var(--mcp-radius-control);\n}\n.mcp-tool:hover {\n	background: var(--mcp-surface);\n}\n\n.mcp-tool-line {\n	display: flex;\n	align-items: center;\n	flex-wrap: wrap;\n	gap: 6px;\n	min-width: 0;\n}\n\n.mcp-tool-name {\n	font-family: var(--mcp-mono);\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	color: var(--mcp-text);\n	overflow-wrap: anywhere;\n}\n\n.mcp-tool-title {\n	margin: 2px 0 0;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	color: var(--mcp-text);\n}\n\n/* Three lines is enough to recognise a tool; the full text stays in the DOM and in the\n * native tooltip, so nothing is lost for a screen reader or for search. */\n.mcp-tool-desc {\n	display: -webkit-box;\n	-webkit-box-orient: vertical;\n	-webkit-line-clamp: 3;\n	line-clamp: 3;\n	overflow: hidden;\n	margin: 2px 0 0;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	line-height: 1.45;\n	color: var(--mcp-text-2);\n	overflow-wrap: anywhere;\n}\n\n.mcp-tool-copy {\n	flex: none;\n	margin-left: auto;\n	opacity: 0;\n	transition: opacity 120ms ease;\n}\n.mcp-tool:hover .mcp-tool-copy,\n.mcp-tool:focus-within .mcp-tool-copy {\n	opacity: 1;\n}\n@media (hover: none) {\n	.mcp-tool-copy {\n		opacity: 1;\n	}\n}\n\n.mcp-tools-more {\n	justify-self: start;\n}\n\n.mcp-tools-empty {\n	margin: 0;\n	padding: 12px 0;\n	color: var(--mcp-text-2);\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n}\n\n/* \u2500\u2500 empty and loading states \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.mcp-empty {\n	display: grid;\n	justify-items: center;\n	gap: 10px;\n	padding: 36px 20px;\n	border: 1px dashed var(--mcp-border-strong);\n	border-radius: var(--mcp-radius-card);\n	text-align: center;\n}\n\n.mcp-empty-icon {\n	display: grid;\n	place-items: center;\n	width: 44px;\n	height: 44px;\n	border-radius: var(--mcp-radius-card);\n	background: var(--mcp-surface);\n	color: var(--mcp-accent);\n}\n\n.mcp-empty-title {\n	margin: 0;\n	font-size: var(--dsw-font-s-14-font-size, 14px);\n	line-height: 22px;\n	font-weight: 600;\n}\n\n.mcp-empty-text {\n	margin: 0;\n	max-width: 420px;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	line-height: 18px;\n	color: var(--mcp-text-2);\n}\n\n.mcp-empty-actions {\n	display: flex;\n	gap: 8px;\n	flex-wrap: wrap;\n	justify-content: center;\n	margin-top: 4px;\n}\n\n.mcp-skeleton-card {\n	display: grid;\n	gap: 10px;\n	padding: 14px 16px;\n	border: 1px solid var(--mcp-border);\n	border-radius: var(--mcp-radius-card);\n}\n\n.mcp-skeleton-line {\n	height: 12px;\n	border-radius: 6px;\n	background: var(--mcp-surface);\n	animation: mcp-pulse 1.6s ease-in-out infinite;\n}\n\n.mcp-skeleton-line--title {\n	width: 30%;\n	height: 14px;\n}\n.mcp-skeleton-line--wide {\n	width: 68%;\n}\n.mcp-skeleton-line--short {\n	width: 42%;\n}\n\n.mcp-spinner {\n	display: block;\n	animation: mcp-spin 0.9s linear infinite;\n}\n\n@keyframes mcp-spin {\n	to {\n		transform: rotate(360deg);\n	}\n}\n\n@keyframes mcp-pulse {\n	0%,\n	100% {\n		opacity: 0.55;\n	}\n	50% {\n		opacity: 1;\n	}\n}\n\n/* \u2500\u2500 page footer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.mcp-foot {\n	display: flex;\n	align-items: center;\n	gap: 6px;\n	flex-wrap: wrap;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	color: var(--mcp-text-3);\n}\n\n.mcp-foot code {\n	font-family: var(--mcp-mono);\n	font-size: 11px;\n	overflow-wrap: anywhere;\n}\n\n/* \u2500\u2500 workbench \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.mcp-workbench {\n	display: grid;\n	gap: 8px;\n	height: 100%;\n	padding: 10px;\n	box-sizing: border-box;\n	overflow: auto;\n}\n\n.mcp-workbench-head {\n	display: flex;\n	align-items: center;\n	gap: 8px;\n	flex-wrap: wrap;\n	padding: 0 4px;\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	color: var(--mcp-text-2);\n}\n\n.mcp-workbench-title {\n	color: var(--mcp-text);\n	font-weight: 600;\n}\n\n.mcp-frame {\n	border: 1px solid var(--mcp-border);\n	border-radius: var(--mcp-radius-card);\n	overflow: hidden;\n	background: transparent;\n}\n\n.mcp-frame iframe {\n	display: block;\n	width: 100%;\n	border: 0;\n	background: transparent;\n}\n\n.mcp-iframe-note {\n	display: flex;\n	align-items: center;\n	gap: 8px;\n	flex-wrap: wrap;\n	padding: 8px 10px;\n	border-radius: var(--mcp-radius-control);\n	background: var(--mcp-surface);\n	font-size: var(--dsw-font-xxs-12-font-size, 12px);\n	line-height: 18px;\n	color: var(--mcp-text-2);\n}\n\n/* \u2500\u2500 narrow screens \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n@media (max-width: 720px) {\n	.mcp-page {\n		padding: 16px 16px 0;\n		gap: 14px;\n	}\n	.mcp-page > :last-child {\n		margin-bottom: 32px;\n	}\n	.mcp-head {\n		flex-direction: column;\n		align-items: stretch;\n		gap: 12px;\n	}\n	/* A row flex item\'s basis is a minimum width; a column\'s is a height. */\n	.mcp-head-text {\n		flex: 0 1 auto;\n		min-width: 0;\n	}\n	.mcp-head-actions {\n		flex: 0 0 auto;\n		justify-content: flex-start;\n	}\n	.mcp-head-actions .mcp-btn--primary {\n		flex: 1;\n	}\n	.mcp-endpoint code {\n		max-width: 100%;\n	}\n	.mcp-meta-sep,\n	.mcp-meta-time {\n		display: none;\n	}\n	.mcp-param {\n		grid-template-columns: minmax(0, 1fr) auto;\n	}\n	.mcp-param .mcp-param-value {\n		grid-column: 1 / -1;\n	}\n	.mcp-editor-foot .mcp-hint {\n		flex-basis: 100%;\n	}\n}\n\n@media (prefers-reduced-motion: reduce) {\n	.mcp-btn,\n	.mcp-switch-track,\n	.mcp-switch-thumb {\n		transition: none;\n	}\n	.mcp-skeleton-line,\n	.mcp-spinner {\n		animation: none;\n	}\n}\n';

// src/ui.js
var h = React2.createElement;
var STYLE_OWNER = "dsh-plugin-mcp-apps";
function installStyles() {
  if (typeof document === "undefined") return () => {
  };
  if (document.querySelector(`style[data-dsh-plugin="${STYLE_OWNER}"]`)) return () => {
  };
  const style = document.createElement("style");
  style.setAttribute("data-dsh-plugin", STYLE_OWNER);
  style.textContent = styles_default;
  document.head.appendChild(style);
  return () => {
    style.remove();
  };
}
var GLYPHS = {
  plus: [["path", { d: "M8 3.5v9M3.5 8h9" }]],
  refresh: [["path", { d: "M12.7 6.5A5 5 0 1 0 13 9.3M13 3.4v3.3h-3.3" }]],
  edit: [
    ["path", { d: "M3.2 12.8l.6-2.6 6.9-6.9a1.4 1.4 0 0 1 2 0l.9.9a1.4 1.4 0 0 1 0 2l-6.9 6.9-2.6.6z" }],
    ["path", { d: "M9.7 4.7l1.6 1.6" }]
  ],
  check: [["path", { d: "M3.2 8.4l3.2 3.2 6.4-6.4" }]],
  trash: [
    ["path", { d: "M3 4.6h10M6.5 4.6V3.2h3v1.4M4.8 4.6l.5 8.2h5.4l.5-8.2" }],
    ["path", { d: "M6.8 7v3.4M9.2 7v3.4" }]
  ],
  copy: [
    ["rect", { x: 5.6, y: 5.6, width: 7, height: 7, rx: 1.2 }],
    ["path", { d: "M10.4 5.6V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5.4a1 1 0 0 0 1 1h1.6" }]
  ],
  close: [["path", { d: "M4 4l8 8M12 4l-8 8" }]],
  chevron: [["path", { d: "M4 6.5l4 4 4-4" }]],
  plug: [
    ["path", { d: "M6 2.6v2.8M10 2.6v2.8" }],
    ["path", { d: "M4.4 5.4h7.2v3.1a3.6 3.6 0 0 1-7.2 0z" }],
    ["path", { d: "M8 12.1v1.5" }]
  ],
  more: [
    ["circle", { cx: 3.4, cy: 8, r: 1.15, fill: "currentColor", stroke: "none" }],
    ["circle", { cx: 8, cy: 8, r: 1.15, fill: "currentColor", stroke: "none" }],
    ["circle", { cx: 12.6, cy: 8, r: 1.15, fill: "currentColor", stroke: "none" }]
  ]
};
function Glyph(props) {
  const paths = GLYPHS[props.name] || [];
  const size = props.size || 16;
  return h(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    },
    paths.map(([tag, attributes], index) => h(tag, { key: index, ...attributes }))
  );
}
function Spinner() {
  return h(
    "svg",
    { className: "mcp-spinner", width: 14, height: 14, viewBox: "0 0 16 16", "aria-hidden": true },
    h("circle", { cx: 8, cy: 8, r: 6, fill: "none", stroke: "currentColor", strokeWidth: 2, opacity: 0.25 }),
    h("path", { d: "M14 8a6 6 0 0 0-6-6", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" })
  );
}
function Switch(props) {
  return h(
    "label",
    { className: "mcp-switch" + (props.hideLabel ? " mcp-switch--icon" : "") },
    h("input", {
      type: "checkbox",
      checked: props.checked,
      disabled: props.disabled === true,
      "aria-label": props.hideLabel ? props.label : void 0,
      onChange: (event) => props.onChange(event.target.checked)
    }),
    h("span", { className: "mcp-switch-track", "aria-hidden": true }, h("span", { className: "mcp-switch-thumb" })),
    props.hideLabel ? null : h("span", null, props.label)
  );
}
function Menu(props) {
  const ref = React2.useRef(null);
  React2.useEffect(() => {
    const node = ref.current;
    if (!node) return void 0;
    const closeOutside = (event) => {
      if (node.open && !node.contains(event.target)) node.open = false;
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") node.open = false;
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
  return h(
    "details",
    { className: "mcp-menu", ref },
    h(
      "summary",
      { className: "mcp-btn mcp-btn--icon mcp-btn--sm", title: props.label, "aria-label": props.label },
      h(Glyph, { name: "more" })
    ),
    h(
      "div",
      {
        className: "mcp-menu-pop",
        onClick: () => {
          if (ref.current) ref.current.open = false;
        }
      },
      props.children
    )
  );
}
function MenuItem(props) {
  return h(
    "button",
    {
      type: "button",
      className: "mcp-menu-item" + (props.danger ? " mcp-menu-item--danger" : ""),
      disabled: props.disabled === true,
      onClick: props.onSelect
    },
    props.icon ? h(Glyph, { name: props.icon }) : null,
    h("span", null, props.children)
  );
}
function CopyButton(props) {
  const [copied, setCopied] = React2.useState(false);
  const timer = React2.useRef(null);
  React2.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const copy = () => {
    const clipboard = typeof navigator === "object" ? navigator.clipboard : void 0;
    if (!clipboard || typeof clipboard.writeText !== "function") return;
    Promise.resolve(clipboard.writeText(props.value)).then(() => {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    }).catch(() => void 0);
  };
  return h(
    "button",
    {
      type: "button",
      className: "mcp-btn mcp-btn--icon mcp-btn--sm",
      title: copied ? props.copiedLabel : props.label,
      "aria-label": copied ? props.copiedLabel : props.label,
      onClick: copy
    },
    h(Glyph, { name: copied ? "check" : "copy", size: 14 })
  );
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
var state = { connections: [], loading: true, error: "", loadedAt: 0, storePath: "", homeSource: "" };
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
    state.storePath = body.storePath || "";
    state.homeSource = body.homeSource || "";
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
  const [, setTick] = React3.useState(0);
  React3.useEffect(() => {
    const listener = () => setTick((value) => value + 1);
    subscribers.add(listener);
    if (state.loadedAt === 0) refreshState();
    return () => subscribers.delete(listener);
  }, []);
  return state;
}
var h2 = React3.createElement;
var STATUS_KEY = { ready: "card.status.ready", connecting: "card.status.connecting", refreshing: "card.status.refreshing", reconnecting: "card.status.reconnecting", error: "card.status.error", needs_auth: "card.status.needs_auth", disabled: "card.status.disabled" };
var statusText = (status) => STATUS_KEY[status] ? tr(STATUS_KEY[status]) : status;
var transportLabel = (transport) => transport === "stdio" ? "stdio" : transport === "sse" ? "SSE" : "HTTP";
function endpointOf(connection) {
  if (connection.transport === "stdio") {
    const args = connection.args || [];
    const line = [connection.command, ...args].filter((part) => part !== "").join(" ");
    return line || tr("card.noUrl");
  }
  return connection.url || tr("card.noUrl");
}
function authSummary(connection) {
  const auth = connection.auth || {};
  if (auth.mode === "oauth") {
    const mode = auth.clientMode === "cimd" ? " \xB7 " + tr("card.auth.cimd") : auth.clientMode === "manual" ? " \xB7 " + tr("card.auth.manual") : "";
    return "OAuth 2.0" + mode;
  }
  if (auth.mode === "api") {
    const count = (auth.params || []).filter((param) => param.hasValue).length;
    return count > 0 ? tr("card.auth.params", { count }) : tr("card.auth.noParams");
  }
  return tr("editor.auth.none");
}
function Field(props) {
  const reactId = React3.useId();
  const id = props.id || reactId;
  return h2(
    "div",
    { className: "mcp-field" },
    h2("label", { className: "mcp-label", htmlFor: id }, props.label),
    props.kind === "select" ? h2(
      "div",
      { className: "mcp-select-wrap" },
      h2(
        "select",
        { id, className: "mcp-select", value: props.value, onChange: (event) => props.onChange(event.target.value) },
        (props.options || []).map((option) => h2("option", { key: option.value, value: option.value }, option.label))
      )
    ) : h2("input", {
      id,
      className: "mcp-input",
      value: props.value,
      placeholder: props.placeholder || "",
      onChange: (event) => props.onChange(event.target.value),
      type: props.type || "text",
      autoComplete: "off",
      spellCheck: false
    })
  );
}
function TextArea(props) {
  const reactId = React3.useId();
  const id = props.id || reactId;
  return h2(
    "div",
    { className: "mcp-field" },
    props.label ? h2("label", { className: "mcp-label", htmlFor: id }, props.label) : null,
    h2("textarea", {
      id,
      className: "mcp-textarea",
      "aria-label": props.ariaLabel,
      value: props.value,
      placeholder: props.placeholder || "",
      onChange: (event) => props.onChange(event.target.value),
      spellCheck: false
    })
  );
}
function Group(props) {
  return h2("fieldset", { className: "mcp-group" }, h2("legend", { className: "mcp-group-title" }, props.title), props.children);
}
function ConnectionEditor(props) {
  const connection = props.connection;
  const isNew = !connection;
  const [draft, setDraft] = React3.useState(
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
  const [busy, setBusy] = React3.useState("");
  const [error, setError] = React3.useState("");
  const [testResult, setTestResult] = React3.useState(null);
  const set = (patch) => setDraft((current) => ({ ...current, ...patch }));
  React3.useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") props.onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [props.onDone]);
  const missingKey = () => {
    if (draft.transport === "stdio") return draft.command.trim() === "" ? "editor.error.command" : "";
    return draft.url.trim() === "" ? "editor.error.url" : "";
  };
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
  const persist = async () => {
    const body = payload();
    if (draft.id) return api("/connections/" + encodeURIComponent(draft.id), { method: "PUT", body: JSON.stringify(body) });
    return api("/connections", { method: "POST", body: JSON.stringify(body) });
  };
  const save = async () => {
    const missing = missingKey();
    if (missing !== "") {
      setError(tr(missing));
      return;
    }
    setBusy("save");
    setError("");
    try {
      await persist();
      await refreshState();
      props.onDone();
    } catch (error2) {
      setError(error2.message || String(error2));
    } finally {
      setBusy("");
    }
  };
  const test = async () => {
    const missing = missingKey();
    if (missing !== "") {
      setError(tr(missing));
      return;
    }
    setBusy("test");
    setError("");
    setTestResult(null);
    try {
      let id = draft.id;
      if (!id) {
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
  return h2(
    "section",
    { className: "mcp-editor", "aria-label": isNew ? tr("editor.title.new") : tr("editor.title.edit", { name: connection.name }) },
    h2(
      "header",
      { className: "mcp-editor-head" },
      h2("h2", { className: "mcp-editor-title" }, isNew ? tr("editor.title.new") : tr("editor.title.edit", { name: connection.name })),
      h2(
        "button",
        { type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", style: { marginLeft: "auto" }, title: tr("common.close"), "aria-label": tr("common.close"), onClick: props.onDone },
        h2(Glyph, { name: "close" })
      )
    ),
    h2(
      "div",
      { className: "mcp-editor-body" },
      h2(
        Group,
        { title: tr("editor.section.main") },
        h2(
          "div",
          { className: "mcp-grid-2" },
          h2(Field, { label: tr("editor.name"), value: draft.name, placeholder: tr("editor.name.ph"), onChange: (value) => set({ name: value }) }),
          h2(Field, {
            label: tr("editor.transport"),
            kind: "select",
            value: draft.transport,
            options: [
              { value: "http", label: "Streamable HTTP" },
              { value: "sse", label: "SSE" },
              { value: "stdio", label: tr("editor.transport.stdio") }
            ],
            onChange: (value) => set({ transport: value })
          })
        ),
        draft.transport === "stdio" ? h2(
          "div",
          { className: "mcp-stack" },
          h2(
            "div",
            { className: "mcp-grid-2" },
            h2(Field, { label: tr("editor.command"), value: draft.command, placeholder: "npx", onChange: (value) => set({ command: value }) }),
            h2(Field, { label: tr("editor.cwd"), value: draft.cwd, placeholder: "/opt/mcp", onChange: (value) => set({ cwd: value }) })
          ),
          h2(TextArea, { label: tr("editor.args"), value: draft.argsText, placeholder: "-y\n@modelcontextprotocol/server-everything", onChange: (value) => set({ argsText: value }) }),
          h2(TextArea, { label: tr("editor.env"), value: draft.envText, placeholder: "API_KEY=xxx", onChange: (value) => set({ envText: value }) })
        ) : h2(Field, { label: tr("editor.url"), value: draft.url, placeholder: "https://mcp.example.com/mcp", onChange: (value) => set({ url: value }) }),
        h2(Field, { label: tr("editor.note"), value: draft.note, onChange: (value) => set({ note: value }) })
      ),
      h2(
        Group,
        { title: tr("editor.section.auth") },
        h2(Field, {
          label: tr("editor.auth.mode"),
          kind: "select",
          value: draft.authMode,
          options: [
            { value: "none", label: tr("editor.auth.none") },
            { value: "api", label: tr("editor.auth.api") },
            { value: "oauth", label: tr("editor.auth.oauth") }
          ],
          onChange: (value) => set({ authMode: value })
        }),
        draft.authMode === "api" ? h2(
          "div",
          { className: "mcp-params" },
          draft.params.length === 0 ? h2("div", { className: "mcp-hint" }, tr("editor.params.empty")) : null,
          draft.params.map(
            (param, index) => h2(
              "div",
              { key: index, className: "mcp-param" },
              h2(
                "div",
                { className: "mcp-select-wrap" },
                h2(
                  "select",
                  {
                    className: "mcp-select",
                    "aria-label": tr("editor.params.in"),
                    value: param.in,
                    onChange: (event) => {
                      const next = draft.params.slice();
                      next[index] = { ...param, in: event.target.value };
                      set({ params: next });
                    }
                  },
                  h2("option", { value: "header" }, "Header"),
                  h2("option", { value: "query" }, "Query"),
                  h2("option", { value: "body" }, "Body")
                )
              ),
              h2("input", {
                className: "mcp-input",
                "aria-label": tr("editor.params.name"),
                value: param.name,
                placeholder: tr("editor.params.name"),
                onChange: (event) => {
                  const next = draft.params.slice();
                  next[index] = { ...param, name: event.target.value };
                  set({ params: next });
                }
              }),
              h2("input", {
                className: "mcp-input mcp-param-value",
                "aria-label": tr("editor.params.value"),
                value: param.value,
                placeholder: tr("editor.params.value"),
                type: "password",
                autoComplete: "off",
                onChange: (event) => {
                  const next = draft.params.slice();
                  next[index] = { ...param, value: event.target.value };
                  set({ params: next });
                }
              }),
              h2(
                "button",
                { type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", title: tr("common.delete"), "aria-label": tr("common.delete"), onClick: () => set({ params: draft.params.filter((_, at) => at !== index) }) },
                h2(Glyph, { name: "trash" })
              )
            )
          ),
          h2(
            "button",
            { type: "button", className: "mcp-btn mcp-btn--secondary mcp-btn--sm", style: { justifySelf: "start" }, onClick: () => set({ params: draft.params.concat([{ in: "header", name: "", value: "" }]) }) },
            h2(Glyph, { name: "plus" }),
            tr("editor.params.add")
          ),
          h2("div", { className: "mcp-hint" }, tr("editor.params.secret"))
        ) : null,
        draft.authMode === "oauth" ? h2(
          "div",
          { className: "mcp-field" },
          h2(Field, { label: tr("editor.scope"), value: draft.scopes, placeholder: tr("editor.scope.ph"), onChange: (value) => set({ scopes: value }) }),
          h2(Field, {
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
          draft.clientMode === "cimd" ? h2("div", { className: "mcp-hint" }, tr("editor.cimd.hint", { url: window.location.origin + "/api/mcp-apps/oauth/client-metadata.json" })) : null,
          draft.clientMode === "manual" ? h2(Field, { label: tr("editor.clientId"), value: draft.clientId, placeholder: tr("editor.clientId.ph"), onChange: (value) => set({ clientId: value }) }) : null,
          draft.clientMode === "manual" ? h2(Field, { label: tr("editor.clientSecret"), value: draft.clientSecret, type: "password", placeholder: tr("editor.clientSecret.ph"), onChange: (value) => set({ clientSecret: value }) }) : null,
          h2("div", { className: "mcp-hint" }, tr("editor.oauth.hint"))
        ) : null
      ),
      h2(
        Group,
        { title: tr("editor.section.options") },
        h2(Switch, { checked: draft.enabled, label: tr("editor.enable"), onChange: (value) => set({ enabled: value }) }),
        h2("div", { className: "mcp-hint" }, tr("editor.enableHint"))
      )
    ),
    error ? h2("div", { className: "mcp-alert", role: "alert" }, error) : null,
    testResult ? testResult.ok ? h2(
      "div",
      { className: "mcp-alert mcp-alert--ok", role: "status" },
      h2("div", null, tr("editor.test.ok", { count: (testResult.tools || []).length })),
      h2(
        "div",
        { className: "mcp-stats", style: { marginTop: "4px", gap: "4px" } },
        (testResult.tools || []).slice(0, 40).map((tool) => h2("span", { key: tool.name, className: "mcp-chip" }, h2("code", null, tool.name), tool.resourceUri ? " ui://" : null))
      )
    ) : h2("div", { className: "mcp-alert", role: "alert" }, tr("editor.test.error", { message: testResult.error })) : null,
    h2(
      "footer",
      { className: "mcp-editor-foot" },
      h2("span", { className: "mcp-hint" }, tr("editor.hint.test")),
      h2(
        "button",
        { type: "button", className: "mcp-btn mcp-btn--secondary", disabled: busy !== "", onClick: test },
        h2(Glyph, { name: "check" }),
        busy === "test" ? tr("common.testing") : tr("editor.test")
      ),
      h2("button", { type: "button", className: "mcp-btn mcp-btn--primary", disabled: busy !== "", onClick: save }, busy === "save" ? tr("common.saving") : isNew ? tr("editor.save") : tr("common.save")),
      h2("button", { type: "button", className: "mcp-btn mcp-btn--ghost", onClick: props.onDone }, tr("common.cancel"))
    )
  );
}
function ConnectionCard(props) {
  const connection = props.connection;
  const [busy, setBusy] = React3.useState("");
  const [error, setError] = React3.useState("");
  const [feedback, setFeedback] = React3.useState("");
  const [confirming, setConfirming] = React3.useState(false);
  const run = async (label, action) => {
    setBusy(label);
    setError("");
    setFeedback("");
    try {
      const result = await action();
      await refreshState();
      if (result && Array.isArray(result.tools)) setFeedback(tr("editor.test.ok", { count: result.tools.length }));
      return result;
    } catch (error2) {
      setError(error2.message || String(error2));
    } finally {
      setBusy("");
    }
  };
  const status = connection.status || (connection.enabled ? "connecting" : "disabled");
  const toolTotal = (connection.tools || []).length;
  const oauthMode = connection.auth && connection.auth.mode === "oauth";
  const authorized = !!(connection.auth && connection.auth.oauth && connection.auth.oauth.authorized);
  const authorize = async () => {
    setBusy("auth");
    setError("");
    setFeedback("");
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
  return h2(
    "article",
    { className: "mcp-card" + (connection.enabled ? "" : " mcp-card--off") },
    h2(
      "div",
      { className: "mcp-card-head" },
      h2("span", { className: "mcp-status", "data-state": status, "aria-hidden": true }),
      h2("h2", { className: "mcp-card-name" }, connection.name),
      h2("span", { className: "mcp-chip" }, transportLabel(connection.transport)),
      toolTotal > 0 ? h2(
        "button",
        { type: "button", className: "mcp-chip mcp-chip--action", title: tr("tools.title"), onClick: () => props.onTools(connection) },
        tr("card.tools", { count: toolTotal }),
        h2(Glyph, { name: "chevron" })
      ) : null,
      oauthMode ? h2("span", { className: authorized ? "mcp-chip mcp-chip--ok" : "mcp-chip mcp-chip--warn" }, authorized ? tr("card.auth.authorized") : tr("card.auth.unauthorized")) : null,
      h2("span", { className: "mcp-card-status" }, statusText(status)),
      h2(
        "div",
        { className: "mcp-card-tools" },
        h2(
          "button",
          { type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", title: tr("common.edit"), "aria-label": tr("common.edit"), onClick: () => props.onEdit(connection) },
          h2(Glyph, { name: "edit" })
        ),
        h2(
          "button",
          {
            type: "button",
            className: "mcp-btn mcp-btn--icon mcp-btn--sm",
            title: tr("common.test"),
            "aria-label": tr("common.test"),
            disabled: busy !== "",
            "aria-busy": busy === "test",
            onClick: () => void run("test", () => api("/connections/" + encodeURIComponent(connection.id) + "/test", { method: "POST", body: "{}" }))
          },
          busy === "test" ? h2(Spinner) : h2(Glyph, { name: "check" })
        ),
        h2(
          "button",
          {
            type: "button",
            className: "mcp-btn mcp-btn--icon mcp-btn--sm",
            title: tr("card.refresh"),
            "aria-label": tr("card.refresh"),
            disabled: busy !== "" || !connection.enabled,
            "aria-busy": busy === "refresh",
            onClick: () => void run("refresh", async () => {
              await api("/connections/" + encodeURIComponent(connection.id) + "/refresh", { method: "POST", body: "{}" });
              setFeedback(tr("card.refreshed"));
              return void 0;
            })
          },
          busy === "refresh" ? h2(Spinner) : h2(Glyph, { name: "refresh" })
        ),
        h2(
          Menu,
          { label: tr("card.menu.more") },
          oauthMode && authorized ? h2(MenuItem, {
            icon: "refresh",
            disabled: busy !== "",
            onSelect: () => void run("oauth-reset", () => api("/connections/" + encodeURIComponent(connection.id) + "/oauth-reset", { method: "POST", body: "{}" }))
          }, tr("card.auth.reset")) : null,
          h2(
            MenuItem,
            {
              icon: "trash",
              danger: true,
              disabled: busy !== "",
              onSelect: () => setConfirming(true)
            },
            tr("common.delete")
          )
        ),
        h2(Switch, {
          hideLabel: true,
          checked: connection.enabled,
          disabled: busy !== "",
          label: tr("card.enableTools"),
          onChange: (next) => void run(
            "toggle",
            () => api("/connections/" + encodeURIComponent(connection.id) + "/enabled", {
              method: "POST",
              body: JSON.stringify({ enabled: next })
            })
          )
        })
      )
    ),
    h2(
      "div",
      { className: "mcp-card-meta" },
      h2(
        "span",
        { className: "mcp-endpoint" },
        h2("code", { title: endpointOf(connection) }, endpointOf(connection)),
        h2(CopyButton, { value: endpointOf(connection), label: tr("card.copy"), copiedLabel: tr("card.copied") })
      ),
      h2("span", { className: "mcp-meta-sep" }, "\xB7"),
      h2("span", null, authSummary(connection)),
      connection.enabled && connection.lastListedAt ? h2("span", { className: "mcp-meta-sep mcp-meta-time" }, "\xB7") : null,
      connection.enabled && connection.lastListedAt ? h2("span", { className: "mcp-meta-time" }, tr("card.listedAt", { time: new Date(connection.lastListedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })) : null
    ),
    connection.note ? h2("p", { className: "mcp-note" }, connection.note) : null,
    error ? h2("div", { className: "mcp-alert", role: "alert" }, error) : null,
    feedback ? h2("div", { className: "mcp-alert mcp-alert--ok", role: "status" }, feedback) : null,
    !error && connection.status === "error" && connection.error ? h2("div", { className: "mcp-alert", role: "alert" }, connection.error) : null,
    confirming ? h2(
      "div",
      { className: "mcp-alert", role: "alert" },
      h2("span", { style: { flex: 1 } }, tr("card.delete.confirm", { name: connection.name })),
      h2(
        "button",
        {
          type: "button",
          className: "mcp-btn mcp-btn--danger mcp-btn--sm",
          disabled: busy !== "",
          onClick: () => void run("delete", () => api("/connections/" + encodeURIComponent(connection.id), { method: "DELETE" }))
        },
        tr("common.delete")
      ),
      h2("button", { type: "button", className: "mcp-btn mcp-btn--ghost mcp-btn--sm", onClick: () => setConfirming(false) }, tr("common.cancel"))
    ) : null,
    oauthMode ? h2(
      "div",
      { className: "mcp-card-actions" },
      h2(
        "button",
        { type: "button", className: authorized ? "mcp-btn mcp-btn--secondary mcp-btn--sm" : "mcp-btn mcp-btn--primary mcp-btn--sm", disabled: busy !== "", onClick: authorize },
        busy === "auth" ? tr("card.auth.waiting") : authorized ? tr("card.auth.reauthorize") : tr("card.auth.login")
      )
    ) : null
  );
}
var GROUP_PAGE = 50;
var SEARCH_FROM = 8;
function ToolRow(props) {
  const tool = props.tool;
  const description = tool.description || "";
  return h2(
    "li",
    { className: "mcp-tool" },
    h2(
      "div",
      { className: "mcp-tool-line" },
      h2("code", { className: "mcp-tool-name" }, tool.name),
      tool.destructive ? h2("span", { className: "mcp-chip mcp-chip--warn" }, tr("tools.destructive")) : null,
      tool.resourceUri ? h2("span", { className: "mcp-chip" }, "ui://") : null,
      h2("span", { className: "mcp-tool-copy" }, h2(CopyButton, { value: props.publicName, label: tr("tools.copyName"), copiedLabel: tr("card.copied") }))
    ),
    tool.title ? h2("p", { className: "mcp-tool-title" }, tool.title) : null,
    description ? h2("p", { className: "mcp-tool-desc", title: description.length > 220 ? description : void 0 }, description) : null
  );
}
function ToolsCard(props) {
  const connection = props.connection;
  const tools = connection.tools || [];
  const status = connection.status || (connection.enabled ? "connecting" : "disabled");
  const [query, setQuery] = React3.useState("");
  const [showAll, setShowAll] = React3.useState({});
  const [busy, setBusy] = React3.useState(false);
  const [error, setError] = React3.useState("");
  const searchRef = React3.useRef(null);
  React3.useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") props.onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [props.onClose]);
  React3.useEffect(() => {
    if (searchRef.current) searchRef.current.focus();
  }, []);
  const needle = query.trim().toLowerCase();
  const matches = (tool) => needle === "" || [tool.name, tool.title, tool.description].some((value) => String(value || "").toLowerCase().includes(needle));
  const grouped = { read: [], write: [], unknown: [] };
  for (const tool of tools) (grouped[tool.access] || grouped.unknown).push(tool);
  for (const list of Object.values(grouped)) list.sort((left, right) => String(left.name).localeCompare(String(right.name)));
  const refresh = async () => {
    setBusy(true);
    setError("");
    try {
      await api("/connections/" + encodeURIComponent(connection.id) + "/refresh", { method: "POST", body: "{}" });
      await refreshState();
    } catch (failure) {
      setError(failure.message || String(failure));
    } finally {
      setBusy(false);
    }
  };
  const staleLine = () => {
    if (status === "disabled") return tr("tools.disabled");
    if (status === "reconnecting") return tr("tools.reconnecting");
    if (status === "connecting" || status === "refreshing") return tr("tools.connecting");
    if (status === "error") return tr("tools.error.empty");
    if (status === "needs_auth") return tr("tools.auth");
    return "";
  };
  const emptyLine = () => {
    if (status === "disabled") return tr("tools.disabled.empty");
    if (status === "reconnecting") return tr("tools.reconnecting");
    if (status === "connecting" || status === "refreshing") return tr("tools.connecting");
    if (status === "needs_auth") return tr("tools.auth");
    if (status === "error") return tr("tools.error.empty");
    if (connection.lastListedAt) return tr("tools.none");
    return tr("tools.neverListed");
  };
  const annotated = tools.filter((tool) => tool.accessSource === "annotation").length;
  const sourceNote = annotated === tools.length ? tr("tools.source.annotation") : annotated === 0 ? tr("tools.source.heuristic") : tr("tools.source.mixed");
  const visible = tools.filter(matches);
  const renderGroup = (key) => {
    const list = grouped[key].filter(matches);
    if (list.length === 0) return null;
    const shown = showAll[key] ? list : list.slice(0, GROUP_PAGE);
    const headingId = "mcp-tool-group-" + key;
    return h2(
      "section",
      { key, className: "mcp-tool-group", "aria-labelledby": headingId },
      h2(
        "h3",
        { className: "mcp-tool-group-title", id: headingId },
        tr("tools.group." + key),
        " ",
        h2("span", { className: "mcp-tool-group-count" }, list.length)
      ),
      h2(
        "ul",
        { className: "mcp-tool-list" },
        shown.map((tool) => h2(ToolRow, { key: tool.name, tool, publicName: publicToolName(connection.id, tool.name) }))
      ),
      list.length > shown.length ? h2(
        "button",
        { type: "button", className: "mcp-btn mcp-btn--ghost mcp-btn--sm mcp-tools-more", onClick: () => setShowAll((current) => ({ ...current, [key]: true })) },
        tr("tools.showAll")
      ) : null
    );
  };
  return h2(
    "section",
    { className: "mcp-editor mcp-tools", "aria-labelledby": "mcp-tools-title" },
    h2(
      "header",
      { className: "mcp-editor-head" },
      h2(
        "div",
        { className: "mcp-editor-heading" },
        h2("h2", { className: "mcp-editor-title", id: "mcp-tools-title" }, tr("tools.title")),
        h2("span", { className: "mcp-tools-subject", title: connection.name }, connection.name)
      ),
      h2("span", { className: "mcp-card-status" }, statusText(status)),
      h2(
        "button",
        { type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", title: tr("common.close"), "aria-label": tr("common.close"), onClick: props.onClose },
        h2(Glyph, { name: "close" })
      )
    ),
    h2(
      "div",
      { className: "mcp-editor-body" },
      tools.length > 0 ? h2(
        "div",
        { className: "mcp-tools-summary" },
        ["read", "write", "unknown"].filter((key) => grouped[key].length > 0).map((key) => h2("span", { key, className: "mcp-chip" }, tr("tools.group." + key) + " \xB7 " + grouped[key].length))
      ) : null,
      tools.length >= SEARCH_FROM ? h2(
        "div",
        { className: "mcp-tools-search" },
        h2("input", {
          ref: searchRef,
          className: "mcp-input",
          type: "text",
          value: query,
          placeholder: tr("tools.search"),
          "aria-label": tr("tools.search"),
          onChange: (event) => setQuery(event.target.value)
        }),
        query === "" ? null : h2(
          "button",
          { type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", title: tr("tools.search.clear"), "aria-label": tr("tools.search.clear"), onClick: () => setQuery("") },
          h2(Glyph, { name: "close" })
        )
      ) : null,
      tools.length === 0 ? h2("p", { className: "mcp-tools-empty" }, emptyLine()) : visible.length === 0 ? h2("p", { className: "mcp-tools-empty" }, tr("tools.search.empty")) : h2("div", { className: "mcp-tools-groups" }, ["read", "write", "unknown"].map(renderGroup)),
      tools.length > 0 ? h2("p", { className: "mcp-hint" }, sourceNote) : null,
      connection.toolsTruncated ? h2("p", { className: "mcp-hint" }, tr("tools.truncated", { max: tools.length })) : null,
      tools.length > 0 && staleLine() !== "" ? h2("p", { className: "mcp-hint" }, staleLine()) : null,
      error ? h2("div", { className: "mcp-alert", role: "alert" }, error) : null
    ),
    h2(
      "footer",
      { className: "mcp-editor-foot" },
      connection.lastListedAt ? h2("span", { className: "mcp-hint" }, tr("card.listedAt", { time: new Date(connection.lastListedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })) : null,
      h2(
        "button",
        { type: "button", className: "mcp-btn mcp-btn--secondary mcp-btn--sm", style: { marginLeft: "auto" }, disabled: busy || !connection.enabled, onClick: () => void refresh() },
        busy ? h2(Spinner) : h2(Glyph, { name: "refresh" }),
        tr("card.refresh")
      )
    )
  );
}
function LoadingCards() {
  return h2(
    "div",
    { className: "mcp-list", role: "status", "aria-label": tr("panel.loading") },
    [0, 1, 2].map(
      (index) => h2(
        "div",
        { key: index, className: "mcp-skeleton-card", "aria-hidden": true },
        h2("div", { className: "mcp-skeleton-line mcp-skeleton-line--title" }),
        h2("div", { className: "mcp-skeleton-line mcp-skeleton-line--wide" }),
        h2("div", { className: "mcp-skeleton-line mcp-skeleton-line--short" })
      )
    )
  );
}
function EmptyState(props) {
  return h2(
    "div",
    { className: "mcp-empty" },
    h2("span", { className: "mcp-empty-icon" }, h2(Glyph, { name: "plug", size: 22 })),
    h2("h2", { className: "mcp-empty-title" }, tr("panel.empty.title")),
    h2("p", { className: "mcp-empty-text" }, tr("panel.empty.text")),
    h2(
      "div",
      { className: "mcp-empty-actions" },
      h2("button", { type: "button", className: "mcp-btn mcp-btn--primary", onClick: props.onAdd }, h2(Glyph, { name: "plus" }), tr("panel.add")),
      h2("button", { type: "button", className: "mcp-btn mcp-btn--secondary", onClick: props.onImport }, tr("panel.import.short"))
    )
  );
}
function ImportCard(props) {
  return h2(
    "section",
    { className: "mcp-editor", "aria-label": tr("panel.import.title") },
    h2(
      "header",
      { className: "mcp-editor-head" },
      h2("h2", { className: "mcp-editor-title" }, tr("panel.import.title")),
      h2(
        "button",
        { type: "button", className: "mcp-btn mcp-btn--icon mcp-btn--sm", style: { marginLeft: "auto" }, title: tr("common.close"), "aria-label": tr("common.close"), onClick: props.onCancel },
        h2(Glyph, { name: "close" })
      )
    ),
    h2(
      "div",
      { className: "mcp-editor-body" },
      h2(TextArea, {
        value: props.value,
        ariaLabel: tr("panel.import.json"),
        placeholder: '{\n  "mcpServers": {\n    "notion": { "type": "http", "url": "https://mcp.notion.com/mcp", "headers": { "Authorization": "Bearer xxx" } },\n    "local": { "command": "npx", "args": ["-y", "some-mcp"] }\n  }\n}',
        onChange: props.onChange
      }),
      props.error ? h2("div", { className: "mcp-alert", role: "alert" }, props.error) : null
    ),
    h2(
      "footer",
      { className: "mcp-editor-foot" },
      h2("span", { className: "mcp-hint" }, tr("panel.import.hint")),
      h2("button", { type: "button", className: "mcp-btn mcp-btn--primary", disabled: props.busy || props.value.trim() === "", onClick: props.onImport }, props.busy ? tr("panel.import.busy") : tr("panel.import.action")),
      h2("button", { type: "button", className: "mcp-btn mcp-btn--ghost", onClick: props.onCancel }, tr("common.cancel"))
    )
  );
}
function ConnectAppsPage() {
  useLocaleRevision();
  const view = useStore();
  const [editing, setEditing] = React3.useState(null);
  const [creating, setCreating] = React3.useState(false);
  const [importing, setImporting] = React3.useState(false);
  const [toolsFor, setToolsFor] = React3.useState(null);
  const [importText, setImportText] = React3.useState("");
  const [importError, setImportError] = React3.useState("");
  const [busy, setBusy] = React3.useState(false);
  const pageRef = React3.useRef(null);
  const scrollToTop = () => {
    if (pageRef.current) pageRef.current.scrollTop = 0;
  };
  React3.useEffect(() => {
    const onMessage = (event) => {
      if (event && event.data === "mcp-apps-oauth-done") void refreshState();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);
  const openEditor = (target) => {
    scrollToTop();
    setEditing(target);
    setCreating(!target);
    setImporting(false);
    setToolsFor(null);
  };
  const openImport = () => {
    scrollToTop();
    setImporting(true);
    setCreating(false);
    setEditing(null);
    setToolsFor(null);
  };
  const openTools = (target) => {
    scrollToTop();
    setToolsFor(target.id);
    setEditing(null);
    setCreating(false);
    setImporting(false);
  };
  const doImport = async () => {
    setBusy(true);
    setImportError("");
    try {
      await api("/import", { method: "POST", body: JSON.stringify({ json: importText }) });
      setImporting(false);
      setImportText("");
      await refreshState();
    } catch (error) {
      setImportError(error.message || String(error));
    } finally {
      setBusy(false);
    }
  };
  const connections = view.connections;
  const toolsConnection = toolsFor === null ? null : connections.find((connection) => connection.id === toolsFor) || null;
  const workingCount = connections.filter((connection) => connection.enabled && connection.status === "ready").length;
  const errorCount = connections.filter((connection) => connection.status === "error").length;
  const toolCount = connections.reduce((total, connection) => total + (connection.enabled ? connection.toolCount || 0 : 0), 0);
  return h2(
    "div",
    { className: "mcp-root mcp-page", ref: pageRef },
    h2(
      "header",
      { className: "mcp-head" },
      h2("div", { className: "mcp-head-text" }, h2("h1", { className: "mcp-title" }, panelTitle()), h2("p", { className: "mcp-intro" }, tr("panel.intro"))),
      h2(
        "div",
        { className: "mcp-head-actions" },
        !view.loading && connections.length === 0 ? null : h2("button", { type: "button", className: "mcp-btn mcp-btn--primary", onClick: () => openEditor(null) }, h2(Glyph, { name: "plus" }), tr("panel.add")),
        !view.loading && connections.length === 0 ? null : h2("button", { type: "button", className: "mcp-btn mcp-btn--secondary", onClick: openImport }, tr("panel.import.short")),
        h2(
          "button",
          { type: "button", className: "mcp-btn mcp-btn--icon", title: tr("panel.refresh"), "aria-label": tr("panel.refresh"), onClick: () => void refreshState() },
          h2(Glyph, { name: "refresh" })
        )
      )
    ),
    !view.loading && connections.length > 0 ? h2(
      "div",
      { className: "mcp-stats" },
      h2("span", { className: "mcp-chip" }, tr("panel.stats.connections", { count: connections.length })),
      h2("span", { className: workingCount > 0 ? "mcp-chip mcp-chip--ok" : "mcp-chip" }, tr("panel.stats.working", { count: workingCount })),
      toolCount > 0 ? h2("span", { className: "mcp-chip" }, tr("card.tools", { count: toolCount })) : null,
      errorCount > 0 ? h2("span", { className: "mcp-chip mcp-chip--error" }, tr("panel.stats.errors", { count: errorCount })) : null
    ) : null,
    view.error ? h2(
      "div",
      { className: "mcp-alert", role: "alert" },
      h2("span", { style: { flex: 1 } }, view.error),
      h2("button", { type: "button", className: "mcp-btn mcp-btn--secondary mcp-btn--sm", onClick: () => void refreshState() }, tr("common.retry"))
    ) : null,
    importing ? h2(ImportCard, {
      value: importText,
      error: importError,
      busy,
      onChange: setImportText,
      onImport: () => void doImport(),
      onCancel: () => setImporting(false)
    }) : null,
    creating ? h2(ConnectionEditor, { key: "new", onDone: () => setCreating(false) }) : null,
    editing ? h2(ConnectionEditor, { key: editing.id, connection: editing, onDone: () => setEditing(null) }) : null,
    toolsConnection ? h2(ToolsCard, { key: toolsConnection.id, connection: toolsConnection, onClose: () => setToolsFor(null) }) : null,
    view.error ? null : view.loading ? h2(LoadingCards) : connections.length === 0 ? h2(EmptyState, { onAdd: () => openEditor(null), onImport: openImport }) : h2(
      "div",
      { className: "mcp-list" },
      connections.map((connection) => h2(ConnectionCard, { key: connection.id, connection, onEdit: openEditor, onTools: openTools }))
    ),
    view.storePath ? h2(
      "div",
      { className: "mcp-foot" },
      h2("span", null, tr("panel.store.label")),
      h2("code", null, view.storePath),
      h2(CopyButton, { value: view.storePath, label: tr("card.copyPath"), copiedLabel: tr("card.copied") })
    ) : null
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
function hostTheme() {
  if (typeof document === "undefined") return "light";
  const body = document.body;
  if (!body) return "light";
  if (body.hasAttribute("data-ds-dark-theme")) return "dark";
  if (document.documentElement.getAttribute("data-ds-dark-theme") !== null) return "dark";
  return "light";
}
function AppCard(props) {
  const toolName = props.toolName || "";
  const minHeight = props.minHeight || 420;
  const meta = toolMeta.get(toolName);
  const connectionId = meta ? meta.connectionId : props.connectionId || "";
  const [html, setHtml] = React3.useState(null);
  const [status, setStatus] = React3.useState("idle");
  const [error, setError] = React3.useState("");
  const [height, setHeight] = React3.useState(minHeight);
  const [attempt, setAttempt] = React3.useState(0);
  const frameRef = React3.useRef(null);
  const handshakeRef = React3.useRef(false);
  const handshakeTimer = React3.useRef(null);
  React3.useEffect(() => {
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
  React3.useEffect(() => {
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
              hostInfo: { name: "dsh-plugin-mcp-apps", version: "0.9.0" },
              hostCapabilities: {},
              hostContext: { theme: hostTheme(), displayMode: "inline" }
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
    return h2("div", { className: "mcp-iframe-note" }, h2(Glyph, { name: "plug" }), tr("app.noResource"));
  }
  return h2(
    "div",
    { className: "mcp-frame" },
    error ? h2("div", { className: "mcp-alert", style: { margin: "8px" } }, error) : null,
    status === "error" ? h2(
      "div",
      { style: { padding: "0 8px 8px" } },
      h2("button", { type: "button", className: "mcp-btn mcp-btn--primary mcp-btn--sm", onClick: () => setAttempt((value) => value + 1) }, h2(Glyph, { name: "refresh" }), tr("common.retry"))
    ) : null,
    !html ? h2("div", { className: "mcp-iframe-note", style: { margin: "8px" } }, status === "loading" ? tr("app.loading") : tr("app.preparing")) : null,
    html ? h2("iframe", {
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
  const [view, setView] = React3.useState(seen || "idle");
  const [message, setMessage] = React3.useState("");
  const meta = toolMeta.get(toolName);
  const attempt = React3.useCallback(() => {
    const result = openWorkbench(toolName, callId);
    setView(result.ok ? "opened" : "failed");
    setMessage(result.ok ? "" : result.message || "");
  }, [toolName, callId]);
  React3.useEffect(() => {
    if (phase === "result") return;
    startedCalls.add(callId);
  }, [phase, callId]);
  React3.useEffect(() => {
    if (phase !== "result" || !live) return;
    const known = openState.get(callId);
    if (known) {
      setView(known);
      return;
    }
    attempt();
  }, [phase, callId, live, attempt]);
  if (phase !== "result") {
    return h2("div", { className: "mcp-iframe-note" }, h2(Glyph, { name: "plug" }), tr("workbench.preparing"));
  }
  if (view === "idle") {
    return h2(
      "div",
      { className: "mcp-iframe-note" },
      h2("span", null, tr("workbench.previousCall")),
      h2("button", { type: "button", className: "mcp-btn mcp-btn--secondary mcp-btn--sm", onClick: attempt }, tr("workbench.openRight"))
    );
  }
  if (view === "opened") {
    return h2(
      "div",
      { className: "mcp-iframe-note" },
      h2("span", { className: "mcp-workbench-title" }, tr("workbench.openedMarker")),
      h2("span", null, tr("workbench.resultHint")),
      h2("button", { type: "button", className: "mcp-btn mcp-btn--secondary mcp-btn--sm", onClick: attempt }, tr("workbench.openRight"))
    );
  }
  const text = resultText(props.block);
  return h2(
    "div",
    { className: "mcp-list" },
    h2(
      "div",
      { className: "mcp-alert", role: "alert" },
      h2("div", null, tr("workbench.failed")),
      message ? h2("div", { style: { opacity: 0.8 } }, tr("workbench.reason", { message })) : null,
      meta && meta.resourceUri ? h2("div", { style: { marginTop: "4px" } }, tr("workbench.resource", { uri: meta.resourceUri })) : null
    ),
    h2(AppCard, { toolName, minHeight: 420 }),
    text ? h2("pre", { className: "mcp-iframe-note", style: { maxHeight: "220px", overflow: "auto", margin: 0 } }, text) : null
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
  return h2(
    "div",
    { className: "mcp-root mcp-workbench" },
    h2(
      "div",
      { className: "mcp-workbench-head" },
      h2("span", { className: "mcp-workbench-title" }, meta ? meta.connectionName : tr("tool.unknown")),
      meta ? h2("span", null, "\xB7 " + meta.rawName) : null
    ),
    h2(AppCard, { key: revision2, toolName, minHeight: 560 })
  );
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
  ctx.effect(() => installStyles(), "mcp-apps: styles");
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
        return h2(
          "svg",
          { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true },
          h2("path", { d: "M9 7V3M15 7V3" }),
          h2("path", { d: "M7 7h10v4a5 5 0 0 1-10 0z" }),
          h2("path", { d: "M12 16v5" })
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
