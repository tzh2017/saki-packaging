const fs = require("fs");
const path = require("path");
const { dir, exts, reg, regSakiGroup } = require("./config");

function traverse(dir, exts, list) {
  fs.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverse(fullPath, exts, list);
    } else {
      if (exts.includes(getFileExt(fullPath))) {
        list.push(fullPath);
      }
    }
  });
}

function getFileExt(dir) {
  const index = dir.indexOf(".");
  return index < 0 ? "" : dir.substring(index);
}

function readFile(dir) {
  return fs.readFileSync(dir, "utf8");
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

function scanDirKeys(dir) {
  const fileList = [];
  traverse(dir, exts, fileList);

  const keys = new Set();
  fileList.forEach((file) => {
    const str = readFile(file);
    const list = match(str);
    list.forEach((e) => keys.add(e));
  });
  return keys;
}

module.exports = {
  traverse,
  getFileExt,
  readFile,
  match,
  scanDirKeys,
};
