import type {
	IdentifierToken,
	PropertiesToken,
	TextToken,
	Token,
} from "./types";

export type RootNode = {
	type: "root";
	children: Node[];
};

export type ComponentNode = {
	type: "component";
	identifier: string;
	props: object;
	children: Node[];
};
export type PNode = {
	type: "p";
	children: Node[];
};

export type BlockNode = ComponentNode | PNode;

export type InlineNode = { type: "text"; text: string } | { type: "newline" };

export type Node = BlockNode | InlineNode;

const root = (): RootNode => ({ type: "root", children: [] });

export class Parser {
	ast: RootNode = root();
	chain: (RootNode | BlockNode)[] = [];
	tokens: Token[] = [];
	index = 0;

	parse(tokens: Token[]) {
		this.index = 0;
		this.tokens = tokens;
		this.ast = root();
		this.chain = [this.ast];
		this.nodes();
		return this.ast;
	}

	curr() {
		return this.tokens[this.index];
	}
	forward() {
		this.index++;
	}
	undo(start: number) {
		this.index = start;
	}

	match(type: Token["type"]) {
		return this.curr()?.type === type;
	}
	addChild(node: Node) {
		this.lastChain().children.push(node);
	}
	addChain(node: BlockNode) {
		this.chain.push(node);
	}
	lastChain() {
		return this.chain[this.chain.length - 1];
	}

	nodes() {
		const nesting = this.chain.length;
		while (this.index <= this.tokens.length) {
			if (this.curr() === undefined) {
				if (nesting > 1) throw Error("Unbalanced §");
				return;
			}

			if (this.match("§")) {
				if (this.lastChain().type === "p") {
					this.chain.pop();
				}
				if (this.chain.length === nesting) {
					this.chain.pop();
					this.forward();
				}
				return;
			}

			this.component();
			this.paragraph();
			this.text();
		}
	}
	component() {
		const start = this.index;

		let identifier = "";
		let props: object = {};

		if (this.match("◊")) this.forward();
		else return;

		if (this.match("identifier")) {
			identifier = (this.curr() as IdentifierToken).value;
			this.forward();
		} else {
			this.undo(start);
			return;
		}
		if (this.match("properties")) {
			props = (this.curr() as PropertiesToken).value;
			this.forward();
		}

		const node: ComponentNode = {
			type: "component",
			identifier,
			props,
			children: [],
		};
		this.addChild(node);
		if (this.match("§")) {
			this.chain.push(node);
			this.forward();

			if (this.match("newline")) {
				const p: PNode = { type: "p", children: [] };
				this.addChild(p);
				this.chain.push(p);
				this.forward();
			}

			this.nodes();
		}
	}

	paragraph() {
		if (!this.match("newline")) return;
		if (this.lastChain().type === "p") {
			this.chain.pop();
		}
		const p: PNode = { type: "p", children: [] };
		this.addChild(p);
		this.addChain(p);
		this.forward();
	}
	text() {
		if (!this.match("text")) return;
		this.addChild({ type: "text", text: (this.curr() as TextToken).value });
		this.forward();
	}
}
