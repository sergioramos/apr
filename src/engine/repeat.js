const defaults = require('lodash.defaults');
const each = require('./each');

const Iterator = function() {
  return {
    [Symbol.iterator]: function() {
      return {
        next: function() {
          return {
            done: false
          };
        }
      };
    }
  };
};

module.exports = function(ctx) {
  let last;

  return each({
    after: ctx.after,
    input: Iterator(),
    opts: defaults(ctx.opts, {
      limit: 1
    }),
    call: ctx.call || function() {
      return ctx.fn().then(function(value) {
        last = value;
        return ctx.test ? ctx.test() : value;
      });
    }
  }).then(function() {
    return last;
  });
};
