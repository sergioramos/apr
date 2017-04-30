const Sum = require('apr-engine-sum');
const reduce = require('apr-reduce');

/**
 * <a id="series"></a>
 * Run the functions in the `tasks` in series, each one running once the previous function has completed.
 *
 * [![](https://img.shields.io/npm/v/apr-series.svg?style=flat-square)](https://www.npmjs.com/package/apr-series) [![](https://img.shields.io/npm/l/apr-series.svg?style=flat-square)](https://www.npmjs.com/package/apr-series)
 *
 * @kind function
 * @name series
 * @param {Array<Function>|Object} tasks
 * @returns {Promise}
 *
 * @example
 * import series from 'apr-series';
 *
 * const then = (v) => new Promise((resolve) => resolve(v));
 *
 * const withArray = await series([
 *   async () => await then(1),
 *   async () => await then(2)
 * ]);
 *
 * // withArray = [1, 2]
 *
 * const withObject = await series({
 *   one: async () => await then(1),
 *   two: async () => await then(2)
 * });
 *
 * // withObject = { one: 1, two: 2 }
 */
module.exports = input =>
  reduce(
    input,
    (sum, fn, key) =>
      fn().then(res => {
        sum[key] = res;
        return sum;
      }),
    Sum(input),
    {
      limit: 1
    }
  );
