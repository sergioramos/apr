import Defaults from 'lodash.defaults';
import Each from 'apr-engine-each';
import Sum from 'apr-engine-sum';

const Run = ctx => {
  const sum = Sum(ctx.input);

  return Each(
    Defaults(
      {
        after: (value, item) => (sum[item.key] = value),
      },
      ctx,
    ),
  ).then(() => sum);
};

/**
 * <a id="map"></a>
 * Produces a new collection of values by mapping each value in `coll` through the `iteratee` function.
 *
 * [![](https://img.shields.io/npm/v/apr-map.svg?style=flat-square)](https://www.npmjs.com/package/apr-map) [![](https://img.shields.io/npm/l/apr-map.svg?style=flat-square)](https://www.npmjs.com/package/apr-map)
 *
 * @kind function
 * @name map
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import map from 'apr-map';
 *
 * const stat = awaitify(fs.stat);
 * const files = [
 *   'file1',
 *   'file2',
 *   'file3'
 * ];
 *
 * const stats = await map(files, async (file) =>
 *   await stat(file);
 * );
 */
export default (input, fn, opts) => {
  return Run({ input, fn, opts });
};

/**
 * @kind function
 * @name limit
 * @memberof map
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
 * @memberof map
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const series = (input, fn, opts) => {
  return limit(input, 1, fn, opts);
};
