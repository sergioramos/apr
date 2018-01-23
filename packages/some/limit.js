const { limit: findLimit } = require('apr-find');
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
module.exports = (...args) => findLimit(...args).then(then);
