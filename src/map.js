const defaults = require('lodash.defaults');

const each = require('./engine/each');
const Sum = require('./engine/sum');

const map = function(ctx) {
  const sum = Sum(ctx.input);

  return each(defaults({
    after: function(value, item) {
      sum[item.key] = value;
    }
  }, ctx)).then(function() {
    return sum;
  });
};

module.exports = function(input, fn, opts) {
  return map({
    input,
    fn,
    opts
  });
};

module.exports.series = function(input, fn, opts) {
  return map({
    input,
    fn,
    opts: defaults({
      limit: 1
    }, opts)
  });
};

module.exports.limit = function(input, limit, fn, opts) {
  return map({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
