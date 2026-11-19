// Browser-side translator handle.
//
// Both halves of the browser code need the same translator: the left-sidebar page, the
// right-hand workbench tab, and tool rows rendered inside the host's own trees. None of
// them is guaranteed a React provider from us, so the active language lives in this module
// and `tr()` is a plain call — the same shape `dsh-bash-terminal-ts` uses, with one
// difference: resolution runs through `translate()` from `lib/locales.js` instead of
// `ctx.locale.bind`, so the plural forms and the `ru -> en` chain behave identically with
// and without the locale service.
//
// The service, when the host has it, contributes exactly two things: the active language
// (read once, then followed through `locale/change`) and the registry our dictionaries
// belong in. A host without `dsh-client-locale` keeps working — the language then comes
// from the browser and the dictionaries are already in the bundle.
import * as React from "react";
import { dictionaries, normalizeLocale, translate } from "../lib/locales.js";

/** Active language tag, mirrored from `navigator` until the locale service answers. */
let active = normalizeLocale(typeof navigator === "object" ? navigator.language : "en");

/** Bumped on every language change so `useLocaleRevision()` re-renders. */
let revision = 0;

/** Components and non-component subscribers waiting for a language change. */
const listeners = new Set();

/** The language `tr()` resolves against. */
export function currentLanguage() {
	return active;
}

/**
 * Switch the active language.
 * @param tag - language tag reported by the locale service or the browser.
 */
export function setLanguage(tag) {
	const next = normalizeLocale(tag);
	if (next === active) return;
	active = next;
	revision += 1;
	for (const listener of [...listeners]) {
		try {
			listener();
		} catch (error) {
			/* a dead subscriber must not block the rest */
		}
	}
}

/**
 * Translate one key into the active language.
 * @param key - dictionary key.
 * @param params - placeholder values; `count` selects a plural form.
 * @returns the text, or the key when the dictionary has no such entry.
 */
export function tr(key, params) {
	return translate(active, key, params);
}

/** Subscribe to language changes; returns the unsubscribe function. */
function subscribe(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

/** Language-change counter, for components that must re-render on a switch. */
export function useLocaleRevision() {
	return React.useSyncExternalStore(subscribe, () => revision, () => revision);
}

/** Every dictionary this plugin owns, for `ctx.locale.register`. */
export { dictionaries };

/** Namespace the dictionaries register under; re-exported so callers need one import. */
export { NAMESPACE } from "../lib/locales.js";
