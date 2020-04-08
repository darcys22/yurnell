var fs = require("fs");
var dir = require("node-dir");
var path = require("path");
var Require = require("./require");
var Deployer = require("./deployer");
var async = require("async");
var expect = require("./expect");
const yaml = require('js-yaml');

function Migration(file) {
  this.file = path.resolve(file);
  this.number = parseInt(path.basename(file));
};

Migration.prototype.run = function(options, callback) {
  var self = this;
  var logger = options.logger || console;

  if (options.quiet) {
    logger = {
      log: function() {}
    }
  };
  
  logger.log("Running migration: " + path.relative(options.working_directory, this.file));

  // Initial context.
  //
  var context = {
  };

  var deployer = new Deployer({
    logger: {
      log: function(msg) {
        logger.log("  " + msg);
      }
    },
    network: options.network,
    basePath: path.dirname(this.file),
    file: this.file
  });

  var finish = function(err) {
    callback();
  };

  // Here the individual file is actually sent to be run as a script in a nodejs VM
  Require.file({
    file: self.file,
    context: context,
    args: [deployer]
  }, function(err, fn) {
    if (!fn || !fn.length || fn.length == 0) {
      return callback(new Error("Migration " + self.file + " invalid or does not pass any parameter to deploy"));
    }
    fn(deployer, options.network);
    strFileUpdated = '---\n'
    strFileUpdated += yaml.safeDump(deployer.frontend, {
      'styles': {
          '!!null': 'canonical' // dump null as ~
        },
      'sortKeys': true        // sort object keys
    });
    strFileUpdated += "---\n"
    strFileUpdated += deployer.content
    fs.truncate(this.file, 0, function() {
      fs.writeFile(this.file, strFileUpdated, function (err) {
        if (err) {
          return console.log("Error writing file: " + err);
        }
      });
    });
    finish();
  });
};

var Migrate = {
  Migration: Migration,

  //Assemble goes through the directory and collects the files and sorts them by the prefixes
  assemble: function(options, callback) {
    dir.files(options.working_directory, function(err, files) {
      if (err) return callback(err);

      var migrations = files.map(function(file) {
        return new Migration(file, options.network);
      });

      // Filter out the NaN numbers
      migrations = migrations.filter(function (migration) {
          return migration.number;
      });

      // Make sure to sort the prefixes as numbers and not strings.
      migrations = migrations.sort(function(a, b) {
        if (a.number > b.number) {
          return 1;
        } else if (a.number < b.number) {
          return -1;
        }
        return 0;
      });

      callback(null, migrations);
    });
  },

  run: function(options, callback) {
    var self = this;

    //expect.options(options, [
      //"network",
    //]);

    if (options.reset == true) {
      return this.runAll(options, callback);
    }

    self.runAll(options,callback);

  },

  runFrom: function(number, options, callback) {
    var self = this;
    this.assemble(options, function(err, migrations) {
      if (err) return callback(err);

      while (migrations.length > 0) {
        if (migrations[0].number >= number) {
          break;
        }

        migrations.shift();
      }

      self.runMigrations(migrations, options, callback);
    });
  },

  runAll: function(options, callback) {
    var self = this;
    this.assemble(options, function(err, migrations) {
      if (err) return callback(err);

      self.runMigrations(migrations, options, callback);
    });
  },

  runMigrations: function(migrations, options, callback) {

	async.eachSeries(migrations, function(migration, finished) {
		migration.run(options, function(err) {
			if (err) return finished(err);
			finished();
		});
	}, callback);
  }

};

module.exports = Migrate;
