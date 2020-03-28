const execute = require("../execute");
const bootstrap = require("./bootstrap");
const constructorMethods = require("./constructorMethods");
const properties = require("./properties");

(function(module) {
  // Creates the Journal Object
  function Journal() {
    var instance = this;
    var constructor = instance.constructor;

    // Core:
    instance.methods = {};

    // sendTransaction / send
    //instance.sendTransaction = execute.send.call(
      //constructor,
      //null,
      //null,
      //instance.address
    //);

  }

  Journal._constructorMethods = constructorMethods(Journal);

  // Getter functions are scoped to Journal object.
  Journal._properties = properties;

  bootstrap(Journal);
  module.exports = Journal;

  return Journal;
})(module || {});
