const test = require('ava');

const series = require('../packages/series');
const timeout = require('../packages/test-timeout');

test('fulfill [] series', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await series([
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
    'after',
    'before',
    'after',
    'before',
    'after',
    'before',
    'after'
  ]);

  t.deepEqual(output, [2, 4, 6, 8]);
});

test('fulfill {} series', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await series({
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
    'after',
    'before',
    'after',
    'before',
    'after',
    'before',
    'after'
  ]);

  t.deepEqual(output, {
    a: 2,
    b: 4,
    c: 6,
    d: 8
  });
});

test('fail [] series', async (t) => {
  const then = timeout(4);

  t.throws(series([
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

test('fail {} series', async (t) => {
  const then = timeout(4);

  t.throws(series({
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
