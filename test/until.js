const random = require('random-natural');
const test = require('ava');
const apr = require('../');

const timeout = require('./common/timeout');

test('fulfill async until', async (t) => {
  const maxCalls = random({
    min: 3,
    max: 10
  });

  const then = timeout(maxCalls * 2);
  let calls = 0;

  const output = await apr.until(async () => {
    await then();
    return (calls += 1) >= maxCalls;
  }, async () => {
    return await then(maxCalls);
  });

  t.deepEqual(calls, maxCalls);
  t.deepEqual(output, maxCalls);
  t.deepEqual(output, calls);
});

test('fulfill until', async (t) => {
  const maxCalls = random({
    min: 3,
    max: 10
  });

  const then = timeout(maxCalls);
  let calls = 0;

  const output = await apr.until(() => {
    return (calls += 1) >= maxCalls;
  }, async () => {
    return await then(maxCalls);
  });

  t.deepEqual(calls, maxCalls);
  t.deepEqual(output, maxCalls);
  t.deepEqual(output, calls);
});

test('fail async until test', async (t) => {
  const then = timeout(1);

  t.throws(apr.until(async () => {
    throw new Error('Unexpected Error');
  }, async () => {
    await then();
  }));
});

test('fail async until fn', async (t) => {
  const then = timeout(1);

  t.throws(apr.until(async () => {
    await then();
    return true;
  }, async () => {
    throw new Error('Unexpected Error');
  }));
});

test('fail until test', async (t) => {
  const then = timeout(1);

  t.throws(apr.until(() => {
    throw new Error('Unexpected Error');
  }, async () => {
    await then();
  }));
});

test('fail until fn', async (t) => {
  t.throws(apr.until(() => {
    return true;
  }, async () => {
    throw new Error('Unexpected Error');
  }));
});
