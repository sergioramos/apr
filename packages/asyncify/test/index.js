const test = require('ava');
const thenify = require('thenify');
const path = require('path');

const waterfall = require('apr-waterfall');
const apply = require('apr-apply');
const asyncify = require('../');

const readFile = thenify(require('fs').readFile);

test('does asyncify', async (t) => {
  const pkg = await waterfall([
    apply(readFile, path.join(__dirname, '../package.json'), 'utf8'),
    asyncify(JSON.parse)
  ]);

  t.deepEqual(pkg.name, 'apr-asyncify');
});
