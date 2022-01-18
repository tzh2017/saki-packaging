module.exports = {
  dir: "./examples",
  exts: [".js", ".ts", ".vue", ".json"],
  reg: new RegExp(/(['"]([0-9A-Z]{6})['"])/, "g"),
  group: 2,
};
