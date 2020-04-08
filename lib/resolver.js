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

Resolver.prototype.frontend = function() {
  return this.options.frontend;
};

module.exports = Resolver;
