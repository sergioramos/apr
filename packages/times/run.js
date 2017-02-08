const buildArray = require('build-array');
const map = require('apr-map');

module.exports = (count, fn, opts) => {
  return map(buildArray(count).map((n, i) => {
    return i;
  }), fn, opts);
};
