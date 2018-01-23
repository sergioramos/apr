const defaults = require('lodash.defaults');
const each = require('apr-engine-each');

const Iterator = () => ({
  [Symbol.iterator]: () => ({
    next: () => ({
      done: false
    })
  })
});

module.exports = ctx => {
  let last;

  return each({
    after: ctx.after,
    input: Iterator(),
    opts: defaults(ctx.opts, {
      limit: 1
    }),
    call:
      ctx.call ||
      (() =>
        ctx.fn().then(value => {
          last = value;
          return ctx.test ? ctx.test() : value;
        }))
  }).then(() => last);
};
