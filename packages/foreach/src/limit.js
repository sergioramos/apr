const defaults = require('lodash.defaults');
const each = require('apr-engine-each');

module.exports = (input, limit, fn, opts) => {
  return each({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
