const test = require('ava');
const apr = require('../');

test('does apply constant', async (t) => {
  const pkg = await apr.waterfall([
    apr.constant('{"name": "apr"}'),
    apr.asyncify(JSON.parse)
  ]);

  t.deepEqual(pkg.name, 'apr');
});
