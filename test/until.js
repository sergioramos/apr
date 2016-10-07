const random = require('random-natural');
const test = require('ava');
const apr = require('../');

const timeout = require('./common/timeout');

test('fulfill async until', async function(t) {
  const maxCalls = random({
    min: 3,
    max: 10
  });

  const then = timeout(maxCalls * 2);
  let calls = 0;

  const output = await apr.until(async function() {
    await then();
    return (calls += 1) >= maxCalls;
  }, async function() {
    return await then(maxCalls);
  });

  t.deepEqual(calls, maxCalls);
  t.deepEqual(output, maxCalls);
  t.deepEqual(output, calls);
});

test('fulfill until', async function(t) {
  const maxCalls = random({
    min: 3,
    max: 10
  });

  const then = timeout(maxCalls);
  let calls = 0;

  const output = await apr.until(function() {
    return (calls += 1) >= maxCalls;
  }, async function() {
    return await then(maxCalls);
  });

  t.deepEqual(calls, maxCalls);
  t.deepEqual(output, maxCalls);
  t.deepEqual(output, calls);
});

test('fail async until test', async function(t) {
  const then = timeout(1);

  t.throws(apr.until(async function() {
    throw new Error('Unexpected Error');
  }, async function() {
    await then();
  }));
});

test('fail async until fn', async function(t) {
  const then = timeout(1);

  t.throws(apr.until(async function() {
    await then();
    return true;
  }, async function() {
    throw new Error('Unexpected Error');
  }));
});

test('fail until test', async function(t) {
  const then = timeout(1);

  t.throws(apr.until(function() {
    throw new Error('Unexpected Error');
  }, async function() {
    await then();
  }));
});

test('fail until fn', async function(t) {
  t.throws(apr.until(function() {
    return true;
  }, async function() {
    throw new Error('Unexpected Error');
  }));
});
