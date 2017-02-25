/**
 * <a id="apply"></a>
 * Creates a continuation function with some arguments already applied.
 *
 * [![](https://img.shields.io/npm/v/apr-apply.svg?style=flat-square)](https://www.npmjs.com/package/apr-apply) [![](https://img.shields.io/npm/l/apr-apply.svg?style=flat-square)](https://www.npmjs.com/package/apr-apply)
 *
 * @kind function
 * @name apply
 * @param {Function} function
 * @param {...Any} arguments
 * @returns {Function}
 *
 * @example
 * import parallel from 'apr-parallel';
 * import apply from 'apr-apply';
 *
 * const then = (v) => new Promise((resolve) => resolve(v));
 *
 * const output = await parallel([
 *   apply(then, 1)
 *   apply(then, 2)
 *   apply(then, 3)
 * ]);
 *
 * // output = [1, 2, 3]
 */
module.exports = (fn, ...args) => {
  return () => {
    return fn(...args);
  };
};
