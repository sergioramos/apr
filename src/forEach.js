const defaults = require('lodash.defaults');
const run = require('./common/run');

const forEach = function(input, fn, opts) {
  return run(input, fn, defaults(opts, {
    limit: Infinity
  }));
};

forEach.series = function(input, fn, opts) {
  return forEach(input, fn, defaults({
    limit: 1
  }, opts));
};

forEach.limit = function(input, fn, limit, opts) {
  return forEach(input, fn, defaults({
    limit
  }, opts));
};

module.exports = forEach;
