const defaults = require('lodash.defaults');

const each = require('./engine/each');

module.exports = (input, fn, opts) => {
  return each({
    input,
    fn,
    opts
  });
};

module.exports.series = (input, fn, opts) => {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = (input, limit, fn, opts) => {
  return each({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
