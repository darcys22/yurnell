'use strict';

//const config = require('./config');
const Journaler = require('./journaler');


/**
 * Create a new instance of a winston Logger. Creates a new
 * prototype for each instance.
 * @param {!Object} opts - Options for the created logger.
 * @returns {Logger} - A newly created logger instance.
 */
module.exports = function (opts = {}) {

  //opts.levels = opts.levels || config.npm.levels;

  var journal = new Journaler(opts);

  return journal;
};
