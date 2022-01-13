const { traverse } = require("../index");

describe("traverse", function () {
  it("scan files", function () {
    const dir = "./examples";
    const actual = [];
    traverse(dir, actual);
    expect(actual.sort()).toEqual(
      [
        "examples/index.js",
        "examples/index2.js",
        "examples/components/index.vue",
      ].sort()
    );
  });
});
