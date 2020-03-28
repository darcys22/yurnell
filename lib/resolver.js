const expect = require("./expect")
const YurnellJournal = require("./journal")

function Resolver(options) {
  this.options = options;
  this.journalConstructor = YurnellJournal();
  this.journalConstructor.configureNetwork();
}

Resolver.prototype.newJournal = function() {
  return journal;
};

module.exports = Resolver;
