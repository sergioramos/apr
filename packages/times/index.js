import Defaults from 'lodash.defaults';
import BuildArray from 'build-array';
import Map from 'apr-map';

const Run = (count, fn, opts) => {
  return Map(BuildArray(count).map((n, i) => i), fn, opts);
};

/**
 * <a id="times"></a>
 * Calls the `iteratee` function `n` times, and accumulates results in the same manner you would use with [map](#map).
 *
 * [![](https://img.shields.io/npm/v/apr-times.svg?style=flat-square)](https://www.npmjs.com/package/apr-times) [![](https://img.shields.io/npm/l/apr-times.svg?style=flat-square)](https://www.npmjs.com/package/apr-times)
 *
 * @kind function
 * @name times
 * @param {Number} n
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import times from 'apr-times';
 *
 * const then = (v) => new Promise((resolve) => resolve(v));
 *
 * const res = await times(6, async (i) =>
 *   await then(i);
 * );
 *
 * // res = [0, 1, 2, 3, 4, 5]
 */
export default Run;

/**
 * @kind function
 * @name limit
 * @memberof times
 * @param {Number} n
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const limit = (count, limit, fn, opts) => {
  return Run(count, fn, Defaults({ limit }, opts));
};

/**
 * @kind function
 * @name series
 * @memberof times
 * @param {Number} n
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const series = (count, fn, opts) => {
  return limit(count, 1, fn, opts);
};
