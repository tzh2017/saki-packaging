const { match } = require("../index");

describe("match", function () {
  it("$t", function () {
    const str = "{{ $t('123ABC') }} {{ i18n.t('ABC123') }} ";
    expect(match(str)).toEqual(["123ABC", "ABC123"]);
  });

  it("i18n.t", function () {
    const str = " return i18n.t('123ABC');\n i18n.t('ABC123') ";
    expect(match(str)).toEqual(["123ABC", "ABC123"]);
  });
});
