'use strict';

/**
 * Transport for outputting to a json-rpc server.
 * @type {Stream}
 * @extends {TransportStream}
 */
module.exports = class LineItem {
  /**
   * Constructor function for the Http transport object responsible for
   * persisting log messages and metadata to a terminal or TTY.
   * @param {!Object} [options={}] - Options for this instance.
   */
  constructor(options = {}) {
    super(options);

    this.particulars = options.particulars || 'http';
    this.amount = options.amount || 0;
  }

};
