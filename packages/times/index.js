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
module.exports = require('./run');
module.exports.series = require('./series');
module.exports.limit = require('./limit');
