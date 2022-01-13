const { readFile } = require("../index");

describe("readFile", function () {
  it(".js", function () {
    const dir = "./examples/index2.js";
    const expected = `const i18n = {
  t(key) {
    return key;
  },
};
const saki = i18n.t("ABCABC");
`;
    expect(readFile(dir)).toEqual(expected);
  });
});
