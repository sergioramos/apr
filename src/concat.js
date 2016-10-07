const defaults = require('lodash.defaults');

const each = require('./engine/each');

const concat = (ctx) => {
  let total;

  return each(defaults({
    after: (value, item, i) => {
      total = (i === 0) ? value : (total + value);
    }
  }, ctx)).then(() => {
    return total;
  });
};

module.exports = (input, fn, opts) => {
  return concat({
    input,
    fn,
    opts
  });
};

module.exports.series = (input, fn, opts) => {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = (input, limit, fn, opts) => {
  return concat({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
