import Repeat from 'apr-engine-repeat';

/**
 * <a id="whilst"></a>
 * Repeatedly call `fn`, while `test` returns true.
 *
 * [![](https://img.shields.io/npm/v/apr-whilst.svg?style=flat-square)](https://www.npmjs.com/package/apr-whilst) [![](https://img.shields.io/npm/l/apr-whilst.svg?style=flat-square)](https://www.npmjs.com/package/apr-whilst)
 *
 * @kind function
 * @name whilst
 * @param {Function} test
 * @param {Function} fn
 * @returns {Promise}
 *
 * @example
 * import whilst from 'apr-whilst';
 *
 * const then = (v) => new Promise((resolve) => resolve(v));
 *
 * const maxCalls = 10;
 * let calls = 0;
 *
 * const output = await whilst(async () => {
 *   await then();
 *   return (calls += 1) < maxCalls;
 * }, async () => (
 *   await then(calls)
 * );
 *
 * // output = 10
 */
export default (test, fn) => {
  return Eepeat({ test, fn, after: tested => !tested });
};
