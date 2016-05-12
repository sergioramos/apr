const defaults = require('lodash.defaults');
const run = require('./common/run');

const forEach = function(input, fn, opts) {
  return run(input, fn, defaults(opts, {
    limit: Infinity
  }));
};

forEach.series = function(input, fn) {
  return forEach(input, fn, {
    limit: 1
  });
};

forEach.limit = function(input, fn, limit) {
  return forEach(input, fn, {
    limit
  });
};

module.exports = forEach;
