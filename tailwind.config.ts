import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{html,tsx,mdx}"],
	theme: {
		extend: {
			spacing: {
				"1px": "1px",
				"2px": "2px",
				"3px": "3px",
			},
		},
	},
	plugins: [],
};

export default config;
