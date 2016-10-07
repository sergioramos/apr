const defaults = require('lodash.defaults');

const each = require('./engine/each');

module.exports = (input, fn, sum, opts) => {
  return each({
    input,
    opts: defaults(opts, {
      limit: 1
    }),
    after: (value, item) => {
      sum = value;
    },
    call: (item) => {
      return fn(sum, item.value, item.key, input);
    }
  }).then(() => {
    return sum;
  });
};
