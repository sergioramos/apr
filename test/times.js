const test = require('ava');
const apr = require('../');

const timeout = require('./common/timeout');

test('fulfill times', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.times(5, async function(i) {
    const res = await then(i * 2);
    order.push(i);
    return res;
  });

  t.deepEqual(output, [0, 2, 4, 6, 8]);
  t.notDeepEqual(order, [0, 1, 2, 3, 4]);
});

test('fail times', async function(t) {
  const then = timeout(4);

  t.throws(apr.times(5, async function(v, i) {
    if (i === 3) {
      throw new Error('expected error');
    }

    return await then(i * 2);
  }));
});

test('fulfill timesSeries', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.timesSeries(5, async function(i) {
    const res = await then(i * 2);
    order.push(i);
    return res;
  });

  t.deepEqual(output, [0, 2, 4, 6, 8]);
  t.deepEqual(order, [0, 1, 2, 3, 4]);
});

test('fail timesSeries', async function(t) {
  const then = timeout(4);

  t.throws(apr.timesSeries(5, async function(i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(i * 2);
  }));
});
