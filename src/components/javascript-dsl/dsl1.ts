const o = {
	name: "My cool object",
	isItCool: true,
	howCool: 100,
};
const jayson = "grab name";
const query = (obj: Record<string, unknown>, input: string) => {
	const [keyword, property] = input.split(" ");
	if (keyword !== "grab") throw Error("Invalid jayson syntax.");
	return obj[property];
};
query(o, jayson);
