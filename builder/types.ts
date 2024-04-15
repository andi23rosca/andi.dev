export type IdentifierToken = {
	type: "identifier";
	value: string;
};
export type TextToken = {
	type: "text";
	value: string;
};
export type PropertiesToken = { type: "properties"; value: object };
export type Token =
	| {
			type: "◊" | "§" | "newline";
	  }
	| IdentifierToken
	| TextToken
	| PropertiesToken;
