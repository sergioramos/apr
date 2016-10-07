const test = require('ava');
const apr = require('../');

const timeout = require('./common/timeout');

test('fulfill []  waterfall', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.waterfall([
    async function() {
      order.push('before');
      const res = await then(1 * 2);
      order.push('after');
      return res;
    },
    async function(prev) {
      order.push('before');
      const res = await then(prev * 2);
      order.push('after');
      return res;
    },
    async function(prev) {
      order.push('before');
      const res = await then(prev * 2);
      order.push('after');
      return res;
    },
    async function(prev) {
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
});

test('fulfill {} waterfall', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.waterfall({
    a: async function() {
      order.push('before');
      const res = await then(1 * 2);
      order.push('after');
      return res;
    },
    b: async function(prev) {
      order.push('before');
      const res = await then(prev * 2);
      order.push('after');
      return res;
    },
    c: async function(prev) {
      order.push('before');
      const res = await then(prev * 2);
      order.push('after');
      return res;
    },
    d: async function(prev) {
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
});

test('fail [] waterfall', async function(t) {
  const then = timeout(4);

  t.throws(apr.waterfall([
    async function() {
      return await then(1 * 2);
    },
    async function(prev) {
      return await then(prev * 2);
    },
    async function(prev) {
      throw new Error('expected error');
    },
    async function(prev) {
      return await then(prev * 2);
    }
  ]));
});

test('fail {} waterfall', async function(t) {
  const then = timeout(4);

  t.throws(apr.waterfall({
    a: async function() {
      return await then(1 * 2);
    },
    b: async function(prev) {
      return await then(prev * 2);
    },
    c: async function(prev) {
      throw new Error('expected error');
    },
    d: async function(prev) {
      return await then(prev * 2);
    }
  }));
});
