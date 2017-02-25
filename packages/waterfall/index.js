const each = require('apr-engine-each');

/**
 * <a id="waterfall"></a>
 * Runs the `tasks` array of functions in series, each passing their results to the next in the array.
 *
 * [![](https://img.shields.io/npm/v/apr-waterfall.svg?style=flat-square)](https://www.npmjs.com/package/apr-waterfall) [![](https://img.shields.io/npm/l/apr-waterfall.svg?style=flat-square)](https://www.npmjs.com/package/apr-waterfall)
 *
 * @kind function
 * @name waterfall
 * @param {Array<Function>|Object} tasks
 * @param {Any} [initial]
 * @returns {Promise}
 *
 * @example
 * import waterfall from 'apr-waterfall';
 *
 * const then = (v) => new Promise((resolve) => resolve(v));
 *
 * const output = await waterfall([
 *   async () => await then(1),
 *   async (v) => await then(v + 2),
 *   async (v) => await then(v + 3)
 * ]);
 *
 * // output = 6
 */
module.exports = (input, initial) => {
  let last = initial;

  return each({
    input,
    opts: {
      limit: 1
    },
    after: (value, item) => {
      last = value;
    },
    call: (item) => {
      return item.value(last);
    }
  }).then(() => {
    return last;
  });
};
