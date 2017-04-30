const defaults = require('lodash.defaults');

const run = require('apr-engine-run');

module.exports = ctx =>
  run(
    ctx.input,
    ctx.fn,
    defaults(ctx.opts, {
      limit: Infinity,
      after: ctx.after,
      call: ctx.call
    })
  );
