#!/usr/bin/env node

const Command = require("./lib/command");

const command = new Command(require("./lib/commands"));

let options = { logger: console };

const inputArguments = process.argv.slice(2);
const userWantsGeneralHelp =
  (inputArguments[0] === "help" || inputArguments[0] === "--help") &&
  inputArguments.length === 1;

if (userWantsGeneralHelp) {
  command.displayGeneralHelp();
  process.exit(0);
}

command.run(inputArguments, options, function(err) {
  if (err) {
    if (err instanceof TaskError) {
      command.displayGeneralHelp();
    } else {
        console.log(err.message);
    process.exit(1);
    }
  }
  process.exit(0);
});
