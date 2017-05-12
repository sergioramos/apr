const random = require('random-natural');
const test = require('ava');

const timeout = require('../packages/test-timeout');
const schedule = require('../packages/test-scheduler')();
const whilst = require('../packages/whilst');

test(
  'fulfill async whilst',
  schedule(async t => {
    const maxCalls = random({
      min: 3,
      max: 5
    });

    const then = timeout(maxCalls * 2);
    let calls = 0;

    const output = await whilst(async () => {
      await then();
      return (calls += 1) < maxCalls;
    }, async () => await then(maxCalls));

    t.deepEqual(calls, maxCalls);
    t.deepEqual(output, maxCalls);
    t.deepEqual(output, calls);
  })
);

test(
  'fulfill whilst',
  schedule(async t => {
    const maxCalls = random({
      min: 3,
      max: 5
    });

    const then = timeout(maxCalls);
    let calls = 0;

    const output = await whilst(
      () => (calls += 1) < maxCalls,
      async () => await then(maxCalls)
    );

    t.deepEqual(calls, maxCalls);
    t.deepEqual(output, maxCalls);
    t.deepEqual(output, calls);
  })
);

test(
  'fail async whilst test',
  schedule(async t => {
    const then = timeout(1);

    await t.throws(
      whilst(async () => {
        throw new Error('Unexpected Error');
      }, async () => await then())
    );
  })
);

test(
  'fail async whilst fn',
  schedule(async t => {
    const then = timeout(1);

    await t.throws(
      whilst(
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
  'fail whilst test',
  schedule(async t => {
    const then = timeout(1);

    await t.throws(
      whilst(() => {
        throw new Error('Unexpected Error');
      }, async () => await then())
    );
  })
);

test(
  'fail whilst fn',
  schedule(
    async t =>
      await t.throws(
        whilst(
          () => true,
          async () => {
            throw new Error('Unexpected Error');
          }
        )
      )
  )
);
