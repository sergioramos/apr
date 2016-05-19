const defaults = require('lodash.defaults');

const each = require('./engine/each');

const every = function(ctx) {
  let found = true;

  return each(defaults({
    after: function(value, item) {
      found = Boolean(value);
      return !found;
    }
  }, ctx)).then(function() {
    return found;
  });
};

module.exports = function(input, fn, opts) {
  return every({
    input,
    fn,
    opts
  });
};

module.exports.series = function(input, fn, opts) {
  return every({
    input,
    fn,
    opts: defaults({
      limit: 1
    }, opts)
  });
};

module.exports.limit = function(input, limit, fn, opts) {
  return every({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
