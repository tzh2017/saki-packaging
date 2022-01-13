const { traverse } = require("../index");

describe("traverse", function () {
  it("scan files 1", function () {
    const dir = "./examples";
    const exts = [".vue"];
    const actual = [];
    traverse(dir, exts, actual);

    const expected = ["examples/components/index.vue"].sort();
    expect(actual.sort()).toEqual(expected);
  });

  it("scan files 2", function () {
    const dir = "./examples";
    const exts = [".js", ".vue"];
    const actual = [];
    traverse(dir, exts, actual);

    const expected = [
      "examples/index.js",
      "examples/index2.js",
      "examples/components/index.vue",
    ].sort();
    expect(actual.sort()).toEqual(expected);
  });
});
