const run = require('./run');
const map = require('apr-map/limit');

module.exports = (input, limit, fn, opts) => {
  return run(input, map(input, limit, fn, opts));
};
