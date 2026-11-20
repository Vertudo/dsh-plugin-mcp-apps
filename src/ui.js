// Small view primitives shared by the panel and the workbench.
//
// The plugin builds its own buttons, switch and menu instead of importing Harness Client
// packages: a bundle that pulls `@deepseek-ai/dsh-client-ui-*` ties itself to a host
// internal that is free to move. Styling lives in `styles.css` and rides public tokens.
import * as React from "react";
import panelStyles from "./styles.css";

const h = React.createElement;

/** Marker attribute of the single style element this bundle owns. */
const STYLE_OWNER = "dsh-plugin-mcp-apps";

/**
 * Append this bundle's stylesheet once and return the disposer.
 *
 * Inline `style` objects cannot express `:hover`, `:focus-visible`, `@media` or
 * `prefers-reduced-motion`; a real stylesheet can, and one element for the whole bundle
 * keeps the DOM clean.
 * @returns cleanup that removes the element this call added.
 */
export function installStyles() {
	if (typeof document === "undefined") return () => {};
	if (document.querySelector(`style[data-dsh-plugin="${STYLE_OWNER}"]`)) return () => {};
	const style = document.createElement("style");
	style.setAttribute("data-dsh-plugin", STYLE_OWNER);
	style.textContent = panelStyles;
	document.head.appendChild(style);
	return () => {
		style.remove();
	};
}

/** Paths drawn on a 16-unit grid; stroke icons keep one weight across the panel. */
const GLYPHS = {
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

/**
 * One line icon.
 * @param props - `name` from `GLYPHS`, optional `size`.
 */
export function Glyph(props) {
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

/** Indeterminate progress mark for an action that is running. */
export function Spinner() {
	return h(
		"svg",
		{ className: "mcp-spinner", width: 14, height: 14, viewBox: "0 0 16 16", "aria-hidden": true },
		h("circle", { cx: 8, cy: 8, r: 6, fill: "none", stroke: "currentColor", strokeWidth: 2, opacity: 0.25 }),
		h("path", { d: "M14 8a6 6 0 0 0-6-6", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" })
	);
}

/**
 * Labelled two-state switch.
 * @param props - `checked`, `label`, `onChange(next)`, optional `disabled`.
 */
export function Switch(props) {
	return h(
		"label",
		{ className: "mcp-switch" + (props.hideLabel ? " mcp-switch--icon" : "") },
		h("input", {
			type: "checkbox",
			checked: props.checked,
			disabled: props.disabled === true,
			"aria-label": props.hideLabel ? props.label : undefined,
			onChange: (event) => props.onChange(event.target.checked)
		}),
		h("span", { className: "mcp-switch-track", "aria-hidden": true }, h("span", { className: "mcp-switch-thumb" })),
		props.hideLabel ? null : h("span", null, props.label)
	);
}

/**
 * Icon button that opens a small menu of secondary actions.
 * @param props - `label` for the trigger, `children` rendered as the menu items.
 */
export function Menu(props) {
	const ref = React.useRef(null);
	React.useEffect(() => {
		const node = ref.current;
		if (!node) return undefined;
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

/**
 * One row of a `Menu`.
 * @param props - `icon`, `children`, `onSelect`, optional `danger`, `disabled`.
 */
export function MenuItem(props) {
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

/**
 * Copies one string to the clipboard and confirms it briefly.
 *
 * Clipboard access can be refused (insecure origin, permission), so success is reported
 * only after the promise resolves; a refusal stays silent rather than showing a false
 * confirmation.
 * @param props - `value`, `label`, `copiedLabel`.
 */
export function CopyButton(props) {
	const [copied, setCopied] = React.useState(false);
	const timer = React.useRef(null);
	React.useEffect(() => () => {
		if (timer.current) clearTimeout(timer.current);
	}, []);
	const copy = () => {
		const clipboard = typeof navigator === "object" ? navigator.clipboard : undefined;
		if (!clipboard || typeof clipboard.writeText !== "function") return;
		Promise.resolve(clipboard.writeText(props.value))
			.then(() => {
				setCopied(true);
				if (timer.current) clearTimeout(timer.current);
				timer.current = setTimeout(() => setCopied(false), 1600);
			})
			.catch(() => undefined);
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
