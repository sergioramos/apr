const defaults = require('lodash.defaults');

const each = require('./engine/each');

module.exports = function(input, fn, sum, opts) {
  return each({
    input,
    opts: defaults(opts, {
      limit: 1
    }),
    after: function(value, item) {
      sum = value;
    },
    call: function(item) {
      return fn(sum, item.value, item.key, input);
    }
  }).then(function() {
    return sum;
  });
};
