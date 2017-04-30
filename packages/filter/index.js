const run = require('./run');
const map = require('apr-map');

/**
 * <a id="filter"></a>
 * Returns a new array of all the values in `coll` which pass an async truth test.
 *
 * [![](https://img.shields.io/npm/v/apr-filter.svg?style=flat-square)](https://www.npmjs.com/package/apr-filter) [![](https://img.shields.io/npm/l/apr-filter.svg?style=flat-square)](https://www.npmjs.com/package/apr-filter)
 *
 * @kind function
 * @name filter
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import filter from 'apr-filter';
 *
 * const access = awaitify(fs.access);
 * const files = [
 *   'file1',
 *   'file2',
 *   'file3'
 * ];
 *
 * var existent = await filter(files, async (file) =>
 *   await access(file)
 * );
 */
module.exports = (input, fn, opts) => run(input, map(input, fn, opts));

module.exports.series = require('./series');
module.exports.limit = require('./limit');
