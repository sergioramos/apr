import Defaults from 'lodash.defaults';
import Each from 'apr-engine-each';

const Iterator = () => ({
  [Symbol.iterator]: () => ({
    next: () => ({
      done: false,
    }),
  }),
});

export default ctx => {
  let last;

  const fallbackCall = () => {
    ctx.fn().then(value => {
      last = value;
      return ctx.test ? ctx.test() : value;
    });
  };

  return Each({
    after: ctx.after,
    input: Iterator(),
    opts: Defaults(ctx.opts, { limit: 1 }),
    call: ctx.call || fallbackCall,
  }).then(() => last);
};
