import Defaults from 'lodash.defaults';
import Run from 'apr-engine-run';

export default ctx => {
  return Run(
    ctx.input,
    ctx.fn,
    Defaults(ctx.opts, {
      limit: Infinity,
      after: ctx.after,
      call: ctx.call,
    }),
  );
};
