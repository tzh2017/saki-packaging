const { getFilepaths } = require("../index");

describe("getFilepaths", function () {
  it("scan files 1", function () {
    const dir = "./examples/components";
    const exts = [".vue"];
    const actual = getFilepaths(dir, exts);
    const expected = ["examples/components/index.vue"].sort();
    expect(actual.sort()).toEqual(expected);
  });

  it("scan files 2", function () {
    const dir = "./examples";
    const exts = [".js", ".vue"];
    const excludePaths = ["node_modules"];
    const actual = getFilepaths(dir, exts, excludePaths);
    const expected = [
      "examples/index.js",
      "examples/index2.js",
      "examples/components/index.vue",
      "examples/components/index.js",
    ].sort();
    expect(actual.sort()).toEqual(expected);
  });
});
