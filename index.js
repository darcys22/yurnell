var pkg = require("./package.json");

module.exports = {
  config: require("./lib/config"),
  migrate: require("./lib/migrate"),
  version: pkg.version
};
