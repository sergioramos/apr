const run = require('./run');

/**
 * <a id="every"></a>
 * Returns true if every element in `coll` satisfies an async test.
 *
 * [![](https://img.shields.io/npm/v/apr-every.svg?style=flat-square)](https://www.npmjs.com/package/apr-every) [![](https://img.shields.io/npm/l/apr-every.svg?style=flat-square)](https://www.npmjs.com/package/apr-every)
 *
 * @kind function
 * @name every
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import every from 'apr-every';
 *
 * const access = awaitify(fs.access);
 * const files = [
 *   'file1',
 *   'file2',
 *   'file3'
 * ];
 *
 * const allExist = await every(files, async (file) =>
 *   await access(file)
 * );
 */
module.exports = (input, fn, opts) =>
  run({
    input,
    fn,
    opts
  });

module.exports.series = require('./series');
module.exports.limit = require('./limit');
