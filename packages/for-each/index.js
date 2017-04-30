const each = require('apr-engine-each');

/**
 * <a id="for-each"></a>
 * Applies the function `iteratee` to each item in `coll`, in parallel.
 *
 * [![](https://img.shields.io/npm/v/apr-for-each.svg?style=flat-square)](https://www.npmjs.com/package/apr-for-each) [![](https://img.shields.io/npm/l/apr-for-each.svg?style=flat-square)](https://www.npmjs.com/package/apr-for-each)
 *
 * @kind function
 * @name for-each
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import forEach from 'apr-for-each';
 *
 * const writeFile = awaitify(fs.writeFile);
 * const files = [
 *   '/home/.vimrc',
 *   '/home/.zshrc'
 * ];
 *
 * await forEach(files, async (file) =>
 *   await writeFile(file, 'boom')
 * );
 */
module.exports = (input, fn, opts) =>
  each({
    input,
    fn,
    opts
  });

module.exports.series = require('./series');
module.exports.limit = require('./limit');
