const test = require('ava');
const random = require('random-decimal');
const timeout = require('timeout-then');
const apr = require('../')

const p = async function(v) {
  return timeout(random({
    min: 0,
    max: 1000
  })).then(function() {
    return v;
  });
};

test('fulfill [] each', async function(t) {
  let input = [1, 2, 3, 4];

  await apr.each(input.map(Number), async function(v, i) {
    input[i] = await p(v * 2);
  });

  t.deepEqual(input, [2, 4, 6, 8]);
});