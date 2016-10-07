const defaults = require('lodash.defaults');
const isArray = require('lodash.isarraylike');

const each = require('./engine/each');
const Sum = require('./engine/sum');

const find = (ctx) => {
  let first = null;

  return each(defaults({
    after: (value, item) => {
      first = Boolean(value) && item;
      return first;
    }
  }, ctx)).then(() => {
    return first && (isArray(Sum(ctx.input)) ? first.value : {
      key: first.key,
      value: first.value
    });
  });
};

module.exports = (input, fn, opts) => {
  return find({
    input,
    fn,
    opts
  });
};

module.exports.series = (input, fn, opts) => {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = (input, limit, fn, opts) => {
  return find({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
