'use strict';

/**
 * Setup to expose journal.
 * @type {Object}
 */
const journal = exports;

/**
 * Expose core Journal-related prototypes.
 * @type {function}
 */
journal.createJournal = require('./create-journal');

/**
 * We create and expose a 'defaultJournal' so that the programmer may do the
 * following without the need to create an instance of winston.Logger directly:
 * @example
 *   const journal = require('journal');
 *   journal.description('some description');
 *   journal.add(some_line_item);
 */
const defaultJournal = journal.createJournal();

/**
 * Expose core LineItem-related prototypes.
 * @type {function}
 */
journal.createLineItem = require('./create-line-item');
