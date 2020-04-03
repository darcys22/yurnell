var fs = require("fs");
var _ = require("lodash");
var path = require("path");
var requireNoCache = require("./require-nocache");
var findUp = require("find-up");

const DEFAULT_CONFIG_FILENAME = "yurnell-config.js";

function Config(yurnell_directory, working_directory, network) {
  var self = this;

  this._values = {
    yurnell_directory: yurnell_directory || path.resolve(path.join(__dirname, "../")),
    working_directory: working_directory || process.cwd(),
  };

  var props = {
    // These are already set.
    yurnell_directory: function() {},
    working_directory: function() {},

    network: function() {
      return 'localhost:50051'
    },
  };

  Object.keys(props).forEach(function(prop) {
    self.addProp(prop, props[prop]);
  });
};

Config.prototype.addProp = function(key, default_getter) {
  Object.defineProperty(this, key, {
    get: function() {
      return this._values[key] || default_getter();
    },
    set: function(val) {
      this._values[key] = val;
    },
    configurable: true,
    enumerable: true
  });
};

Config.prototype.with = function(obj) {
  return _.extend({}, this, obj);
};

Config.prototype.merge = function(obj) {
  return _.extend(this, obj);
};

// Helper function for expecting paths to exist.
Config.expect = function(expected_path, description, extra, callback) {
  if (typeof description == "function") {
    callback = description;
    description = "file";
    extra = "";
  }

  if (typeof extra == "function") {
    callback = extra;
    extra = "";
  }

  if (description == null) {
    description = "file";
  }

  if (extra == null) {
    extra = "";
  }

  if (!fs.existsSync(expected_path)) {
    var display_path = expected_path.replace(this.working_dir, "./");
    var error = new ConfigurationError("Couldn't find " + description + " at " + display_path + ". " + extra);

    if (callback != null) {
      callback(error);
      return false;
    } else {
      throw error;
    }
  }
  return true;
}

Config.default = function() {
  return new Config();
};

Config.detect = function(options, filename) {
  if (filename == null) {
    filename = DEFAULT_CONFIG_FILENAME;
  }

  var file = findUp.sync(filename);

  if (file == null) {
    throw new ConfigurationError("Could not find suitable configuration file.");
  }

  return this.load(file, options);
};

Config.load = function(file, options) {
  var config = new Config();

  config.working_directory = path.dirname(path.resolve(file));

  var static_config = requireNoCache(file);

  return _.merge(config, static_config, options);
};

module.exports = Config;
