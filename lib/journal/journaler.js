'use strict';

//const config = require('./config');

/**
 * TODO: add class description.
 * @type {Logger}
 * @extends {Transform}
 */
class Journaler {
  /**
   * Constructor function for the Logger object responsible for persisting log
   * messages and metadata to one or more transports.
   * @param {!Object} options - foo
   */
  constructor(options) {
    this.configure(options);
  }

  configure({
    date,
    description,
    lineItems,
  } = {}) {

    this._date = date;
    this._description = description;

    // Add all transports we have been provided.
    if (lineItems) {
      lineItems = Array.isArray(lineItems) ? lineItems : [lineItems];
      lineItems.forEach(lineItem => this.add(lineItem));
    }
  }

  set description(description) {
    this._description = description.charAt(0).toUpperCase() + description.slice(1);
  }

  get description() {
    return this._description;
  }

  /**
   * Adds the lineItem to this Journaler instance by piping to it.
   * @param {mixed} transport - TODO: add param description.
   * @returns {Logger} - TODO: add return description.
   */
  add(lineItem) {
    return this;
  }

  /**
   * Removes the transport from this logger instance by unpiping from it.
   * @param {mixed} transport - TODO: add param description.
   * @returns {Logger} - TODO: add return description.
   */
  remove(lineItem) {
    return this;
  }

  /**
   * Removes all transports from this logger instance.
   * @returns {Logger} - TODO: add return description.
   */
  clear() {
    this.unpipe();
    return this;
  }

  test() {
    console.log("TESTING");
  }

}

module.exports = Journaler;
