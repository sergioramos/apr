const defaults = require('lodash.defaults');

const run = require('./run');

module.exports = (ctx) => {
  return run(ctx.input, ctx.fn, defaults(ctx.opts, {
    limit: Infinity,
    after: ctx.after,
    call: ctx.call
  }));
};
