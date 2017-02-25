/**
 * <a id="constant"></a>
 * Returns a promise that when called, then's with the values provided. Useful as the first function in a [`waterfall`](#waterfall).
 *
 * [![](https://img.shields.io/npm/v/apr-constant.svg?style=flat-square)](https://www.npmjs.com/package/apr-constant) [![](https://img.shields.io/npm/l/apr-constant.svg?style=flat-square)](https://www.npmjs.com/package/apr-constant)
 *
 * @kind function
 * @name constant
 * @param {...any} arguments
 * @returns {Promise}
 *
 * @example
 * import asyncify from 'apr-asyncify';
 * import waterfall from 'apr-waterfall';
 * import constant from 'apr-constant';
 *
 * const pkg = await waterfall([
 *   constant('{"name": "apr"}'),
 *   asyncify(JSON.parse)
 * ]);
 */
module.exports = (...args) => {
  return () => {
    return new Promise((resolve) => {
      resolve(...args);
    });
  };
};
