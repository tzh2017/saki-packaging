const { traverse } = require("../index");

describe("traverse", function () {
  it("scan file", function () {
    const dir = "./examples";
    const actual = [];
    traverse(dir, actual);
    expect(actual).toEqual(["examples/index.js"]);
  });
});
