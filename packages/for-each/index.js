import Defaults from 'lodash.defaults';
import Each from 'apr-engine-each';

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
export default (input, fn, opts) => {
  return Each({ input, fn, opts });
};

/**
 * @kind function
 * @name limit
 * @memberof for-each
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const limit = (input, limit, fn, opts) => {
  return Each({ input, fn, opts: Defaults({ limit }, opts) });
};

/**
 * @kind function
 * @name series
 * @memberof for-each
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const series = (input, fn, opts) => {
  return limit(input, 1, fn, opts);
};
