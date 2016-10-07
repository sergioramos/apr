const test = require('ava');
const thenify = require('thenify');
const path = require('path');
const apr = require('../');

const readFile = thenify(require('fs').readFile);

test('does asyncify', async function(t) {
  const pkg = await apr.waterfall([
    apr.apply(readFile, path.join(__dirname, '../package.json'), 'utf8'),
    apr.asyncify(JSON.parse)
  ]);

  t.deepEqual(pkg.name, 'apr');
});
