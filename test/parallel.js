const test = require('ava');

const parallel = require('../packages/parallel');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill []  parallel',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await parallel([
      async () => {
        order.push('before');
        const res = await then(1 * 2);
        order.push('after');
        return res;
      },
      async () => {
        order.push('before');
        const res = await then(2 * 2);
        order.push('after');
        return res;
      },
      async () => {
        order.push('before');
        const res = await then(3 * 2);
        order.push('after');
        return res;
      },
      async () => {
        order.push('before');
        const res = await then(4 * 2);
        order.push('after');
        return res;
      },
    ]);

    t.deepEqual(order, [
      'before',
      'before',
      'before',
      'before',
      'after',
      'after',
      'after',
      'after',
    ]);

    t.deepEqual(output, [2, 4, 6, 8]);
  }),
);

test(
  'fulfill {} parallel',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await parallel({
      a: async () => {
        order.push('before');
        const res = await then(1 * 2);
        order.push('after');
        return res;
      },
      b: async () => {
        order.push('before');
        const res = await then(2 * 2);
        order.push('after');
        return res;
      },
      c: async () => {
        order.push('before');
        const res = await then(3 * 2);
        order.push('after');
        return res;
      },
      d: async () => {
        order.push('before');
        const res = await then(4 * 2);
        order.push('after');
        return res;
      },
    });

    t.deepEqual(order, [
      'before',
      'before',
      'before',
      'before',
      'after',
      'after',
      'after',
      'after',
    ]);

    t.deepEqual(output, {
      a: 2,
      b: 4,
      c: 6,
      d: 8,
    });
  }),
);

test(
  'fail [] parallel',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      parallel([
        async () => then(1 * 2),
        async () => then(2 * 2),
        async () => {
          throw new Error('expected error');
        },
        async () => then(4 * 2),
      ]),
    );
  }),
);

test(
  'fail {} parallel',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      parallel({
        a: async () => then(1 * 2),
        b: async () => then(2 * 2),
        c: async () => {
          throw new Error('expected error');
        },
        d: async () => then(4 * 2),
      }),
    );
  }),
);
