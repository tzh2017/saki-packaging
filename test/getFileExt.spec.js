const { getFileExt } = require("../index");

describe("getFileExt", function () {
  it(".js", function () {
    const dir = "index.js";
    expect(getFileExt(dir)).toEqual(".js");
  });
  it("empty", function () {
    const dir = "index";
    expect(getFileExt(dir)).toEqual("");
  });
});
