#!/usr/bin/env node

var Command = require("./lib/command");
var Tasks = require("./lib/tasks");

var command = new Command(Tasks);

const inputArguments = process.argv.slice(2);

if (inputArguments.length == 0) {
  inputArguments.push("list")
}

command.run(inputArguments, function(err) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
});
