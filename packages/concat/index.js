import Defaults from 'lodash.defaults';
import each from 'apr-engine-each';

const Run = ctx => {
  let total;

  return each(
    Defaults(
      {
        after: (value, item, i) => {
          total = i === 0 ? value : total + value;
        },
      },
      ctx,
    ),
  ).then(() => total);
};

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
export default (input, fn, opts) => {
  return Run({ input, fn, opts });
};

/**
 * @kind function
 * @name limit
 * @memberof concat
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const limit = (input, limit, fn, opts) => {
  return Run({ input, fn, opts: Defaults({ limit }, opts) });
};

/**
 * @kind function
 * @name series
 * @memberof concat
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const series = (input, fn, opts) => limit(input, 1, fn, opts);
