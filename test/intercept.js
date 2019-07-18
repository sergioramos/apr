const test = require('ava');
const ctch = require('../packages/intercept');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'should intercept errors',
  schedule(async t => {
    const then = timeout(2);

    const fn = async v => {
      if (v === 'throw') {
        throw new Error(v);
      }

      return then(v);
    };

    const [err1, res1] = await ctch(fn(1));
    const [err2, res2] = await ctch(fn('throw'));
    const [, res3] = await ctch(fn('throw'));

    t.deepEqual(res1, 1);
    t.deepEqual(err1, null);
    t.truthy(err2);
    t.falsy(res2);
    t.falsy(res3);
  }),
);
