var async = require("async");
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");
var Compiler = require("./compiler");
var expect = require("./expect");

var Contracts = {
  // all: Boolean. Compile all sources found. Defaults to true. If false, will compare sources against built files
  //      in the build directory to see what needs to be compiled.
  // quiet: Boolean. Suppress output. Defaults to false.
  // strict: Boolean. Return compiler warnings as errors. Defaults to false.
  compile: function(options, callback) {
    var self = this;

    expect.options(options, [
      "network",
    ]);

    function finished(err, contracts) {
      if (err) return callback(err);

      if (contracts != null && Object.keys(contracts).length > 0) {
        self.write_contracts(contracts, options, callback);
      } else {
        callback(null, []);
      }
    };

    if (options.all === true || options.compileAll === true) {
      Compiler.compile_all(options, finished);
    } else {
      Compiler.compile_necessary(options, finished);
    }
  },

  write_contracts: function(contracts, options, callback) {
    mkdirp(options.contracts_build_directory, function(err, result) {
      if (err != null) {
        callback(err);
        return;
      }

      if (options.quiet != true && options.quietWrite != true) {
        console.log("Writing artifacts to ." + path.sep + path.relative(process.cwd(), options.contracts_build_directory));
      }

      Pudding.saveAll(contracts, options.contracts_build_directory, options).then(function() {
        callback(null, contracts);
      }).catch(callback);
    });
  }
}

module.exports = Contracts;
