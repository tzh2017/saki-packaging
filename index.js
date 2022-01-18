const fs = require("fs");
const path = require("path");
const config = require("./config");

function getFilepaths(dir, exts, list) {
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
  const result = [];
  traverse(dir, exts, result);
  return result;
}

function getFileExt(dir) {
  const index = dir.indexOf(".");
  return index < 0 ? "" : dir.substring(index);
}

function readFile(dir) {
  return fs.readFileSync(dir, "utf8");
}

function match(reg, group, str) {
  let list = [];
  let matched;
  while ((matched = reg.exec(str)) != null) {
    const key = matched[group];
    list.push(key);
  }
  return list;
}

function scan({ dir, exts, reg, group, log }) {
  const map = {};

  const fileList = getFilepaths(dir, exts);
  log && console.log(`扫描到${fileList.length}个文件`);

  fileList.forEach((file) => {
    log && console.log(file);
    const str = readFile(file);
    const list = match(reg, group, str);
    log && console.log(list);

    list.forEach((key) => (map[key] = ""));
  });

  log && console.log(map);
  return map;
}

async function fetchLang(lang) {
  const url = `https://dkprod-api.bipocloud.com/services/grappa/dicts/file/${lang}`;
  const { data } = await got(url).json();
  return JSON.parse(data);
}

module.exports = {
  getFilepaths,
  getFileExt,
  readFile,
  match,
  scan,
  fetchLang,
};
