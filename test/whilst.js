const random = require('random-natural');
const test = require('ava');
const apr = require('../');

const timeout = require('./common/timeout');

test('fulfill async whilst', async (t) => {
  const maxCalls = random({
    min: 3,
    max: 10
  });

  const then = timeout(maxCalls * 2);
  let calls = 0;

  const output = await apr.whilst(async () => {
    await then();
    return (calls += 1) < maxCalls;
  }, async () => {
    return await then(maxCalls);
  });

  t.deepEqual(calls, maxCalls);
  t.deepEqual(output, maxCalls);
  t.deepEqual(output, calls);
});

test('fulfill whilst', async (t) => {
  const maxCalls = random({
    min: 3,
    max: 10
  });

  const then = timeout(maxCalls);
  let calls = 0;

  const output = await apr.whilst(() => {
    return (calls += 1) < maxCalls;
  }, async () => {
    return await then(maxCalls);
  });

  t.deepEqual(calls, maxCalls);
  t.deepEqual(output, maxCalls);
  t.deepEqual(output, calls);
});

test('fail async whilst test', async (t) => {
  const then = timeout(1);

  t.throws(apr.whilst(async () => {
    throw new Error('Unexpected Error');
  }, async () => {
    await then();
  }));
});

test('fail async whilst fn', async (t) => {
  const then = timeout(1);

  t.throws(apr.whilst(async () => {
    await then();
    return true;
  }, async () => {
    throw new Error('Unexpected Error');
  }));
});

test('fail whilst test', async (t) => {
  const then = timeout(1);

  t.throws(apr.whilst(() => {
    throw new Error('Unexpected Error');
  }, async () => {
    await then();
  }));
});

test('fail whilst fn', async (t) => {
  t.throws(apr.whilst(() => {
    return true;
  }, async () => {
    throw new Error('Unexpected Error');
  }));
});
