const expect = require("./expect")
const Journal = require("./journal")

function Resolver(options) {
  this.options = options;
}

Resolver.prototype.newJournal = function(opts) {
  return Journal.createJournal();
};

Resolver.prototype.newLineItem = function(opts) {
  return Journal.createLineItem(opts);
};

module.exports = Resolver;
