// Compares .sol files to their .sol.js counterparts,
// determines which .sol files have been updated.
var dir = require("node-dir");
var path = require("path");
var async = require("async");
var fs = require("fs");

module.exports = {
  all_contracts: function(directory, callback) {
    dir.files(directory, function(err, files) {
      if (err) return callback(err);

      files = files.filter(function(file) {
        //return path.extname(file) == ".sol" && path.basename(file)[0] != ".";
        return path.basename(file)[0] != ".";
      });

      callback(null, files);
    });
  },

  updated: function(options, callback) {
    var contracts_directory = options.contracts_directory;
    var build_directory = options.contracts_build_directory;

    this.all_contracts(contracts_directory, function(err, files) {
      var expected_build_files = files.map(function(file) {
        return path.join(build_directory, path.dirname(path.relative(contracts_directory, file)), path.basename(file) + ".js");
      });

      async.map(files, fs.stat, function(err, file_stats) {
        if (err) return callback(err);

        async.map(expected_build_files, function(build_file, finished) {
          //TODO:Possibly building the Journals here
          //Pudding.requireFile(build_file, options, function(err, contract) {
            //// Ignore errors, i.e., if the file doesn't exist.
            //finished(null, contract);
          //});
        }, function(err, contracts) {
          if (err) return callback(err);

          var updated = [];

          for (var i = 0; i < contracts.length; i++) {
            var file_stat = file_stats[i];
            var contract = contracts[i];

            if (contract == null) {
              updated.push(files[i]);
              continue;
            }

            var modified_time = (file_stat.mtime || file_stat.ctime).getTime();

            // Note that the network is already set for is in Pudding.requireFile().
            var built_time = contract.updated_at || 0;

            if (modified_time > built_time) {
              updated.push(files[i]);
            }
          }

          callback(null, updated);
        });
      });
    });
  },

  imports: function(file, from, callback) {
    if (typeof from == "function") {
      callback = from;
      from = null;
    }

    fs.readFile(file, "utf8", function(err, body) {
      if (err) {
        var msg = "Cannot find import " + path.basename(file);
        if (from) {
          msg += " from " + path.basename(from);
        }
        msg += ". If it's a relative path, ensure it starts with `./` or `../`."
        return callback(new CompileError(msg));
      }

      //console.log("Parsing " + path.basename(file) + "...");

      var imports = SolidityParser.parse(body, "imports");

      var dirname = path.dirname(file);

      imports = imports.map(function(i) {
        return path.resolve(path.join(dirname, i));
      });

      callback(null, imports);
    });
  },

  required_files: function(files, callback) {
    // Ensure full paths.
    files = files.map(function(file) {
      return path.resolve(file);
    });

    callback(null, files);

  },

};
