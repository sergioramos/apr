const test = require('ava');

const times = require('../packages/times');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill times',
  schedule(async t => {
    const then = timeout(5);
    const order = [];

    const output = await times(5, async i => {
      const res = await then(i * 2);
      order.push(i);
      return res;
    });

    t.deepEqual(output, [0, 2, 4, 6, 8]);
    t.notDeepEqual(order, [0, 1, 2, 3, 4]);
  })
);

test(
  'fail times',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      times(5, async (v, i) => {
        if (i === 3) {
          throw new Error('expected error');
        }

        return await then(i * 2);
      })
    );
  })
);

test(
  'fulfill timesSeries',
  schedule(async t => {
    const then = timeout(5);
    const order = [];

    const output = await times.series(5, async i => {
      const res = await then(i * 2);
      order.push(i);
      return res;
    });

    t.deepEqual(output, [0, 2, 4, 6, 8]);
    t.deepEqual(order, [0, 1, 2, 3, 4]);
  })
);

test(
  'fail timesSeries',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      times.series(5, async i => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return await then(i * 2);
      })
    );
  })
);
