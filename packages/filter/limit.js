const run = require('./run');
const map = require('apr-map/limit');

/**
 * @kind function
 * @name limit
 * @memberof filter
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
module.exports = (input, limit, fn, opts) => {
  return run(input, map(input, limit, fn, opts));
};
