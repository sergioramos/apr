import Test from 'ava';

import Parallel from '../packages/parallel/index';
import Schedule from '../packages/test-scheduler/index';
import Timeout from '../packages/test-timeout/index';
import Apply from '../packages/apply/index';

Test(
  'does apply',
  Schedule(async t => {
    const then = Timeout(1);

    let called = false;

    const fn = async (v, y) => {
      t.deepEqual(v, 2);
      t.deepEqual(y, '2');

      called = true;
      return then(1 * 2);
    };

    const output = await Parallel([Apply(fn, 2, '2')]);

    t.deepEqual(called, true);
    t.deepEqual(output, [2]);
  })(),
);
