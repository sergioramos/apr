const defaults = require('lodash.defaults');
const run = require('./run');

module.exports = (count, limit, fn, opts) => {
  return run(count, fn, defaults({
    limit
  }, opts));
};
