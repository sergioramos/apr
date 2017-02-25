const defaults = require('lodash.defaults');
const each = require('apr-engine-each');

/**
 * <a id="reduce"></a>
 * Reduces `coll` into a single value using an async `iteratee` to return each successive step.
 *
 * [![](https://img.shields.io/npm/v/apr-reduce.svg?style=flat-square)](https://www.npmjs.com/package/apr-reduce) [![](https://img.shields.io/npm/l/apr-reduce.svg?style=flat-square)](https://www.npmjs.com/package/apr-reduce)
 *
 * @kind function
 * @name reduce
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import reduce from 'apr-reduce';
 *
 * const sum = await reduce([1, 2, 3], async (sum, item) =>
 *   new Promise((resolve) => resolve(sum + item))
 * );
 */
module.exports = (input, fn, sum, opts) => {
  return each({
    input,
    opts: defaults(opts, {
      limit: 1
    }),
    after: (value, item) => {
      sum = value;
    },
    call: (item) => {
      return fn(sum, item.value, item.key, input);
    }
  }).then(() => {
    return sum;
  });
};
