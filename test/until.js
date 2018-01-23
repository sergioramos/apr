const random = require('random-natural');
const test = require('ava');

const until = require('../packages/until');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill async until',
  schedule(async t => {
    const maxCalls = random({
      min: 2,
      max: 5
    });

    const then = timeout(maxCalls * 2);
    let calls = 0;

    const output = await until(async () => {
      await then();
      calls += 1;
      return calls >= maxCalls;
    }, async () => then(maxCalls));

    t.deepEqual(calls, maxCalls);
    t.deepEqual(output, maxCalls);
    t.deepEqual(output, calls);
  })
);

test(
  'fulfill until',
  schedule(async t => {
    const maxCalls = random({
      min: 3,
      max: 5
    });

    const then = timeout(maxCalls);
    let calls = 0;

    const output = await until(
      () => {
        calls += 1;
        return calls >= maxCalls;
      },
      async () => then(maxCalls)
    );

    t.deepEqual(calls, maxCalls);
    t.deepEqual(output, maxCalls);
    t.deepEqual(output, calls);
  })
);

test(
  'fail async until test',
  schedule(async t => {
    const then = timeout(1);

    await t.throws(
      until(async () => {
        throw new Error('Unexpected Error');
      }, async () => then())
    );
  })
);

test(
  'fail async until fn',
  schedule(async t => {
    const then = timeout(1);

    await t.throws(
      until(
        async () => {
          await then();
          return true;
        },
        async () => {
          throw new Error('Unexpected Error');
        }
      )
    );
  })
);

test(
  'fail until test',
  schedule(async t => {
    const then = timeout(1);

    await t.throws(
      until(() => {
        throw new Error('Unexpected Error');
      }, async () => then())
    );
  })
);

test(
  'fail until fn',
  schedule(async t => {
    await t.throws(
      until(
        () => true,
        async () => {
          throw new Error('Unexpected Error');
        }
      )
    );
  })
);
