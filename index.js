const fs = require("fs");
const path = require("path");
const { exts, reg, regSakiGroup } = require("./config");

function getFileExt(dir) {
  const index = dir.indexOf(".");
  return index < 0 ? "" : dir.substring(index);
}

function traverse(dir, list) {
  fs.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else {
      if (exts.includes(getFileExt(fullPath))) {
        list.push(fullPath);
      }
    }
  });
}

function match(str) {
  let list = [];
  let matched;
  while ((matched = reg.exec(str)) != null) {
    const saki = matched[regSakiGroup];
    list.push(saki);
  }
  return list;
}

module.exports = {
  getFileExt,
  traverse,
  match,
};
