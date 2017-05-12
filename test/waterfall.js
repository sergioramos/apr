const test = require('ava');

const waterfall = require('../packages/waterfall');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill []  waterfall',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await waterfall([
      async () => {
        order.push('before');
        const res = await then(1 * 2);
        order.push('after');
        return res;
      },
      async prev => {
        order.push('before');
        const res = await then(prev * 2);
        order.push('after');
        return res;
      },
      async prev => {
        order.push('before');
        const res = await then(prev * 2);
        order.push('after');
        return res;
      },
      async prev => {
        order.push('before');
        const res = await then(prev * 2);
        order.push('after');
        return res;
      }
    ]);

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
  'fulfill {} waterfall',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await waterfall({
      a: async () => {
        order.push('before');
        const res = await then(1 * 2);
        order.push('after');
        return res;
      },
      b: async prev => {
        order.push('before');
        const res = await then(prev * 2);
        order.push('after');
        return res;
      },
      c: async prev => {
        order.push('before');
        const res = await then(prev * 2);
        order.push('after');
        return res;
      },
      d: async prev => {
        order.push('before');
        const res = await then(prev * 2);
        order.push('after');
        return res;
      }
    });

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
  'fail [] waterfall',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      waterfall([
        async () => await then(1 * 2),
        async prev => await then(prev * 2),
        async prev => {
          throw new Error('expected error');
        },
        async prev => await then(prev * 2)
      ])
    );
  })
);

test(
  'fail {} waterfall',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      waterfall({
        a: async () => await then(1 * 2),
        b: async prev => await then(prev * 2),
        c: async prev => {
          throw new Error('expected error');
        },
        d: async prev => await then(prev * 2)
      })
    );
  })
);
