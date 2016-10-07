const random = require('random-natural');
const test = require('ava');
const apr = require('../');

const timeout = require('./common/timeout');

test('fulfill async whilst', async function(t) {
  const maxCalls = random({
    min: 3,
    max: 10
  });

  const then = timeout(maxCalls * 2);
  let calls = 0;

  const output = await apr.whilst(async function() {
    await then();
    return (calls += 1) < maxCalls;
  }, async function() {
    return await then(maxCalls);
  });

  t.deepEqual(calls, maxCalls);
  t.deepEqual(output, maxCalls);
  t.deepEqual(output, calls);
});

test('fulfill whilst', async function(t) {
  const maxCalls = random({
    min: 3,
    max: 10
  });

  const then = timeout(maxCalls);
  let calls = 0;

  const output = await apr.whilst(function() {
    return (calls += 1) < maxCalls;
  }, async function() {
    return await then(maxCalls);
  });

  t.deepEqual(calls, maxCalls);
  t.deepEqual(output, maxCalls);
  t.deepEqual(output, calls);
});

test('fail async whilst test', async function(t) {
  const then = timeout(1);

  t.throws(apr.whilst(async function() {
    throw new Error('Unexpected Error');
  }, async function() {
    await then();
  }));
});

test('fail async whilst fn', async function(t) {
  const then = timeout(1);

  t.throws(apr.whilst(async function() {
    await then();
    return true;
  }, async function() {
    throw new Error('Unexpected Error');
  }));
});

test('fail whilst test', async function(t) {
  const then = timeout(1);

  t.throws(apr.whilst(function() {
    throw new Error('Unexpected Error');
  }, async function() {
    await then();
  }));
});

test('fail whilst fn', async function(t) {
  t.throws(apr.whilst(function() {
    return true;
  }, async function() {
    throw new Error('Unexpected Error');
  }));
});
