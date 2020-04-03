'use strict';

require('datejs')
const accounting = require('accounting')

//const config = require('./config');

/**
 * The Journaler Class creates instances of Journals.
 * Journals contain a date, description and two or more line
 * items to record the details of transactions. Also contains
 * helper functions to check validity etc
 * @type {Journaler}
 *
 */
class Journaler {
  /**
   * Constructor function for the Journaler object 
   * @param {!Object} options - foo
   *
   */
  constructor(options) {
    this.configure(options);
  }

  configure({
    date,
    description,
    lineItems,
  } = {}) {

    this._date = Date.parse(date) || Date.today();
    this._description = description;
    this._lineItems = [];

    // Add all lineItems we have been provided.
    if (lineItems) {
      lineItems = Array.isArray(lineItems) ? lineItems : [lineItems];
      lineItems.forEach(lineItem => this.add(lineItem));
    }
    
  }

  set description(description) {
    this._description = description;
  }

  get description() {
    return this._description;
  }

  set date(date) {
    this._date = Date.parse(date);
  }

  get date() {
    return this._date;
  }

  /**
   * Adds the lineItem to this Journaler instance.
   * @param {LineItem} lineItem - A prepared line item instance to be added to the Journal.
   *
   */
  add(lineItem) {
    this._lineItems.push(lineItem);
  }

  /**
   * Removes the LineItem contained at the provided index from this Journaler instance.
   * @param {integer} index - Index of the line item to be removed.
   *
   */
  remove(index) {
    this._lineItems.splice(index, 1);
  }

  /**
   * Removes all LineItems from this Journaler instance.
   *
   */
  clear() {
    this._lineItems = [];
  }
  
  /**
   * Returns the length of the LineItems array.
   *
   */
  get length() {
    return this._lineItems.length;
  }

  /**
   * Returns the balance of the amounts in the LineItems array.
   *
   */
  get balance() {
    var bal, i;
    bal = accounting.formatMoney(0);
    for (i = 0; i < this._lineItems.length; i++) {
      bal = bal.add(this._lineItems[i].amount);
    }
    return bal;
  }

  /**
   * Performs a series of checks to ensure that the journal is valid
   *
   */
  get valid() {
    var val = true;
    if (this.balance != accounting.formatMoney(0)) {
      val = false;
    }

    return val;
  }

  test() {
    console.log("TESTING");
  }

}

module.exports = Journaler;
