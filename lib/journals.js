var async = require("async");
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");
//var Pudding = require("ether-pudding");
//var Web3 = require("web3");
var expect = require("./expect");

var Journals = {
  provision: function(options, callback) {
    var self = this;
    var logger = options.logger || console;
    //var web3 = new Web3();
    //web3.setProvider(options.provider);

    //Pudding.requireAll({
      //source_directory: options.contracts_build_directory,
      //provider: options.provider
    //}, function(err, contracts) {
      //if (err) return callback(err);

      //web3.eth.getAccounts(function(err, accounts) {
        //if (err) return callback(err);

        //// Add contracts to context and prepare contracts.
        //contracts.forEach(function(contract) {
          //// Set defaults based on configuration.
          //contract.defaults({
            //from: options.from || accounts[0],
            //gas: options.gas,
            //gasPrice: options.gasPrice
          //});

          //if (options.network_id) {
            //contract.setNetwork(options.network_id);
          //}
        //});

        //callback(null, contracts);
      //});
    //});
  },

}

module.exports = Journals;
