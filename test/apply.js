const test = require('ava');

const parallel = require('../packages/parallel');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');
const apply = require('../packages/apply');

test(
  'does apply',
  schedule(async t => {
    const then = timeout(1);

    let called = false;

    const fn = async (v, y) => {
      t.deepEqual(v, 2);
      t.deepEqual(y, '2');

      called = true;
      return await then(1 * 2);
    };

    const output = await parallel([apply(fn, 2, '2')]);

    t.deepEqual(called, true);
    t.deepEqual(output, [2]);
  })
);
