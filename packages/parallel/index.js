const Sum = require('apr-engine-sum');
const reduce = require('apr-reduce');

/**
 * <a id="parallel"></a>
 * Run the tasks collection of functions in parallel, without waiting until the previous function has completed.
 *
 * [![](https://img.shields.io/npm/v/apr-parallel.svg?style=flat-square)](https://www.npmjs.com/package/apr-parallel) [![](https://img.shields.io/npm/l/apr-parallel.svg?style=flat-square)](https://www.npmjs.com/package/apr-parallel)
 *
 * @kind function
 * @name parallel
 * @param {Array<Promise>|Object} tasks
 * @returns {Promise}
 *
 * @example
 * import parallel from 'apr-parallel';
 *
 * const then = (v) => new Promise((resolve) => resolve(v));
 *
 * const withArray = await parallel([
 *   async () => await then(1),
 *   async () => await then(2)
 * ]);
 *
 * // withArray = [1, 2]
 *
 * const withObject = await parallel({
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
      limit: Infinity
    }
  );
