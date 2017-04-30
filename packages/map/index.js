const run = require('./run');

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
module.exports = (input, fn, opts) =>
  run({
    input,
    fn,
    opts
  });

module.exports.series = require('./series');
module.exports.limit = require('./limit');
