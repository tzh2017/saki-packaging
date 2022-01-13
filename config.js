module.exports = {
  dir: "./examples",
  exts: [".js", ".ts", ".vue", ".json"],
  reg: new RegExp(/(i18n\.t|\$t)\(['"]([0-9A-Z]{6})['"]\)/, "g"),
  regSakiGroup: 2,
};
