import type { Plugin } from "vite";
import { readSync } from "to-vfile";
import { matter } from "vfile-matter";
import { resolve, join } from "node:path";
import { readdirSync, statSync } from "node:fs";

export const blogPostsPlugin = (): Plugin => {
	const virtualModuleId = "virtual:blog-posts";
	const resolvedVirtualModuleId = `\0${virtualModuleId}`;

	return {
		name: "blog-posts-gen",
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId;
			}
		},
		load(id) {
			if (id !== resolvedVirtualModuleId) return;

			const blogDir = resolve("src/routes/blog");
			const files = readdirSync(blogDir);
			const blogPosts = files
				.filter(
					(file) =>
						statSync(join(blogDir, file)).isFile() && file.endsWith(".mdx"),
				)
				.map((file) => {
					const f = readSync(resolve("src/routes/blog", file));
					matter(f);
					return {
						...(f.data.matter as object),
						slug: file.replace(".mdx", ""),
					} as { date: string; slug: string };
				})
				.sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
				);

			return `export const posts = ${JSON.stringify(blogPosts)};
export default {};`;
		},
	};
};
