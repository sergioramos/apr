const defaults = require('lodash.defaults');
const run = require('./run');

module.exports = (input, limit, fn, opts) => {
  return run({
    input,
    fn,
    opts: defaults({
      limit
    }, opts)
  });
};
