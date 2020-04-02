const expect = require("./expect")
const Journal = require("./journal")

function Resolver(options) {
  this.options = options;
}

Resolver.prototype.newJournal = function() {
  return Journal.createJournal();
};

module.exports = Resolver;
