const bootstrap = require("./bootstrap");

module.exports = Journal => ({
  configureNetwork() {
    console.log("Configureing... not set")
  },

  new() {
    //if (!this.bytecode || this.bytecode === "0x") {
      //throw new Error(
        //`${
          //this.contractName
        //} error: contract binary not set. Can't deploy new instance.\n` +
          //`This contract may be abstract, not implement an abstract parent's methods completely\n` +
          //`or not invoke an inherited contract's constructor correctly\n`
      //);
    //}

    //var constructorABI = this.abi.filter(i => i.type === "constructor")[0];

    //return execute.deploy.call(this, constructorABI)(...arguments);
  },

  defaults(class_defaults) {
    if (this.class_defaults == null) {
      this.class_defaults = {};
    }

    if (class_defaults == null) {
      class_defaults = {};
    }

    Object.keys(class_defaults).forEach(key => {
      const value = class_defaults[key];
      this.class_defaults[key] = value;
    });

    return this.class_defaults;
  },

  hasNetwork(network_id) {
    //return this._json.networks[`${network_id}`] != null;
    return true;
  },

  isDeployed() {
    return false;
  },

  //setNetwork(network_id) {
    //if (!network_id) return;
    //this.network_id = `${network_id}`;
  //},

  clone(json) {
    json = json || {};

    const temp = function TruffleContract() {
      this.constructor = temp;
      return Contract.apply(this, arguments);
    };

    temp.prototype = Object.create(this.prototype);

    let network_id;

    // If we have a network id passed
    if (typeof json !== "object") {
      network_id = json;
      json = this._json;
    }

    json = utils.merge({}, this._json || {}, json);

    temp._constructorMethods = this._constructorMethods;
    temp._properties = this._properties;

    temp._property_values = {};
    temp._json = json;

    bootstrap(temp);

    temp.class_defaults = temp.prototype.defaults || {};

    if (network_id) {
      temp.setNetwork(network_id);
    }

    if (this.currentProvider) {
      temp.configureNetwork({
        provider: this.currentProvider,
        networkType: this.networkType
      });
    }

    // Copy over custom key/values to the contract class
    Object.keys(json).forEach(key => {
      if (key.indexOf("x-") !== 0) return;
      temp[key] = json[key];
    });

    return temp;
  },

  addProp(key, fn) {
    const getter = () => {
      if (fn.get != null) {
        return fn.get.call(this);
      }

      return this._property_values[key] || fn.call(this);
    };

    const setter = val => {
      if (fn.set != null) {
        fn.set.call(this, val);
        return;
      }

      // If there's not a setter, then the property is immutable.
      throw new Error(`${key} property is immutable`);
    };

    const definition = {};
    definition.enumerable = false;
    definition.configurable = false;
    definition.get = getter;
    definition.set = setter;

    Object.defineProperty(this, key, definition);
  },

  toJSON() {
    return this._json;
  },

});
