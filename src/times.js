const buildArray = require('build-array');
const defaults = require('lodash.defaults');
const map = require('./map');

module.exports = function(count, fn, opts) {
  return map(buildArray(count).map(function(n, i) {
    return i;
  }), fn, opts);
};

module.exports.series = function(count, fn, opts) {
  return module.exports.limit(count, 1, fn, opts);
};

module.exports.limit = function(count, limit, fn, opts) {
  return module.exports(count, fn, defaults({
    limit
  }, opts));
};
