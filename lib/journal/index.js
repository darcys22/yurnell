'use strict';

/**
 * Setup to expose.
 * @type {Object}
 */
const journal = exports;

/**
 * Expose utility methods
 * @type {Object}
 */
//journal.config = require('./config');
/**
 * Expose core Logging-related prototypes.
 * @type {function}
 */
journal.createJournal = require('./create-journal');

/**
 * We create and expose a 'defaultJournal' so that the programmer may do the
 * following without the need to create an instance of winston.Logger directly:
 * @example
 *   const journal = require('journal');
 *   winston.log('info', 'some message');
 *   winston.error('some error');
 */
const defaultJournal = journal.createJournal();
