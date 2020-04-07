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
  constructor(options) {
    this.configure(options);
  }

  configure({
    particulars,
    account,
    decimals,
    amount,
  } = {}) {
    this._particulars = particulars;
    this._account = account;
    this._decimals = decimals || 2;
    if (amount) {
      this._amount = Dinero({ amount: amount * Math.pow(10,this._decimals)});
    } else {
      this._amount = Dinero({ amount: 0 });
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
