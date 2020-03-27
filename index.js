var pkg = require("./package.json");

module.exports = {
  create: require("./lib/create"),
  config: require("./lib/config"),
  migrate: require("./lib/migrate"),
  version: pkg.version
};
