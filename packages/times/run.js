const buildArray = require('build-array');
const defaults = require('lodash.defaults');
const map = require('apr-map');

module.exports = (count, fn, opts) => {
  return map(buildArray(count).map((n, i) => {
    return i;
  }), fn, opts);
};
