const defaults = require('lodash.defaults');
const isArray = require('lodash.isarraylike');

const each = require('./engine/each');
const Sum = require('./engine/sum');

const find = function(ctx) {
  let first = null;

  return each(defaults({
    after: function(value, item) {
      first = Boolean(value) && item;
      return first;
    }
  }, ctx)).then(function() {
    return first && (isArray(Sum(ctx.input)) ? first.value : {
      key: first.key,
      value: first.value
    });
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
  return module.exports.limit(input, 1, fn, opts);
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
