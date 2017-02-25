const run = require('./run');

/**
 * <a id="concat"></a>
 * Applies `iteratee` to each item in `coll`, concatenating the results. Returns the concatenated list.
 *
 * [![](https://img.shields.io/npm/v/apr-concat.svg?style=flat-square)](https://www.npmjs.com/package/apr-concat) [![](https://img.shields.io/npm/l/apr-concat.svg?style=flat-square)](https://www.npmjs.com/package/apr-concat)
 *
 * @kind function
 * @name concat
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import concat from 'apr-concat';
 *
 * const readdir = awaitify(fs.readdir);
 * const dirs = [
 *   'dir1',
 *   'dir2',
 *   'dir3'
 * ];
 *
 * const files = await concat(dirs, async (dir) =>
 *   await readdir(dir)
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
