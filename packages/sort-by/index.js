const map = require('apr-map');
const run = require('./run');

/**
 * <a id="sort-by"></a>
 * Sorts a list by the results of running each `coll` value through an async `iteratee`.
 *
 * [![](https://img.shields.io/npm/v/apr-sort-by.svg?style=flat-square)](https://www.npmjs.com/package/apr-sort-by) [![](https://img.shields.io/npm/l/apr-sort-by.svg?style=flat-square)](https://www.npmjs.com/package/apr-sort-by)
 *
 * @kind function
 * @name sort-by
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import sortBy from 'apr-sort-by';
 *
 * const stat = awaitify(fs.stat);
 * const files = [
 *   'file1',
 *   'file2',
 *   'file3'
 * ];
 *
 * const sorted = await sortBy(files, await (file) => {
 *   const { mtime } = await stat(file);
 *   return mtime;
 * });
 */
module.exports = (input, fn, opts) => {
  return run(input, map(input, fn, opts));
};

module.exports.series = require('./series');
module.exports.limit = require('./limit');
