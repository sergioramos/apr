const test = require('ava');
const apr = require('../');

const timeout = require('./common/timeout');

test('fulfill []  parallel', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.parallel([
    apr.reflect(async function() {
      order.push('before');
      const res = await then(1 * 2);
      order.push('after');
      return res;
    }),
    apr.reflect(async function() {
      order.push('before');
      const res = await then(2 * 2);
      order.push('after');
      return res;
    }),
    apr.reflect(async function() {
      order.push('before');
      const res = await then(3 * 2);
      order.push('after');
      return res;
    }),
    apr.reflect(async function() {
      order.push('before');
      const res = await then(4 * 2);
      order.push('after');
      return res;
    })
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

  t.deepEqual(output, [{
    value: 2,
    error: null
  }, {
    value: 4,
    error: null
  }, {
    value: 6,
    error: null
  }, {
    value: 8,
    error: null
  }]);
});

test('fulfill {} parallel', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.parallel({
    a: apr.reflect(async function() {
      order.push('before');
      const res = await then(1 * 2);
      order.push('after');
      return res;
    }),
    b: apr.reflect(async function() {
      order.push('before');
      const res = await then(2 * 2);
      order.push('after');
      return res;
    }),
    c: apr.reflect(async function() {
      order.push('before');
      const res = await then(3 * 2);
      order.push('after');
      return res;
    }),
    d: apr.reflect(async function() {
      order.push('before');
      const res = await then(4 * 2);
      order.push('after');
      return res;
    })
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
    a: {
      value: 2,
      error: null
    },
    b: {
      value: 4,
      error: null
    },
    c: {
      value: 6,
      error: null
    },
    d: {
      value: 8,
      error: null
    }
  });
});

test('fail [] parallel', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.parallel([
    apr.reflect(async function() {
      order.push('before');
      const res = await then(1 * 2);
      order.push('after');
      return res;
    }),
    apr.reflect(async function() {
      order.push('before');
      const res = await then(2 * 2);
      order.push('after');
      return res;
    }),
    apr.reflect(async function() {
      throw new Error('expected error');
    }),
    apr.reflect(async function() {
      order.push('before');
      const res = await then(4 * 2);
      order.push('after');
      return res;
    })
  ]);

  t.deepEqual(order, [
    'before',
    'before',
    'before',
    'after',
    'after',
    'after'
  ]);

  t.deepEqual(output[0], {
    value: 2,
    error: null
  });

  t.deepEqual(output[1], {
    value: 4,
    error: null
  });

  t.deepEqual(output[3], {
    value: 8,
    error: null
  });

  t.truthy(output[2].error);
  t.truthy(output[2].error instanceof Error);

  t.falsy(output[2].value);
});

test('fail {} parallel', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.parallel({
    a: apr.reflect(async function() {
      order.push('before');
      const res = await then(1 * 2);
      order.push('after');
      return res;
    }),
    b: apr.reflect(async function() {
      order.push('before');
      const res = await then(2 * 2);
      order.push('after');
      return res;
    }),
    c: apr.reflect(async function() {
      throw new Error('expected error');
    }),
    d: apr.reflect(async function() {
      order.push('before');
      const res = await then(4 * 2);
      order.push('after');
      return res;
    })
  });

  t.deepEqual(order, [
    'before',
    'before',
    'before',
    'after',
    'after',
    'after'
  ]);

  t.deepEqual(output.a, {
    value: 2,
    error: null
  });

  t.deepEqual(output.b, {
    value: 4,
    error: null
  });

  t.deepEqual(output.d, {
    value: 8,
    error: null
  });

  t.truthy(output.c.error);
  t.truthy(output.c.error instanceof Error);

  t.falsy(output.c.value);
});
