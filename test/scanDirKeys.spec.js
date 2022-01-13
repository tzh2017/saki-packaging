const { scanDirKeys } = require("../index");
const config = require("./config");

describe("scanDirKeys", function () {
  it("config", function () {
    const actual = scanDirKeys(config);
    const expected = ["ABCDEF", "1314A0", "ABCD19", "ABCD18", "ABCABC"].sort();
    expect(Array.from(actual).sort()).toEqual(expected);
  });
});
