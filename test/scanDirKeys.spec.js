const { scanDirKeys } = require("../index");

describe("scanDirKeys", function () {
  it("default", function () {
    const dir = "./examples";
    const actual = scanDirKeys(dir);
    const expected = ["ABCDEF", "1314A0", "ABCD19", "ABCD18", "ABCABC"].sort();
    expect(Array.from(actual).sort()).toEqual(expected);
  });
});
