const buildArray = require('build-array');
const map = require('apr-map');

module.exports = (count, fn, opts) =>
  map(buildArray(count).map((n, i) => i), fn, opts);
