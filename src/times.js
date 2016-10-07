const buildArray = require('build-array');
const defaults = require('lodash.defaults');
const map = require('./map');

module.exports = (count, fn, opts) => {
  return map(buildArray(count).map((n, i) => {
    return i;
  }), fn, opts);
};

module.exports.series = (count, fn, opts) => {
  return module.exports.limit(count, 1, fn, opts);
};

module.exports.limit = (count, limit, fn, opts) => {
  return module.exports(count, fn, defaults({
    limit
  }, opts));
};
