import type { Plugin } from "vite";
import { readSync } from "to-vfile";
import { matter } from "vfile-matter";
import { resolve, join } from "node:path";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { exec } from "node:child_process";

const processFiles = () => {
	const outputFile = resolve("src/data/posts.json");
	const blogDir = resolve("src/routes/blog");
	const files = readdirSync(blogDir);
	const blogPosts = files
		.filter(
			(file) => statSync(join(blogDir, file)).isFile() && file.endsWith(".mdx"),
		)
		.map((file) => {
			const f = readSync(resolve("src/routes/blog", file));
			matter(f);
			return {
				...(f.data.matter as object),
				slug: file.replace(".mdx", ""),
			} as { date: string; slug: string };
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	writeFileSync(outputFile, JSON.stringify(blogPosts, null, 2), "utf-8");

	exec("npx @biomejs/biome format --write ./src/data/posts.json");
};

export const blogPostsPlugin = (): Plugin => {
	return {
		name: "blog-posts-gen",
		buildEnd() {
			processFiles();
		},
		configureServer(server) {
			server.watcher.on("change", (filePath) => {
				if (
					!filePath.includes("/src/routes/blog") &&
					!filePath.includes("blogPostsPlugin.ts")
				)
					return;

				processFiles();
			});
		},
	};
};
