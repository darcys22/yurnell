#!/usr/bin/env node

var Command = require("./lib/command");
var Tasks = require("./lib/tasks");

var command = new Command(Tasks);
command.run(process.argv.slice(2), function(err) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
});
