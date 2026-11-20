// Build the browser bundle for dsh-plugin-mcp-apps.
//
// `src/` is the source; `lib/client.js` is the artifact the DSH loader serves (the
// `dsh.client` declaration points at packages' `./client` export). The bundle must stay
// ONE self-contained file: the browser module table resolves platform seed words
// (`react`) and package factories only, so a relative import left unbundled would throw
// "missed the module table" at mount.
//
// Everything except React and `@deepseek-ai/*` is inlined. That is what lets
// `src/client.js` import `../lib/locales.js` and `./i18n.js` — the dictionary module is a
// real ESM file shared with the host half (`lib/index.js` imports `./locales.js`), and
// the browser gets its own copy through this bundle.
import { build } from 'esbuild'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

const result = await build({
  entryPoints: [join(root, 'src', 'client.js')],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  write: false,
  target: 'es2022',
  external: ['react', 'react/jsx-runtime', 'react-dom', '@deepseek-ai/*'],
  loader: { '.css': 'text' },
  define: { __DSH_PLUGIN_VERSION__: JSON.stringify(pkg.version) },
  logLevel: 'warning',
})

const core = result.outputFiles[0].text
const wrapper = `window.__ModuleLoader__.load({
	id: ${JSON.stringify(pkg.name)},
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
${core}
		return module.exports;
	}
});
`

writeFileSync(join(root, 'lib', 'client.js'), wrapper)
console.log(`built lib/client.js (${wrapper.length} bytes)`)
