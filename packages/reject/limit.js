const { limit: mapLimit } = require('apr-map');
const run = require('./run');

/**
 * @kind function
 * @name limit
 * @memberof reject
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
module.exports = (input, limit, fn, opts) =>
  run(input, mapLimit(input, limit, fn, opts));
