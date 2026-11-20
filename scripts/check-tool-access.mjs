// Table check for lib/tool-access.js: one row per rule the classifier promises.
//
// This is the gate that keeps the grouping honest without a browser: the panel shows exactly
// what this function returns, so a wrong precedence here becomes a wrong label there.
import assert from 'node:assert'
import { classifyTool } from '../lib/tool-access.js'

/** [label, tool, expected access, expected source] */
const CASES = [
	['annotated read-only', { name: 'get_activity', annotations: { readOnlyHint: true } }, 'read', 'annotation'],
	['annotated writer', { name: 'list_things', annotations: { readOnlyHint: false } }, 'write', 'annotation'],
	['annotated destructive', { name: 'get_report', annotations: { destructiveHint: true } }, 'write', 'annotation'],
	['contradictory server', { name: 'do_something', annotations: { readOnlyHint: true, destructiveHint: true } }, 'write', 'annotation'],
	['no annotations, reader name', { name: 'list_health_metrics' }, 'read', 'heuristic'],
	['no annotations, writer name', { name: 'append_to_coach_memory' }, 'write', 'heuristic'],
	['prefixed writer name', { name: 'memory_add_entry' }, 'write', 'heuristic'],
	['camelCase writer', { name: 'updateStatus' }, 'write', 'heuristic'],
	['prefixed reader name', { name: 'api_get_user' }, 'read', 'heuristic'],
	['both verbs in one name', { name: 'get_or_create_goal' }, 'write', 'heuristic'],
	['unknown noun', { name: 'mystery_op' }, 'unknown', 'none'],
	['empty name', { name: '' }, 'unknown', 'none'],
	['missing name', {}, 'unknown', 'none'],
	['verb beyond the scanned prefix', { name: 'one_two_three_delete_account' }, 'unknown', 'none'],
	['annotations are not an object', { name: 'ping', annotations: null }, 'read', 'heuristic']
]

for (const [label, tool, access, source] of CASES) {
	const got = classifyTool(tool)
	assert.strictEqual(got.access, access, `${label}: access ${got.access} instead of ${access}`)
	assert.strictEqual(got.source, source, `${label}: source ${got.source} instead of ${source}`)
	assert.strictEqual(typeof got.destructive, 'boolean', `${label}: destructive is a boolean`)
}

// The destructive flag follows the annotation only: the name fallback never claims it.
assert.strictEqual(classifyTool({ name: 'delete_everything' }).destructive, false, 'a name alone does not prove destructiveness')
assert.strictEqual(classifyTool({ name: 'delete_everything', annotations: { destructiveHint: true } }).destructive, true, 'the annotation proves destructiveness')

console.log(`check-tool-access: ${CASES.length + 2} случаев — в порядке`)
