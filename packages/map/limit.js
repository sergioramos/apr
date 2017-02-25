const defaults = require('lodash.defaults');
const run = require('./run');

/**
 * @kind function
 * @name limit
 * @memberof map
 * @param {Array|Object|Iterable} input
 * @param {Number} limit
 * @param {Function} iteratee
 * @returns {Promise}
 */
module.exports = (input, limit, fn, opts) => {
  return run({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
