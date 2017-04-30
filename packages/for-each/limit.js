const defaults = require('lodash.defaults');
const each = require('apr-engine-each');

/**
 * @kind function
 * @name limit
 * @memberof for-each
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
module.exports = (input, limit, fn, opts) =>
  each({
    input,
    fn,
    opts: defaults(
      {
        limit
      },
      opts
    )
  });
