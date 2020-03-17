var async = require("async");
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");
var Compiler = require("./compiler");
var expect = require("./expect");

var Journals = {
  // all: Boolean. Compile all sources found. Defaults to true. If false, will compare sources against built files
  //      in the build directory to see what needs to be compiled.
  // quiet: Boolean. Suppress output. Defaults to false.
  // strict: Boolean. Return compiler warnings as errors. Defaults to false.
  compile: function(options, callback) {
    var self = this;

    expect.options(options, [
      "network",
    ]);

    function finished(err, journals) {
      if (err) return callback(err);

      if (journals != null && Object.keys(journals).length > 0) {
        //Here was where the contracts were saved when compiled
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

}

module.exports = Journals;
