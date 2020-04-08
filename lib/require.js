var fs = require("fs");
var path = require("path");
var Module = require('module');
var vm = require('vm');
var expect = require("./expect");
var Resolver = require("./resolver");
const matter = require('gray-matter');

// options.file: path to file to execute. Must be a module that exports a function.
// options.args: arguments passed to the exported function within file. If a callback
//   is not included in args, exported function is treated as synchronous.
// options.context: Object containing any global variables you'd like set when this
//   function is run.

var Require = {
  file: function(options, done) {
    var self = this;
    var file = options.file;

    fs.readFile(options.file, {encoding: "utf8"}, function(err, source) {
      if (err) return done(err);

      fileWithFrontend = matter(source)
      options.frontend = fileWithFrontend.data
      options.args[0].frontend = options.frontend
      options.args[0].content = fileWithFrontend.content

      // Modified from here: https://gist.github.com/anatoliychakkaev/1599423
      var m = new Module(file);

      // Provide all the globals listed here: https://nodejs.org/api/globals.html
      var context = {
        Buffer: Buffer,
        __dirname: path.dirname(file),
        __filename: file,
        clearImmediate: clearImmediate,
        clearInterval: clearInterval,
        clearTimeout: clearTimeout,
        console: console,
        exports: exports,
        Yurnell: new Resolver(options),
        global: global,
        module: m,
        process: process,
        require: function(pkgPath) {
          // Ugh. Simulate a full require function for the file.
          pkgPath = pkgPath.trim();

          // If absolute, just require.
          if (path.isAbsolute(pkgPath)) {
            return require(pkgPath);
          }

          // If relative, it's relative to the file.
          if (pkgPath[0] == ".") {
            return require(path.join(path.dirname(file), pkgPath));
          } else {
            // Not absolute, not relative, must be a locally installed modules.
            // Here we have to require from the node_modules directory directly.
            var moduleDir = path.join(path.dirname(file), "node_modules");
            try {
              return require(path.join(moduleDir, pkgPath));
            } catch (e) {
              // Shave off path we added so the error message looks like normal.
              e.message = e.message.replace(moduleDir + "/", "");
              throw e;
            }
          }
        },
        setImmediate: setImmediate,
        setInterval: setInterval,
        setTimeout: setTimeout,
      };

      // Now add contract names.
      Object.keys(options.context || {}).forEach(function(key) {
        context[key] = options.context[key];
      });

      var old_cwd = process.cwd();

      process.chdir(path.dirname(file));

      var script = vm.createScript(fileWithFrontend.content, file);
      script.runInNewContext(context);

      process.chdir(old_cwd);

      done(null, m.exports);
    });
  },

};

module.exports = Require;
