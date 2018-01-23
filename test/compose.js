const test = require('ava');

const compose = require('../packages/compose');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill compose',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const composed = compose(
      async v => {
        order.push('before');
        const res = await then(v + 1);
        order.push('after');
        return res;
      },
      async v => {
        order.push('before');
        const res = await then(v * 2);
        order.push('after');
        return res;
      },
      async v => {
        order.push('before');
        const res = await then(v * 2);
        order.push('after');
        return res;
      },
      async v => {
        order.push('before');
        const res = await then(v * 2);
        order.push('after');
        return res;
      }
    );

    const output = await composed(1);

    t.deepEqual(order, [
      'before',
      'after',
      'before',
      'after',
      'before',
      'after',
      'before',
      'after'
    ]);

    t.deepEqual(output, 9);
  })
);

test(
  'fail compose',
  schedule(async t => {
    const then = timeout(4);

    const composed = compose(
      async v => then(v * 2),
      async v => {
        throw new Error('Unexpected Error');
      },
      async v => then(v * 2),
      async v => then(v * 2)
    );

    await t.throws(composed(1));
  })
);
