var Yurnell = require('../index.js');

var Tasks = {};

function createTask(name, description, fn) {
  Tasks[name] = function(options, done) {
    if (typeof options == "function") {
      done = options;
      options = {};
    }

    options.logger = options.logger || console;

    fn(options, done);
  };
  Tasks[name].description = description;
  Tasks[name].task_name = name;
};

createTask('list', "List all available tasks", function(options, done) {
  options.logger.log("Yurnell v" + Yurnell.version + " - a journal development framework for GoDBLedger");
  options.logger.log("");
  options.logger.log("Usage: yurnell [command] [options]");
  options.logger.log("");
  options.logger.log("Commands:");
  options.logger.log("");

  var sorted = Object.keys(Tasks).sort();

  var longestTask = sorted.reduce(function(a, b) {
    var first = typeof a == "string" ? a.length : a;
    return Math.max(first, b.length);
  });

  for (var i = 0; i < sorted.length; i++) {
    var task = Tasks[sorted[i]];
    var heading = task.task_name;
    while (heading.length < longestTask) {
      heading += " ";
    }
    options.logger.log("  " + heading + " => " + task.description)
  }

  options.logger.log("");
  done();
});

createTask('version', "Show version number and exit", function(options, done) {
  options.logger.log("Yurnell v" + Yurnell.version);
  done();
});

createTask('migrate', "Run migrations", function(options, done) {
  var config = Yurnell.config.detect(options);

  Yurnell.journals.compile(config, function(err) {
    if (err) return done(err);
    //Yurnell.migrate.run(config, done);
  });
});

module.exports = Tasks;
