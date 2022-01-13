const { reg, regSakiGroup } = require("./config");

module.exports.match = function (str) {
  let list = [];
  let matched;
  while ((matched = reg.exec(str)) != null) {
    const saki = matched[regSakiGroup]
    list.push(saki);
  }
  return list;
};
