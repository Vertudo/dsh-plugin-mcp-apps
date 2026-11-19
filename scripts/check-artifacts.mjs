// Artifact gates: the checks that only make sense against the BUILT bundle.
//
// `dsh-bash-terminal-ts` carries the same set, for the same reason: every one of these is a
// failure mode that ships green through a source review and then dies silently in the
// browser.
//
// - `__ModuleLoader__.load({ id })` must equal the package name, or the host never binds the
//   client half and the whole UI goes dark without an error;
// - the client bundle must carry no Node builtins (the browser has none, and a leaked
//   `node:` import is a runtime "require is not defined");
// - the bundle really carries the dictionaries, because a build that tree-shook them
//   leaves the panel showing raw keys;
// - `locale/en.json` is the anchor DSH's package-meta scan insists on, and every file in
//   that directory has to be a language id — a stray `README.json` there makes the host
//   throw while reading the plugin card.
import assert from 'node:assert'
import { readdirSync, readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const bundle = readFileSync('lib/client.js', 'utf8')
const host = readFileSync('lib/index.js', 'utf8')
const dictionaries = readFileSync('lib/locales.js', 'utf8')

// 1) The loader identity.
const id = /id:\s*"([^"]+)"/.exec(bundle)?.[1]
assert.strictEqual(id, pkg.name, 'the client bundle id equals the package name')
assert.ok(/exports\.apply|apply:\s*\(\)\s*=>\s*apply/.test(bundle) || bundle.includes('apply: () => apply'), 'the bundle exports apply')
assert.ok(/inject:\s*\(\)\s*=>\s*inject/.test(bundle), 'the bundle exports inject')

// 2) Client purity.
const leaks = ['node:crypto', 'node:stream', 'node:http', 'node:fs', 'node:path', 'node:os', 'string_decoder']
const found = leaks.filter((needle) => bundle.includes(needle))
assert.deepStrictEqual(found, [], `the client bundle must carry no Node-only module: ${found.join(', ')}`)

// 3) Dictionaries travel inside the bundle (esbuild inlined ../lib/locales.js).
for (const needle of ['host.prompt.title', 'card.status.ready', 'panel.title']) {
  assert.ok(bundle.includes(needle), `the client bundle carries the dictionary module (${needle})`)
}

// 4) Locale metadata: language-id file names, `en` present, every card text filled in.
const LANGUAGE_ID = /^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/
const locales = readdirSync('locale').filter((name) => name.endsWith('.json'))
assert.ok(locales.includes('en.json'), 'locale/en.json is the anchor the host scan reads first')
for (const name of locales) {
  const language = name.slice(0, -5)
  assert.match(language, LANGUAGE_ID, `locale/${name}: the file name must be a language id`)
  const parsed = JSON.parse(readFileSync(`locale/${name}`, 'utf8'))
  const meta = parsed.meta ?? parsed
  assert.ok(typeof meta.title === 'string' && meta.title.trim() !== '', `locale/${name} needs meta.title`)
  assert.ok(typeof meta.description === 'string' && meta.description.trim() !== '', `locale/${name} needs meta.description`)
}

// 5) The host half shares the dictionary module instead of carrying its own strings.
assert.ok(/from "\.\/locales\.js"/.test(host), 'lib/index.js imports ./locales.js')
for (const lang of Object.keys({ zh: 1, en: 1, ru: 1 })) {
  assert.ok(new RegExp(`\\nconst ${lang} = \\{`).test(dictionaries), `lib/locales.js declares ${lang}`)
}

console.log(`check-artifacts: бандл ${pkg.name}@${pkg.version}, ${locales.length} карточек, словари на месте`)
