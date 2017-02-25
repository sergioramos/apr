const map = require('apr-map');
const run = require('./run');

/**
 * <a id="reject"></a>
 * The opposite of [`filter`](#filter). Removes values that pass an async truth test.
 *
 * [![](https://img.shields.io/npm/v/apr-reject.svg?style=flat-square)](https://www.npmjs.com/package/apr-reject) [![](https://img.shields.io/npm/l/apr-reject.svg?style=flat-square)](https://www.npmjs.com/package/apr-reject)
 *
 * @kind function
 * @name reject
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import reject from 'apr-reject';
 *
 * const access = awaitify(fs.access);
 * const files = [
 *   'file1',
 *   'file2',
 *   'file3'
 * ];
 *
 * var missing = await reject(files, async (file) =>
 *   await access(file)
 * );
 */
module.exports = (input, fn, opts) => {
  return run(input, map(input, fn, opts));
};

module.exports.series = require('./series');
module.exports.limit = require('./limit');
