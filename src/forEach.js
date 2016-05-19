const defaults = require('lodash.defaults');

const each = require('./engine/each');

module.exports = function(input, fn, opts) {
  return each({
    input,
    fn,
    opts
  });
};

module.exports.series = function(input, fn, opts) {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = function(input, limit, fn, opts) {
  return each({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
