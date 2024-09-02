const o = {
  name: "My cool object",
  isItCool: true,
  howCool: 100,
};
const jayson = "grab name";
const query = (json, input) => {
  const [keyword, ...properties] = input.split(/, |,| /);
  if (keyword !== "grab") throw Error("Invalid jayson syntax.");

  const aggregate = {};

  for (const propertyPath of properties) {
    const nested = propertyPath.split(".");
    let result = json;
    for (const property of nested) {
      result = result[property];
    }
    aggregate[propertyPath] = result;
  }

  return aggregate;
};
query(o, jayson);
