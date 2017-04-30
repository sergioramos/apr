const limit = require('./limit');

/**
 * @kind function
 * @name series
 * @memberof times
 * @param {Number} n
 * @param {Function} iteratee
 * @returns {Promise}
 */
module.exports = (count, fn, opts) => limit(count, 1, fn, opts);
