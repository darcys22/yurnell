'use strict';

const Dinero = require('dinero.js')

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
    console.log(options.particulars);
    this._account = options.account;
    this._decimals = options.decimals || 2;
    console.log(options.amount);
    if (options.amount) {
      Dinero({ amount: options.amount * Math.pow(10,this._decimals)});
    } else {
      Dinero({ amount: 0 });
    }
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
    this._amount = Dinero({ amount: amount * Math.pow(10,this._decimals)});
  }

  get amount() {
    return this._amount;
  }
  
  test() {
    console.log("TESTING LINE ITEM");
  }

};
