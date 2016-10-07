const defaults = require('lodash.defaults');

const each = require('./engine/each');

const every = (ctx) => {
  let found = true;

  return each(defaults({
    after: (value, item) => {
      found = Boolean(value);
      return !found;
    }
  }, ctx)).then(() => {
    return found;
  });
};

module.exports = (input, fn, opts) => {
  return every({
    input,
    fn,
    opts
  });
};

module.exports.series = (input, fn, opts) => {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = (input, limit, fn, opts) => {
  return every({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
