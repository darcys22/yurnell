var expect = require("./expect");
var path = require("path");

var Actions = {
  deploy: function(contract, args, deployer) {
    return function() {
      var prefix = "Deploying ";
      if (contract.address != null) {
        prefix = "Replacing ";
      }

      deployer.logger.log(prefix + contract.contract_name + "...");

      // Evaluate any arguments if they're promises
      return Promise.all(args).then(function(new_args) {
        return contract.new.apply(contract, new_args);
      }).then(function(instance) {
        deployer.logger.log(contract.contract_name + ": " + instance.address);
        contract.address = instance.address;
      });
    };
  },

  new: function(contract, args, deployer) {
    return function() {
      self.logger.log("Creating new instance of " + contract.contract_name);
      // Evaluate any arguments if they're promises
      return Promise.all(args).then(function(new_args) {
        return contract.new.apply(contract, args)
      });
    };
  },

  exec: function(file, deployer) {
    return function() {
      if (path.isAbsolute(file) == false) {
        file = path.resolve(path.join(deployer.basePath, file));
      }

      deployer.logger.log("Running " + file + "...");
      // Evaluate any arguments if they're promises
      return new Promise(function(accept, reject) {
        Require.exec({
          file: file,
          contracts: Object.keys(deployer.known_contracts).map(function(key) {
            return deployer.known_contracts[key];
          }),
          network: deployer.network,
          network_id: deployer.network_id,
          provider: deployer.provider
        }, function(err) {
          if (err) return reject(err);
          accept();
        });
      });
    };
  }
};

function Deployer(options) {
  var self = this;
  options = options || {};

  expect.options(options, [
    "network",
  ]);

  this.logger = options.logger || console;
  if (options.quiet) {
    this.logger = {log: function() {}};
  }
  this.known_contracts = {};
  (options.contracts || []).forEach(function(contract) {
    self.known_contracts[contract.contract_name] = contract;
  });
  this.network = options.network;
  this.network_id = options.network_id;
  this.provider = options.provider;
  this.basePath = options.basePath || process.cwd();
};

Deployer.prototype.deploy = function() {
  var args = Array.prototype.slice.call(arguments);
  var contract = args.shift();

  //if (Array.isArray(contract)) {
    //return this.queueOrExec(Actions.deployAndLinkMany(contract, this));
  //} else {
    //return this.queueOrExec(Actions.deployAndLink(contract, args, this));
  //}
};

Deployer.prototype.new = function() {
  var args = Array.prototype.slice.call(arguments);
  var contract = args.shift();

  return this.queueOrExec(Actions.new(contract, args, this));
};

Deployer.prototype.exec = function(file) {
  return this.queueOrExec(Actions.exec(file, this));
};

Deployer.prototype.then = function(fn) {
  var self = this;

  return this.queueOrExec(function() {
    self.logger.log("Running step...");
    return fn();
  });
};

Deployer.prototype.queueOrExec = function(fn) {
  var self = this;

  if (this.chain.started == true) {
    return new Promise(function(accept, reject) {
      accept();
    }).then(fn);
  } else {
    return this.chain.then(fn);
  }
};

module.exports = Deployer;
