import Test from 'ava';
import { join } from 'path';
import { readFile as rfa } from 'fs';

import Awaitify from '../packages/awaitify/index';
import Waterfall from '../packages/waterfall/index';
import Apply from '../packages/apply/index';
import Asyncify from '../packages/asyncify/index';

const readFile = Awaitify(rfa);
const pkgPath = join(__dirname, '../packages/asyncify/package.json');

Test('does asyncify', async t => {
  const pkg = await Waterfall([
    Apply(readFile, pkgPath, 'utf8'),
    Asyncify(JSON.parse),
  ]);

  t.deepEqual(pkg.name, 'apr-asyncify');
});
