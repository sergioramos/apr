import Sum from 'apr-engine-sum';
import Back from 'apr-engine-back';
import Map, { limit as MapLimit } from 'apr-map';

const Run = (input, p) => {
  const after = items => {
    return items
      .filter(item => !item.result.value && !item.result.done)
      .reduce((sum, item, i) => {
        const key = item.isObj ? item.key : i;
        sum[key] = item.input.value;
        return sum;
      }, Sum(input));
  };

  return Back({ p, input }).then(after);
};

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
export default (input, fn, opts) => {
  return Run(input, Map(input, fn, opts));
};

/**
 * @kind function
 * @name limit
 * @memberof reject
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const limit = (input, limit, fn, opts) => {
  return Run(input, MapLimit(input, limit, fn, opts));
};

/**
 * @kind function
 * @name series
 * @memberof reject
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const series = (input, fn, opts) => {
  return limit(input, 1, fn, opts);
};
