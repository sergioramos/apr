const defaults = require('lodash.defaults');
const run = require('./run');

/**
 * @kind function
 * @name limit
 * @memberof times
 * @param {Number} n
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
module.exports = (count, limit, fn, opts) =>
  run(
    count,
    fn,
    defaults(
      {
        limit
      },
      opts
    )
  );
