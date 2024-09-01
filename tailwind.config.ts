import type { Config } from "tailwindcss";

const lineHeight = {
	val: 1.2,
	unit: "rem",
};

const buildLineHeights = () => {
	const h: Record<string, string> = {};
	for (let i = 1; i <= 10; i++) {
		h[i.toString()] = `${i * lineHeight.val}${lineHeight.unit}`;
	}
	return h;
};

const buildSpacing = () => {
	const h: Record<string, string> = {};
	for (let i = 1; i <= 20; i++) {
		h[`${i}v`] = `${i * lineHeight.val}${lineHeight.unit}`;
		h[`${i}h`] = `${i}ch`;
	}
	return h;
};

const config: Config = {
	content: ["./src/**/*.{html,tsx,mdx}"],
	theme: {
		fontFamily: {
			mono: '"JetBrains Mono", monospace;',
		},
		fontWeight: {
			normal: "500",
			medium: "600",
			bold: "800",
		},
		maxWidth: {
			thread: "calc(min(80ch, round(down, 100%, 1ch)))",
		},
		lineHeight: buildLineHeights(),
		colors: {
			black: "#000000",
			"slate-50": "#f8fafc",
			"slate-100": "#f1f5f9",
			"slate-200": "#e2e8f0",
			"slate-300": "#cbd5e1",
			"slate-400": "#94a3b8",
			"slate-500": "#64748b",
			"slate-600": "#475569",
			"slate-700": "#334155",
			"slate-800": "#1e293b",
			"slate-900": "#0f172a",
			"slate-950": "#020617",
			white: "#FFFFFF",
		},
		borderWidth: {
			"2": "2px",
		},
		extend: {
			spacing: buildSpacing(),
			listStyleType: {
				square: "square",
			},
			fontSize: {
				"2v": "2rem",
			},
		},
	},
	plugins: [],
};

export default config;
