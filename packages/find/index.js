const run = require('./run');

/**
 * <a id="find"></a>
 * Returns the first value in `coll` that passes an async truth test.
 *
 * [![](https://img.shields.io/npm/v/apr-find.svg?style=flat-square)](https://www.npmjs.com/package/apr-find) [![](https://img.shields.io/npm/l/apr-find.svg?style=flat-square)](https://www.npmjs.com/package/apr-find)
 *
 * @kind function
 * @name find
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import find from 'apr-find';
 *
 * const access = awaitify(fs.access);
 * const files = [
 *   'file1',
 *   'file2',
 *   'file3'
 * ];
 *
 * const first = await find(files, async (file) =>
 *   await access(file)
 * );
 */
module.exports = (input, fn, opts) => {
  return run({
    input,
    fn,
    opts
  });
};

module.exports.series = require('./series');
module.exports.limit = require('./limit');
