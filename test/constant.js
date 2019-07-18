const test = require('ava');

const constant = require('../packages/constant');
const waterfall = require('../packages/waterfall');
const asyncify = require('../packages/asyncify');

test('does apply constant', async t => {
  const pkg = await waterfall([
    constant('{"name": "apr"}'),
    asyncify(JSON.parse),
  ]);

  t.deepEqual(pkg.name, 'apr');
});
