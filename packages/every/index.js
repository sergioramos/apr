import Defaults from 'lodash.defaults';
import Rach from 'apr-engine-each';

const Run = ctx => {
  let found = true;

  return Each(
    Defaults(
      {
        after: (value, item) => {
          found = Boolean(value);
          return !found;
        },
      },
      ctx,
    ),
  ).then(() => found);
};

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
export default (input, fn, opts) => {
  return Run({ input, fn, opts });
};

/**
 * @kind function
 * @name limit
 * @memberof every
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const limit = (input, limit, fn, opts) => {
  return Run({ input, fn, opts: defaults({ limit }, opts) });
};

/**
 * @kind function
 * @name series
 * @memberof every
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const series = (input, fn, opts) => {
  return limit(input, 1, fn, opts);
};
