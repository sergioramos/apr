const findLimit = require('apr-find/limit');
const then = require('./then');

/**
 * @kind function
 * @name limit
 * @memberof some
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
module.exports = (...args) => {
  return findLimit(...args).then(then);
};
