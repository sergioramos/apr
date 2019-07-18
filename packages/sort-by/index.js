import IsArray from 'lodash.isarraylike';
import SortBy from 'lodash.sortby';
import Sum from 'apr-engine-sum';
import Back from 'apr-engine-back';
import Map, { limit as MapLimit } from 'apr-map';

const Run = (input, p) => {
  const isObj = !IsArray(Sum(input));

  const after = items => {
    return SortBy(
      items.filter(item => !item.result.done),
      item => item.result.value,
    ).map(item => {
      return !isObj
        ? item.input.value
        : { key: item.key, value: item.input.value };
    });
  };

  return Back({ p, input }).then(after);
};

/**
 * <a id="sort-by"></a>
 * Sorts a list by the results of running each `coll` value through an async `iteratee`.
 *
 * [![](https://img.shields.io/npm/v/apr-sort-by.svg?style=flat-square)](https://www.npmjs.com/package/apr-sort-by) [![](https://img.shields.io/npm/l/apr-sort-by.svg?style=flat-square)](https://www.npmjs.com/package/apr-sort-by)
 *
 * @kind function
 * @name sort-by
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import SortBy from 'apr-sort-by';
 *
 * const stat = awaitify(fs.stat);
 * const files = [
 *   'file1',
 *   'file2',
 *   'file3'
 * ];
 *
 * const sorted = await SortBy(files, await (file) => {
 *   const { mtime } = await stat(file);
 *   return mtime;
 * });
 */
export default (input, fn, opts) => {
  return Run(input, Map(input, fn, opts));
};

/**
 * @kind function
 * @name limit
 * @memberof sort-by
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const limt = (input, limit, fn, opts) => {
  return Run(input, MapLimit(input, limit, fn, opts));
};

/**
 * @kind function
 * @name series
 * @memberof some
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const series = (input, fn, opts) => {
  return limit(input, 1, fn, opts);
};
