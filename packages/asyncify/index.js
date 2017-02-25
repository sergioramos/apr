/**
 * <a id="asyncify"></a>
 * Take a sync function and make it async. This is useful for plugging sync functions into a [`waterfall`](#waterfall), [`series`](#series), or other async functions.
 *
 * [![](https://img.shields.io/npm/v/apr-asyncify.svg?style=flat-square)](https://www.npmjs.com/package/apr-asyncify) [![](https://img.shields.io/npm/l/apr-asyncify.svg?style=flat-square)](https://www.npmjs.com/package/apr-asyncify)
 *
 * @kind function
 * @name asyncify
 * @param {Function} function
 * @returns {Function}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import asyncify from 'apr-asyncify';
 * import waterfall from 'apr-waterfall';
 * import apply from 'apr-apply';
 * 
 * const readFile = awaitify(require('fs').readFile);
 * const pkgPath = path.join(__dirname, './package.json');
 * 
 * const pkg = await waterfall([
 *   apply(readFile, pkgPath, 'utf8'),
 *   asyncify(JSON.parse)
 * ]);
 */
module.exports = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(fn(...args));
      } catch (err) {
        reject(err);
      }
    });
  };
};
