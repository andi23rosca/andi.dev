import { defineConfig } from "@solidjs/start/config";
/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx";
import { blogPostsPlugin } from "./plugins/blogPostsPlugin";
import remarkFrontmatter from "remark-frontmatter";

const { default: mdx } = pkg;
export default defineConfig({
	extensions: ["mdx", "md"],
	vite: {
		plugins: [
			mdx.withImports({})({
				remarkPlugins: [remarkFrontmatter],
				jsx: true,
				jsxImportSource: "solid-js",
				providerImportSource: "solid-mdx",
			}),
			blogPostsPlugin(),
		],
	},
	server: {
		prerender: {
			crawlLinks: true,
		},
	},
});
