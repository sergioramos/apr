const defaults = require('lodash.defaults');
const each = require('apr-engine-each');

module.exports = (input, fn, opts) => {
  return each({
    input,
    fn,
    opts
  });
};
