import Sum from 'apr-engine-sum';
import Back from 'apr-engine-back';
import Map, { limit as MapLimit } from 'apr-map';

const Run = (input, p) => {
  const after = items => {
    return items
      .filter(item => Boolean(item.result.value) && !item.result.done)
      .reduce((sum, item, i) => {
        const key = item.isObj ? item.key : i;
        sum[key] = item.input.value;
        return sum;
      }, Sum(input));
  };

  return Back({ p, input }).then(after);
};

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
export default (input, fn, opts) => {
  return Run(input, Map(input, fn, opts));
};

/**
 * @kind function
 * @name limit
 * @memberof filter
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
 * @memberof filter
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const series = (input, fn, opts) => {
  return limit(input, 1, fn, opts);
};
