const mapLimit = require('apr-map/limit');
const run = require('./run');

module.exports = (input, limit, fn, opts) => {
  return run(input, mapLimit(input, limit, fn, opts));
};
