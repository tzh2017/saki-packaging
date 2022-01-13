const { match } = require("../index");

describe("match", function () {
  it("reg group match keys", function () {
    const reg = new RegExp("([0-9A-Z]{6})", 'g');
    const group = 1;
    const str = "{{ $t('123ABC') }} {{ i18n.t('ABC123') }} ";
    const expected = ["123ABC", "ABC123"];
    expect(match(reg, group, str)).toEqual(expected);
  });
});
