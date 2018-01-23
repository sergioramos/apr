const test = require('ava');

const seq = require('../packages/seq');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill seq',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const seqd = seq(
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

    const output = await seqd(1);

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

    t.deepEqual(output, 16);
  })
);

test(
  'fail seq',
  schedule(async t => {
    const then = timeout(4);

    const seqd = seq(
      async v => then(v * 2),
      async v => {
        throw new Error('Unexpected Error');
      },
      async v => then(v * 2),
      async v => then(v * 2)
    );

    await t.throws(seqd(1));
  })
);
