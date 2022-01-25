const fs = require("fs");
const path = require("path");
const config = require("./config");
const fetch = require("node-fetch-commonjs");

function getFilepaths(dir, exts, excludePaths) {
  const excludes = (excludePaths || []).map((e) => new RegExp(e));
  function isExcluded(path) {
    return excludes.some((reg) => reg.test(path));
  }

  function traverse(dir, exts, list) {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);

      if (isExcluded(fullPath)) {
        return;
      }
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

function scan(config) {
  const result = [];

  const fileList = getFilepaths(config.dir, config.exts, config.excludePaths);
  config.log && console.log(`扫描到${fileList.length}个文件`);

  fileList.forEach((file) => {
    config.log && console.log(file);
    const str = readFile(file);
    const list = match(config.reg, config.group, str);
    config.log && console.log(list);

    result.push(...list);
  });
  return result;
}

async function fetchLang(lang) {
  const url = `https://dkprod-api.bipocloud.com/services/grappa/dicts/file/${lang}`;
  const res = await fetch(url);
  const data = await res.json();
  return JSON.parse(data.data);
}

async function fetchLangs(langs) {
  return Promise.all(langs.map((lang) => fetchLang(lang)));
}

function getLocals(list, remotes) {
  const locals = remotes.map((_) => ({}));
  for (const key of list) {
    for (let index = 0; index < remotes.length; index++) {
      const remote = remotes[index];
      const value = remote[key];
      value && (locals[index][key] = value);
    }
  }
  return locals;
}

function deleteDir(dir) {
  let files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    let newPath = path.join(dir, files[i]);
    let stat = fs.statSync(newPath);
    if (stat.isDirectory()) {
      removeDir(newPath);
    } else {
      fs.unlinkSync(newPath);
    }
  }
  fs.rmdirSync(dir);
}

function writeFiles(langs, remotes) {
  deleteDir("./dist");
  fs.mkdirSync("./dist");
  langs.forEach((lang, i) => {
    const path = `./dist/${lang}.json`;
    const json = JSON.stringify(remotes[i], null, 4);
    fs.writeFileSync(path, json, "utf-8");
  });
}

async function main() {
  const langs = config.langs;
  const remotes = await fetchLangs(langs);
  const list = scan(config);
  const locals = getLocals(list, remotes);
  writeFiles(langs, locals);
}

module.exports = {
  getFilepaths,
  getFileExt,
  readFile,
  match,
  scan,
  fetchLang,
  fetchLangs,
  main,
};
