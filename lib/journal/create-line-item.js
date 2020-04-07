'use strict';

//const config = require('./config');
const LineItem = require('./line-item');


/**
 * Create a new instance of a Journal Line Item. Creates a new
 * prototype for each instance.
 * @param {!Object} opts - Options for the created line item.
 * @returns {LineItem} - A newly created LineItem instance.
 */
module.exports = function (opts = {}) {

  //opts.levels = opts.levels || config.npm.levels;
  var lineItem = new LineItem(opts);

  return lineItem;
};
