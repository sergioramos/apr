const run = require('./run');
const map = require('apr-map');

module.exports = (input, fn, opts) => {
  return run(input, map(input, fn, opts));
};
