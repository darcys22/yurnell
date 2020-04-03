const expect = require("./expect");

var PROTO_PATH = __dirname + '/transaction.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
         longs: String,
         enums: String,
         defaults: true,
         oneofs: true
        });
var transaction_proto = grpc.loadPackageDefinition(packageDefinition).transaction;

class Deployer {
  constructor(options) {
    options = options || {};
    //expect.options(options, ["provider", "networks", "network", "network_id"]);
    
    this.network = options.network || 'localhost:50051';
    this.client = new transaction_proto.Transactor(this.network, grpc.credentials.createInsecure());

    this.logger = options.logger || { log: function() {} };
  }


  // ------------------------------------ Methods --------------------------------------------------
  /**
   *
   * @param  {Object} journal   Journal instance
   * @param  {Array}  args      Constructor arguments
   * @return {Promise}          Resolves an instance
   */
  executeDeployment(journal, args) {
    const self = this;

    return async function() {
      await self._preFlightCheck(contract);

      let instance;
      let eventArgs;
      let shouldDeploy = true;

      const newArgs = await Promise.all(args);

      // Case: deploy:
      if (shouldDeploy) {
      }

      // Finish: Ensure the address and tx-hash are set on the contract.
      //contract.address = instance.address;
      //contract.transactionHash = instance.transactionHash;
      return instance;
    };
  }

	async _preFlightCheck(journal) {
		// Check that journal is valid
    if (!journal.valid) {
      throw new Error("Invalid Journal");
    }

    // Check network
    //await contract.detectNetwork();
  }

  deploy() {
    const args = Array.prototype.slice.call(arguments);
    const journal = args.shift();

    return this.queueOrExec(this.executeDeployment(journal, args, this));
  }

  then(fn) {
    return this.queueOrExec(function() {
      return fn(this);
    });
  }

  queueOrExec(fn) {
    new Promise(accept => accept()).then(fn)
  }

}

module.exports = Deployer;
