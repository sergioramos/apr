const defaults = require('lodash.defaults');
const isArray = require('lodash.isarraylike');

const each = require('./engine/each');
const Sum = require('./engine/sum');

const find = function(ctx) {
  let first = null;

  return each(defaults({
    after: function(value, item) {
      const thruthy = Boolean(value);

      if (thruthy) {
        first = item;
        return true;
      }

      return false;
    }
  }, ctx)).then(function() {
    const sum = Sum(ctx.input);
    return isArray(sum) ? first.value : {
      key: first.key,
      value: first.value
    };
  });
};

module.exports = function(input, fn, opts) {
  return find({
    input,
    fn,
    opts
  });
};

module.exports.series = function(input, fn, opts) {
  return find({
    input,
    fn,
    opts: defaults({
      limit: 1
    }, opts)
  });
};

module.exports.limit = function(input, limit, fn, opts) {
  return find({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
