const test = require('ava');
const apr = require('../');

const timeout = require('./common/timeout');

test('does apply', async function(t) {
  const then = timeout(1);

  let called = false;

  const fn = async function(v, y) {
    t.deepEqual(v, 2);
    t.deepEqual(y, '2');

    called = true;
    return await then(1 * 2);
  };

  const output = await apr.parallel([
    apr.apply(fn, 2, '2')
  ]);

  t.deepEqual(called, true);
  t.deepEqual(output, [2]);
});
