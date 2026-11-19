// i18n gates: the checks that only make sense across the whole string set.
//
// They mirror what `dsh-bash-terminal-ts` gets from the compiler by typing every language
// as `Record<keyof typeof zh, string>`: this repository has no TypeScript step, so the same
// guarantees are asserted here against the built dictionaries. A language that drifts from
// the key source, a placeholder renamed in one language, a count family without its `other`
// form, or a `tr()` call naming a key no dictionary carries — all of them fail loudly.
import { readFileSync } from 'node:fs'
import { dictionaries, labels, translate } from '../lib/locales.js'

/** `zh` carries the upstream literals, so it is the key source. */
const KEY_SOURCE = 'zh'
/** Plural families: `key.one`, `key.few`, `key.many`, `key.other`, resolved at call time. */
const PLURAL = /\.(zero|one|two|few|many|other)$/

const failures = []
const fail = (message) => failures.push(message)

/** Logical keys of one language: a plural family collapses to its base key. */
const logicalKeys = (dict) => [...new Set(Object.keys(dict).map((key) => key.replace(PLURAL, '')))].sort()

/** Variant name of a key inside its family (`''` for the bare form). */
const variantOf = (key) => (key.match(PLURAL) || [''])[0]

const source = logicalKeys(dictionaries[KEY_SOURCE])

// 1) Every language carries exactly the logical key set of the key source.
for (const [lang, dict] of Object.entries(dictionaries)) {
  if (lang === KEY_SOURCE) continue
  const keys = logicalKeys(dict)
  const missing = source.filter((key) => !keys.includes(key))
  const extra = keys.filter((key) => !source.includes(key))
  if (missing.length > 0) fail(`${lang}: нет ключей (${missing.length}): ${missing.slice(0, 5).join(', ')}`)
  if (extra.length > 0) fail(`${lang}: лишние ключи (${extra.length}): ${extra.slice(0, 5).join(', ')}`)
}

// 2) A count family needs its `other` form everywhere: that is the row every language
//    falls back to, so a translator may ship fewer categories than the key source.
for (const base of source) {
  const family = Object.keys(dictionaries[KEY_SOURCE]).filter((key) => key.replace(PLURAL, '') === base && PLURAL.test(key))
  if (family.length === 0) continue
  for (const [lang, dict] of Object.entries(dictionaries)) {
    if (dict[base] !== undefined) fail(`${lang}: ${base}: есть и голая форма, и формы числа — оставьте что-то одно`)
    if (dict[base + '.other'] === undefined) fail(`${lang}: ${base}: нет формы .other`)
  }
}

// 3) Placeholders must match within one variant, or a translation silently drops information.
const placeholders = (template) => [...String(template).matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort().join(',')
for (const base of source) {
  const variants = new Set()
  for (const dict of Object.values(dictionaries)) {
    for (const key of Object.keys(dict)) if (key.replace(PLURAL, '') === base) variants.add(variantOf(key))
  }
  for (const variant of variants) {
    const key = base + variant
    const expected = placeholders(dictionaries[KEY_SOURCE][key])
    if (expected === undefined || dictionaries[KEY_SOURCE][key] === undefined) continue
    for (const [lang, dict] of Object.entries(dictionaries)) {
      if (dict[key] === undefined) continue
      if (placeholders(dict[key]) !== expected) {
        fail(`${lang}: ${key}: подстановки ${placeholders(dict[key]) || '(нет)'} вместо ${expected || '(нет)'}`)
      }
    }
  }
}

// 4) No empty text and no invisible characters smuggled into a dictionary.
for (const [lang, dict] of Object.entries(dictionaries)) {
  for (const [key, value] of Object.entries(dict)) {
    if (typeof value !== 'string' || value.trim() === '') fail(`${lang}: ${key}: пустое значение`)
    if (/[\u200B\uFEFF]/.test(value)) fail(`${lang}: ${key}: невидимый символ (U+200B/U+FEFF)`)
  }
}

// 5) Every language has a display label for `addLanguage`.
for (const lang of Object.keys(dictionaries)) {
  if (typeof labels[lang] !== 'string' || labels[lang].trim() === '') fail(`labels: нет названия языка для ${lang}`)
}

// 6) Every literal key used by the sources exists. Prefix-built keys (`"host.error." + code`)
//    end with a dot and are covered by check 7 instead.
for (const file of ['src/client.js', 'lib/index.js']) {
  const text = readFileSync(new URL('../' + file, import.meta.url), 'utf8')
  for (const match of text.matchAll(/\b(?:tr|t)\(\s*["']([a-z][\w.]*)["']/g)) {
    const key = match[1]
    if (key.endsWith('.')) continue
    if (source.includes(key)) continue
    // A plural family is addressed by its base key: `tr('card.tools', { count })`.
    if (source.includes(key.replace(PLURAL, ''))) continue
    fail(`${file}: ссылка на несуществующий ключ: ${key}`)
  }
}

// 7) Every host error code the panel can receive resolves in every language.
const hostCodes = new Set()
for (const match of readFileSync(new URL('../lib/index.js', import.meta.url), 'utf8').matchAll(/errorOf\(\s*["'](\w+)["']/g)) hostCodes.add(match[1])
for (const code of hostCodes) {
  for (const lang of Object.keys(dictionaries)) {
    const text = translate(lang, 'host.error.' + code)
    if (text === 'host.error.' + code) fail(`${lang}: код ошибки хоста без перевода: ${code}`)
  }
}

// 8) No UI text may creep back into the sources: a literal with Cyrillic outside
//    `lib/locales.js` and `locale/` means someone skipped the dictionary. Comments are
//    stripped first, because the Chinese commentary that documents upstream bugs stays.
const stripComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')
for (const file of ['src/client.js', 'src/i18n.js', 'lib/index.js', 'lib/oauth.js', 'lib/auth.js']) {
  const code = stripComments(readFileSync(new URL('../' + file, import.meta.url), 'utf8'))
  for (const match of code.matchAll(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g)) {
    if (!/[А-Яа-яЁё]/.test(match[0])) continue
    const line = code.slice(0, match.index).split('\n').length
    fail(`${file}:${line}: русский литерал в коде — вынесите в lib/locales.js: ${match[0].slice(0, 40)}`)
  }
}

if (failures.length > 0) {
  console.error(`check-i18n: ${failures.length} замечаний`)
  for (const failure of failures) console.error(' -', failure)
  process.exit(1)
}
console.log(`check-i18n: ${source.length} ключей × ${Object.keys(dictionaries).length} языка — в порядке`)
