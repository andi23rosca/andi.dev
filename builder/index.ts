import { Lexer } from "./Lexer";
import {
	type PNode,
	Parser,
	type RootNode,
	type ComponentNode,
	type Node,
} from "./Parser";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import JSON5 from "json5";

const lexer = new Lexer();
const parser = new Parser();

const parseFile = (path: string) => {
	const file = readFileSync(resolve(path), "utf-8").toString();
	const ast = parser.parse(lexer.lex(file));
	console.log(JSON5.stringify(ast, null, 2));
	console.log(prettyPrint(ast));
};

const prettyPrint = (ast: RootNode) => {
	const out: string[] = [];

	const handleNodes = (nodes: Node[]) => {
		for (const c of nodes) {
			switch (c.type) {
				case "component":
					handleComponent(c);
					break;
				case "p":
					handleP(c);
					break;
				case "text":
					out.push(c.text);
					break;
				default:
					break;
			}
		}
	};
	const handleComponent = (node: ComponentNode) => {
		out.push("◊");
		out.push(node.identifier);
		const ln = Object.keys(node.props).length;
		if (ln && ln > 3) {
			out.push(JSON5.stringify(node.props, null, 2));
		} else if (ln) {
			out.push(JSON5.stringify(node.props));
		}
		if (node.children.length) {
			out.push("§");
			handleNodes(node.children);
			out.push("§");
		}
	};
	const handleP = (node: PNode) => {
		out.push("\n");
		handleNodes(node.children);
	};

	handleNodes(ast.children);
	return out.join("");
};

parseFile("builder/test.pjs");
