const expect = require("./expect")
const Journal = require("./journal")

function Resolver(options) {
  this.options = options;
}

Resolver.prototype.newJournal = function() {
  return Journal.createJournal();
};

Resolver.prototype.newLineItem = function() {
  return Journal.createLineItem();
};

module.exports = Resolver;
