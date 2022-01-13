const fs = require("fs");
const path = require("path");
const { reg, regSakiGroup } = require("./config");

module.exports.traverse = function (dir, list) {
  fs.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else {
      list.push(fullPath);
    }
  });
};

module.exports.match = function (str) {
  let list = [];
  let matched;
  while ((matched = reg.exec(str)) != null) {
    const saki = matched[regSakiGroup];
    list.push(saki);
  }
  return list;
};
