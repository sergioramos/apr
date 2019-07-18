import Find, { limit as FindLimit } from 'apr-find';

/**
 * <a id="some"></a>
 * Returns true if at least one element in the `coll` satisfies an async test.
 *
 * [![](https://img.shields.io/npm/v/apr-some.svg?style=flat-square)](https://www.npmjs.com/package/apr-some) [![](https://img.shields.io/npm/l/apr-some.svg?style=flat-square)](https://www.npmjs.com/package/apr-some)
 *
 * @kind function
 * @name some
 * @param {Array|Object|Iterable} input
 * @param {Function} iteratee
 * @returns {Promise}
 *
 * @example
 * import awaitify from 'apr-awaitify';
 * import some from 'apr-some';
 *
 * const access = awaitify(fs.access);
 * const files = [
 *   'file1',
 *   'file2',
 *   'file3'
 * ];
 *
 * const oneExist = await some(files, async (file) =>
 *   await access(file)
 * );
 */
export default (...args) => {
  return Find(...args).then(first => Boolean(first));
};

/**
 * @kind function
 * @name limit
 * @memberof some
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
export const limit = (...args) => {
  return FindLimit(...args).then(first => Boolean(first));
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
