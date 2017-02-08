const defaults = require('lodash.defaults');
const each = require('apr-engine-each');

const Iterator = () => {
  return {
    [Symbol.iterator]: () => {
      return {
        next: () => {
          return {
            done: false
          };
        }
      };
    }
  };
};

module.exports = (ctx) => {
  let last;

  return each({
    after: ctx.after,
    input: Iterator(),
    opts: defaults(ctx.opts, {
      limit: 1
    }),
    call: ctx.call || (() => {
      return ctx.fn().then((value) => {
        last = value;
        return ctx.test ? ctx.test() : value;
      });
    })
  }).then(() => {
    return last;
  });
};
