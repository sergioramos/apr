const defaults = require('lodash.defaults');

const run = require('./run');

module.exports = function(ctx) {
  return run(ctx.input, ctx.fn, defaults(ctx.opts, {
    limit: Infinity,
    after: ctx.after,
    call: ctx.call
  }));
};
