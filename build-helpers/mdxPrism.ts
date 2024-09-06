import { visit } from "unist-util-visit";
import { toString as nodeToString } from "hast-util-to-string";
import { refractor } from "refractor";
import tsx from "refractor/lang/tsx.js";

refractor.register(tsx);

export const mdxPrism = () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (tree: any) => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		visit(tree, "element" as any, visitor);
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function visitor(node: any, index: number | undefined, parent: any) {
		// if (parent.type === "root") {
		// 	// node.value += '\nimport { ToC } from "~/components/Markdown"';

		// 	console.log("zzz", JSON.stringify([parent.children[0]], null, 2));
		// 	return;
		// }

		// Table of contents stuff, unrelated to mdxPrism but I'm too lazy to move it to a new plugin
		if (
			parent.type === "root" &&
			node.tagName === "h2" &&
			node.children?.[0]?.type === "text" &&
			node.children?.[0]?.value === "Contents"
		) {
			const tocList = parent.children[(index || 0) + 2];

			const newNode = {
				type: "mdxJsxFlowElement",
				name: "ToC",
				children: [node, { type: "text", value: "\n" }, tocList],
			};

			parent.children.splice(index, 3, newNode);
			return;
		}

		if (parent.type !== "mdxJsxFlowElement") {
			return;
		}

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const attrs = parent.attributes.reduce((a: any, c: any) => {
			if (c.type === "mdxJsxAttribute") {
				a[c.name] = c.value;
			}
			return a;
		}, {});

		const lang = attrs.lang;
		if (!lang) {
			return;
		}

		const result = refractor.highlight(nodeToString(node), lang);

		node.children = result.children;
	}
};
