#!/usr/bin/env node

var Command = require("./lib/command");
var Tasks = require("./lib/tasks");

var command = new Command(Tasks);

const inputArguments = process.argv.slice(2);
const userWantsGeneralHelp =
  (inputArguments[0] === "help" || inputArguments[0] === "--help") &&
  inputArguments.length === 1;

if (userWantsGeneralHelp) {
  inputArguments[0] === "list"
  process.exit(0);
}

command.run(inputArguments, function(err) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
});
