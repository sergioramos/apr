const waterfall = require('apr-waterfall');

/**
 * <a id="seq"></a>
 * Version of the compose function that is more natural to read. Each function consumes the return value of the previous function. It is the equivalent of compose with the arguments reversed.
 *
 * [![](https://img.shields.io/npm/v/apr-seq.svg?style=flat-square)](https://www.npmjs.com/package/apr-seq) [![](https://img.shields.io/npm/l/apr-seq.svg?style=flat-square)](https://www.npmjs.com/package/apr-seq)
 *
 * @kind function
 * @name seq
 * @param {...Function} tasks
 * @returns {Function}
 *
 * @example
 * import seq from 'apr-seq';
 *
 * const then = (v) => new Promise((resolve) => resolve(v));
 *
 * const seq = seq(
 *   async (v) => await then(v + 1),
 *   async (v) => await then(v + 2),
 *   async (v) => await then(v + 3)
 * );
 *
 * const output = await seq(1); // 7
 */
module.exports = (...args) => value => waterfall([...args], value);
