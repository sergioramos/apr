const find = require('apr-find');
const then = require('./then');

/**
 * <a id="some"></a>
 * Returns true if at least one element in the `coll` satisfies an async test.
 *
 * [![](https://img.shields.io/npm/v/apr-some.svg?style=flat-square)](https://www.npmjs.com/package/apr-some) [![](https://img.shields.io/npm/l/apr-some.svg?style=flat-square)](https://www.npmjs.com/package/apr-some)
 *
 * @kind function
 * @name some
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import some from 'apr-some';
 *
 * const access = awaitify(fs.access);
 * const files = [
 *   'file1',
 *   'file2',
 *   'file3'
 * ];
 *
 * const oneExist = await some(files, async (file) =>
 *   await access(file)
 * );
 */
module.exports = (...args) => find(...args).then(then);

module.exports.series = require('./series');
module.exports.limit = require('./limit');
