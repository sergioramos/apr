const random = require('random-natural');
const test = require('ava');

const timeout = require('../packages/test-timeout');
const whilst = require('../packages/whilst');

test('fulfill async whilst', async (t) => {
  const maxCalls = random({
    min: 3,
    max: 10
  });

  const then = timeout(maxCalls * 2);
  let calls = 0;

  const output = await whilst(async () => {
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

  const output = await whilst(() => {
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

  t.throws(whilst(async () => {
    throw new Error('Unexpected Error');
  }, async () => {
    await then();
  }));
});

test('fail async whilst fn', async (t) => {
  const then = timeout(1);

  t.throws(whilst(async () => {
    await then();
    return true;
  }, async () => {
    throw new Error('Unexpected Error');
  }));
});

test('fail whilst test', async (t) => {
  const then = timeout(1);

  t.throws(whilst(() => {
    throw new Error('Unexpected Error');
  }, async () => {
    await then();
  }));
});

test('fail whilst fn', async (t) => {
  t.throws(whilst(() => {
    return true;
  }, async () => {
    throw new Error('Unexpected Error');
  }));
});
