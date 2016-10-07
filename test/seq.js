const test = require('ava');
const apr = require('../');

const timeout = require('./common/timeout');

test('fulfill seq', async function(t) {
  const then = timeout(4);
  const order = [];

  const seqd = apr.seq(async function(v) {
    order.push('before');
    const res = await then(v + 1);
    order.push('after');
    return res;
  }, async function(v) {
    order.push('before');
    const res = await then(v * 2);
    order.push('after');
    return res;
  }, async function(v) {
    order.push('before');
    const res = await then(v * 2);
    order.push('after');
    return res;
  }, async function(v) {
    order.push('before');
    const res = await then(v * 2);
    order.push('after');
    return res;
  });

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
});

test('fail seq', async function(t) {
  const then = timeout(4);

  const seqd = apr.seq(async function(v) {
    return await then(v * 2);
  }, async function(v) {
    throw new Error('Unexpected Error');
  }, async function(v) {
    return await then(v * 2);
  }, async function(v) {
    return await then(v * 2);
  });

  t.throws(seqd(1));
});
