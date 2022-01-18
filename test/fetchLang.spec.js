const { fetchLang } = require("../index");

describe("fetchLang", function () {
  it("zh", async function () {
    const actual = await fetchLang("zh");
    expect(actual != null).toEqual(true);
  });
});
