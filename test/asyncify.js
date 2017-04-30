const test = require('ava');
const path = require('path');

const awaitify = require('../packages/awaitify');
const waterfall = require('../packages/waterfall');
const apply = require('../packages/apply');
const asyncify = require('../packages/asyncify');

const readFile = awaitify(require('fs').readFile);
const pkgPath = path.join(__dirname, '../packages/asyncify/package.json');

test('does asyncify', async t => {
  const pkg = await waterfall([
    apply(readFile, pkgPath, 'utf8'),
    asyncify(JSON.parse)
  ]);

  t.deepEqual(pkg.name, 'apr-asyncify');
});
