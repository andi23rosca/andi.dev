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

		if (lang === null) {
			return;
		}
		const result = refractor.highlight(nodeToString(node), lang);

		node.children = result.children;
	}
};
