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
assert.ok(bundle.includes(pkg.version), 'the bundle carries the manifest version')

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

// 6) The plugin card: an icon the host can resolve through its documented seat, within
// the size the reader enforces, and a real image rather than a renamed text file.
import { existsSync, statSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve } from 'node:path'

const inside = (path) => {
  const rel = relative('.', resolve(path))
  return rel !== '' && !rel.startsWith('..') && !isAbsolute(rel)
}
const ICON_LIMIT = 256 * 1024
const iconPath = pkg.icon ?? pkg.exports?.['./icon']
assert.ok(typeof iconPath === 'string', 'package.json declares an icon (icon field or ./icon export)')
assert.ok(inside(iconPath), 'the icon stays inside the package')
assert.ok(existsSync(iconPath), `the icon exists: ${iconPath}`)
const iconBytes = readFileSync(iconPath)
assert.ok(statSync(iconPath).size <= ICON_LIMIT, `the icon is at most 256 KiB: ${iconBytes.length}`)
const iconHead = iconBytes.subarray(0, 64)
assert.ok(
  iconHead.toString('utf8').trimStart().startsWith('<svg') ||
    iconHead.subarray(1, 4).toString('ascii') === 'PNG' ||
    iconHead.subarray(0, 2).toString('hex') === 'ffd8' ||
    iconHead.subarray(0, 4).toString('ascii') === 'RIFF',
  'the icon is SVG, PNG, JPEG or WebP'
)

// 7) The detail page: a declared document exists, carries exactly one image, and that
// image is a self-contained graphic the detail page can render without a network.
const IMAGE_LIMIT = 5 * 1024 * 1024
const IMAGE_LINE = /^\s*!\[[^\]]*\]\(([^)\s]+)\)\s*$/
for (const name of locales) {
  const meta = JSON.parse(readFileSync(`locale/${name}`, 'utf8')).meta ?? {}
  if (meta.detail === undefined) continue
  assert.ok(typeof meta.detail === 'string' && meta.detail.endsWith('.md'), `locale/${name}: meta.detail is a markdown path`)
  assert.ok(inside(meta.detail), `locale/${name}: meta.detail stays inside the package`)
  assert.ok(existsSync(meta.detail), `locale/${name}: meta.detail exists: ${meta.detail}`)
  const lines = readFileSync(meta.detail, 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')
  assert.strictEqual(lines.length, 1, `locale/${name}: ${meta.detail} holds exactly one image line`)
  const image = IMAGE_LINE.exec(lines[0])
  assert.ok(image !== null, `locale/${name}: ${meta.detail} is an image line`)
  const imagePath = resolve(dirname(meta.detail), image[1])
  assert.ok(inside(imagePath), `locale/${name}: the preview image stays inside the package`)
  assert.ok(existsSync(imagePath), `locale/${name}: the preview image exists: ${imagePath}`)
  const preview = readFileSync(imagePath)
  assert.ok(preview.length <= IMAGE_LIMIT, `locale/${name}: the preview image fits 5 MiB`)
  const text = preview.toString('utf8')
  if (text.trimStart().startsWith('<svg')) {
    for (const banned of ['<script', '<foreignObject', '<animate', 'javascript:', '<image', 'url(http', 'href="http']) {
      assert.ok(!text.includes(banned), `the preview SVG carries no ${banned}`)
    }
    assert.ok(/viewBox="0 0 640 300"/.test(text), 'the preview SVG uses the 640x300 canvas')
  }
}

// 8) Packaging: the published tarball would carry the card resources.
assert.ok(pkg.exports?.['./icon'] !== undefined, 'package exports ./icon')
assert.ok(pkg.exports?.['./locale/*.json'] !== undefined, 'package exports ./locale/*.json')
for (const entry of ['icon.svg', 'docs', 'locale']) {
  assert.ok(pkg.files.includes(entry), `package files include ${entry}`)
}

console.log(`check-artifacts: бандл ${pkg.name}@${pkg.version}, ${locales.length} карточек, иконка и превью на месте`)
