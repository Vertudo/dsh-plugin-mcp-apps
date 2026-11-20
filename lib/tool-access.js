// Which side of the data one MCP tool touches: read, write, or neither provably.
//
// A server may describe its tools in `annotations`; nothing requires it to, and most do not.
// The fallback therefore matters as much as the explicit case, and it lives here — one
// module, one table, so the connection catalog, the test probe and the checks cannot drift
// apart.
//
// Precedence, first match wins:
//   1. `destructiveHint: true`   -> write, destructive. This beats `readOnlyHint: true`:
//      a server that says both contradicts itself, and the dangerous reading is the safe one.
//   2. `readOnlyHint: true`      -> read.
//   3. `readOnlyHint: false`     -> write.
//   4. A known verb in the NAME  -> that side.
//   5. Otherwise                 -> unknown.
//
// The specification's defaults (`readOnlyHint: false`, `destructiveHint: true`) are NOT
// applied on purpose: with no annotations they would label every tool a writer, and the
// panel would lie with confidence instead of saying "not determined".
//
// The name is the only fallback signal: descriptions are marketing prose and generic across
// tools. A verb found anywhere in the first NAME_TOKENS tokens counts, so prefixed names
// (`memory_add_entry`, `goal_delete`) still classify; when a read and a write verb meet in
// one name, write wins, because mislabelling a mutator as read-only is the costly mistake.

/** How many leading tokens of a tool name the verb scan looks at. */
const NAME_TOKENS = 3;

/** Verbs that only fetch, compute or render something the server already has. */
const READ_VERBS = new Set([
	"get",
	"list",
	"search",
	"find",
	"read",
	"fetch",
	"query",
	"describe",
	"show",
	"view",
	"status",
	"health",
	"info",
	"lookup",
	"count",
	"check",
	"diff",
	"preview",
	"export",
	"download",
	"validate",
	"whoami",
	"ping",
	"help"
]);

/** Verbs that can create, change or remove server state. */
const WRITE_VERBS = new Set([
	"create",
	"add",
	"update",
	"set",
	"put",
	"patch",
	"delete",
	"remove",
	"drop",
	"destroy",
	"write",
	"append",
	"save",
	"upsert",
	"insert",
	"edit",
	"modify",
	"replace",
	"rename",
	"move",
	"upload",
	"post",
	"send",
	"execute",
	"run",
	"invoke",
	"call",
	"trigger",
	"start",
	"stop",
	"restart",
	"enable",
	"disable",
	"grant",
	"revoke",
	"import",
	"publish",
	"submit",
	"cancel",
	"clear",
	"reset",
	"purge",
	"archive",
	"merge",
	"assign",
	"mark",
	"apply",
	"approve",
	"reject",
	"deploy",
	"install",
	"uninstall"
]);

/**
 * Split a tool name into lowercase words, keeping camelCase boundaries.
 * @param name - raw MCP tool name.
 * @returns the words, punctuation and separators dropped.
 */
function nameWords(name) {
	return String(name ?? "")
		.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
		.split(/[^A-Za-z0-9]+/)
		.map((word) => word.toLowerCase())
		.filter((word) => word !== "");
}

/**
 * Decide which group one tool belongs to.
 * @param tool - a tool as the MCP server listed it; `annotations` may be missing.
 * @returns `access` (`read` | `write` | `unknown`), the `source` that decided it
 *   (`annotation` | `heuristic` | `none`) and whether the server calls it destructive.
 */
export function classifyTool(tool) {
	const annotations = tool?.annotations && typeof tool.annotations === "object" ? tool.annotations : {};
	if (annotations.destructiveHint === true) return { access: "write", source: "annotation", destructive: true };
	if (annotations.readOnlyHint === true) return { access: "read", source: "annotation", destructive: false };
	if (annotations.readOnlyHint === false) return { access: "write", source: "annotation", destructive: false };
	const words = nameWords(tool?.name).slice(0, NAME_TOKENS);
	if (words.some((word) => WRITE_VERBS.has(word))) return { access: "write", source: "heuristic", destructive: false };
	if (words.some((word) => READ_VERBS.has(word))) return { access: "read", source: "heuristic", destructive: false };
	return { access: "unknown", source: "none", destructive: false };
}
