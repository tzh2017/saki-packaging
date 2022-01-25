const { scan } = require("../index");
const config = require("./config");

describe("scan", function () {
  it("config", function () {
    const actual = scan(config);
    const expected = ["ABCDEF", "1314A0", "ABCD19", "ABCD18", "ABCABC"];
    expect(actual).toEqual(expected);
  });
});
