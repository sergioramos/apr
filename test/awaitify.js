const ctch = require('../packages/intercept');
const schedule = require('../packages/test-scheduler')();
const awaitify = require('../packages/awaitify');
const test = require('ava');
const path = require('path');
const fs = require('fs');

const pkgPath = path.join(__dirname, '../package.json');
const wPkgPath = path.join(__dirname, '../package.jsn');

test('should transform callbacks into promises', schedule(async (t) => {
  const readFile = awaitify(fs.readFile);

  const [err1, pkg] = await ctch(readFile(pkgPath, 'utf-8'));
  const [err2, res2] = await ctch(readFile(wPkgPath, 'utf-8'));

  t.truthy(pkg);
  t.falsy(err1);
  t.truthy(err2);
  t.falsy(res2);
}));
