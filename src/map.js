const defaults = require('lodash.defaults');

const each = require('./engine/each');
const Sum = require('./engine/sum');

const map = (ctx) => {
  const sum = Sum(ctx.input);

  return each(defaults({
    after: (value, item) => {
      sum[item.key] = value;
    }
  }, ctx)).then(() => {
    return sum;
  });
};

module.exports = (input, fn, opts) => {
  return map({
    input,
    fn,
    opts
  });
};

module.exports.series = (input, fn, opts) => {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = (input, limit, fn, opts) => {
  return map({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
