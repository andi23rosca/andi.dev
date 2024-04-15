import JSON5 from "json5";
import type { Token } from "./types";

export class Lexer {
	index = 0;
	input = "";
	tokens: Token[] = [];
	textStart = 0;

	lex(input: string) {
		this.index = 0;
		this.input = input;
		this.tokens = [];
		this.textStart = 0;
		return this.tokenize();
	}

	curr() {
		return this.input[this.index];
	}
	next() {
		const ads =
			this.index >= this.input.length ? undefined : this.input[this.index + 1];
		return ads;
	}
	prev() {
		return this.index === 0 ? undefined : this.input[this.index + 1];
	}

	identifier() {
		this.forward();
		const start = this.index;

		while (
			this.next() !== "{" &&
			this.next() !== "§" &&
			this.next() !== " " &&
			this.next() !== "\n"
		) {
			this.forward();
		}

		this.tokens.push({
			type: "identifier",
			value: this.input.substring(start, this.index + 1),
		});
		this.forward();
	}

	match(token: string) {
		return this.curr() === token && this.prev() !== "\\";
	}

	properties() {
		if (!this.match("{")) return;

		const start = this.index;
		let balanced = 1;
		this.forward();

		while (balanced !== 0) {
			if (!this.next()) throw Error("Unbalanced {");

			if (this.match("{")) balanced++;
			if (this.match("}")) balanced--;
			this.forward();
		}

		this.tokens.push({
			type: "properties",
			value: JSON5.parse(this.input.substring(start, this.index)),
		});
	}

	text() {
		if (this.textStart !== this.index) {
			this.tokens.push({
				type: "text",
				value: this.input.substring(this.textStart, this.index),
			});
		}
	}
	tokenize() {
		while (this.curr()) {
			if (this.match("◊")) {
				this.text();
				this.tokens.push({ type: "◊" });
				this.identifier();
				this.properties();
				this.textStart = this.index;
				continue;
			}
			if (this.match("§")) {
				this.text();
				this.tokens.push({ type: "§" });
				this.forward();
				this.textStart = this.index;
				continue;
			}
			if (this.match("\r") && this.next() === "\n") {
				this.text();
				if (this.tokens[this.tokens.length - 1].type !== "newline") {
					this.tokens.push({ type: "newline" });
				}
				this.forward();
				this.forward();
				this.textStart = this.index;
				continue;
			}
			if (this.match("\n") || this.match("\r")) {
				this.text();
				if (this.tokens[this.tokens.length - 1].type !== "newline") {
					this.tokens.push({ type: "newline" });
				}
				this.forward();
				this.textStart = this.index;
				continue;
			}

			this.forward();
		}

		this.text();
		return this.tokens;
	}

	forward() {
		this.index++;
	}
}
