const expect = require("./expect")
const Journal = require("./journal")

function Resolver(options) {
  this.options = options;
}

Resolver.prototype.newJournal = function() {
  something = Journal.createJournal;
  something.test
  return something;
};

module.exports = Resolver;
