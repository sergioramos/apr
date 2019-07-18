import Repeat from 'apr-engine-repeat';

/**
 * <a id="until"></a>
 * Repeatedly call `fn` until `test` returns `true`.
 *
 * [![](https://img.shields.io/npm/v/apr-until.svg?style=flat-square)](https://www.npmjs.com/package/apr-until) [![](https://img.shields.io/npm/l/apr-until.svg?style=flat-square)](https://www.npmjs.com/package/apr-until)
 *
 * @kind function
 * @name until
 * @param {Function} test
 * @param {Function} fn
 * @returns {Promise}
 *
 * @example
 * import until from 'apr-until';
 *
 * const then = (v) => new Promise((resolve) => resolve(v));
 *
 * const maxCalls = 10;
 * let calls = 0;
 *
 *
 * const output = await until(async () => {
 *   await then();
 *   return (calls += 1) >= maxCalls;
 * }, async () => (
 *   await then(calls)
 * );
 *
 * // output = 10
 */
export default (test, fn) => {
  return Repeat({ test, fn, after: tested => Boolean(tested) });
};
