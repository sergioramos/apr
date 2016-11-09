const test = require('ava');
const apr = require('../');

const timeout = require('./common/timeout');

test('fulfill []  parallel', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.parallel([
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
    }
  ]);

  t.deepEqual(order, [
    'before',
    'before',
    'before',
    'before',
    'after',
    'after',
    'after',
    'after'
  ]);

  t.deepEqual(output, [2, 4, 6, 8]);
});

test('fulfill {} parallel', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.parallel({
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
    }
  });

  t.deepEqual(order, [
    'before',
    'before',
    'before',
    'before',
    'after',
    'after',
    'after',
    'after'
  ]);

  t.deepEqual(output, {
    a: 2,
    b: 4,
    c: 6,
    d: 8
  });
});

test('fail [] parallel', async (t) => {
  const then = timeout(4);

  t.throws(apr.parallel([
    async () => {
      return await then(1 * 2);
    },
    async () => {
      return await then(2 * 2);
    },
    async () => {
      throw new Error('expected error');
    },
    async () => {
      return await then(4 * 2);
    }
  ]));
});

test('fail {} parallel', async (t) => {
  const then = timeout(4);

  t.throws(apr.parallel({
    a: async () => {
      return await then(1 * 2);
    },
    b: async () => {
      return await then(2 * 2);
    },
    c: async () => {
      throw new Error('expected error');
    },
    d: async () => {
      return await then(4 * 2);
    }
  }));
});
