const defaults = require('lodash.defaults');

const each = require('./engine/each');

const concat = function(ctx) {
  let total;

  return each(defaults({
    after: function(value, item, i) {
      total = (i === 0) ? value : (total + value);
    }
  }, ctx)).then(function() {
    return total;
  });
};

module.exports = function(input, fn, opts) {
  return concat({
    input,
    fn,
    opts
  });
};

module.exports.series = function(input, fn, opts) {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = function(input, limit, fn, opts) {
  return concat({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
