import defaults from 'lodash.defaults';
import isArray from 'lodash.isarraylike';

import each from 'apr-engine-each';
import Sum from 'apr-engine-sum';

const run = ctx => {
  let first = null;

  return each(
    defaults(
      {
        after: (value, item) => {
          first = Boolean(value) && item;
          return first;
        },
      },
      ctx,
    ),
  ).then(() => {
    return (
      first &&
      (isArray(Sum(ctx.input))
        ? first.value
        : {
            key: first.key,
            value: first.value,
          })
    );
  });
};

/**
 * <a id="find"></a>
 * Returns the first value in `coll` that passes an async truth test.
 *
 * [![](https://img.shields.io/npm/v/apr-find.svg?style=flat-square)](https://www.npmjs.com/package/apr-find) [![](https://img.shields.io/npm/l/apr-find.svg?style=flat-square)](https://www.npmjs.com/package/apr-find)
 *
 * @kind function
 * @name find
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import find from 'apr-find';
 *
 * const access = awaitify(fs.access);
 * const files = [
 *   'file1',
 *   'file2',
 *   'file3'
 * ];
 *
 * const first = await find(files, async (file) =>
 *   await access(file)
 * );
 */
export default (input, fn, opts) => {
  return run({ input, fn, opts });
};

/**
 * @kind function
 * @name limit
 * @memberof find
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const limit = (input, limit, fn, opts) => {
  return run({ input, fn, opts: defaults({ limit }, opts) });
};

/**
 * @kind function
 * @name series
 * @memberof find
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const series = (input, fn, opts) => {
  return limit(input, 1, fn, opts);
};
