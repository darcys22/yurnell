'use strict';

const accounting = require('accounting')

/**
 * Line Items for inclusion in Journal Instances.
 * @type {LineItem}
 *
 */
module.exports = class LineItem {
  /**
   * Constructor function for the LineItem
   * @param {!Object} [options={}] - Options for this instance.
   *
   */
  constructor(options = {}) {
    this._particulars = options.particulars;
    this._account = options.account;
    this._amount = options.amount || accounting.formatMoney(0);
    this._currency = options.currency || "AUD";
    this._decimals = options.decimals || 2;
  }

  set particulars(particulars) {
    this._particulars = particulars;
  }

  get particulars() {
    return this._particulars;
  }
  
  set account(account) {
    this._account = account;
  }

  get account() {
    return this._account;
  }
  
  set amount(amount) {
    this._amount = accounting.formatMoney(amount);
  }

  get amount() {
    return this._amount;
  }
  
  test() {
    console.log("TESTING LINE ITEM");
  }

};
