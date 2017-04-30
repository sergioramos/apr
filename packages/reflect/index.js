/**
 * <a id="reflect"></a>
 * Wraps the function in another function that always returns data even when it errors.
 * The object returned has either the property error or value.
 *
 * [![](https://img.shields.io/npm/v/apr-reflect.svg?style=flat-square)](https://www.npmjs.com/package/apr-reflect) [![](https://img.shields.io/npm/l/apr-reflect.svg?style=flat-square)](https://www.npmjs.com/package/apr-reflect)
 *
 * @kind function
 * @name reflect
 * @param {Function} input
 * @returns {Function}
 *
 * @example
 * import parallel from 'apr-parallel';
 * import reflect from 'apr-reflect';
 *
 * const then = (v) => new Promise((resolve) => resolve(v));
 *
 * const res = await parallel([
 *   async () => {
 *     throw new Error('heyo')
 *   },
 *   async () => await then(2)
 * ]);
 *
 * // res = [{ error: Error('heyo'), value: null }, { error: null, value: 2 }]
 */
module.exports = fn => (...args) =>
  fn(...args)
    .then(value => ({
      value,
      error: null
    }))
    .catch(err => ({
      value: null,
      error: err
    }));
