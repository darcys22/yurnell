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

  set frontend(frontend) {
    this._frontend = frontend;
  }

  get frontend() {
    return this._frontend;
  }

  set content(content) {
    this._content = content;
    console.log(content)
  }

  get content() {
    return this._content;
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
      await self._preFlightCheck(journal);

      let shouldDeploy = true;

      const lineitems = journal._lineItems.map(li => {
          return {
            accountname: li.account,
            description: li.particulars,
            amount: li.amount,
          }
      })
  

      // Case: deploy:
      if (shouldDeploy) {
        self.client.AddTransaction({
          date: journal.date, 
          description: journal.description, 
          lines: lineitems, 
          signature: ""
        }, function(err, response) {
          console.log('Transaction Response:', response.message);
          return response.message
        });
      }

      return "";
    };
  }

	async _preFlightCheck(journal) {
		// Check that journal is valid
    if (!journal.valid()) {
      throw new Error("Invalid Journal");
    }

    // Check network
    await this.client.nodeVersion({message: "test"}, function(err, response) {
      if (err) {
        throw new Error(err)
      }
      if(!response.message){
        throw new Error("Invalid connection")
      };
    });
  }

  deploy() {
    const args = Array.prototype.slice.call(arguments);
    const journal = args.shift();

    return this.queueOrExec(this.executeDeployment(journal, args, this));
  }

  queueOrExec(fn) {
    new Promise(accept => accept()).then(fn)
  }

}

module.exports = Deployer;
