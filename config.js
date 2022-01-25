module.exports = {
  dir: "/Users/chris/Works/daisy",
  exts: [".js", ".ts", ".vue", ".json"],
  excludePaths: ["node_modules", "uni_modules"],
  reg: new RegExp(/(['"]([0-9A-Z]{6})['"])/, "g"),
  group: 2,
  log: true,
  langs: ["zh", "en", "zht"],
};
