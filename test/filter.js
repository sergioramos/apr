const test = require('ava');

const filter = require('../packages/filter');
const getIttr = require('../packages/test-get-ittr');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill [] filter',
  schedule(async t => {
    const then = timeout(4);
    const input = [1, 2, 3, 4];
    const order = [];

    const output = await filter(input.map(Number), async (v, i) => {
      const res = await then(v);
      order.push(i);
      return res % 2;
    });

    t.deepEqual(output, [1, 3]);
    t.notDeepEqual(order, [0, 1, 2, 3]);
  })
);

test(
  'fulfill @@Iterator filter',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await filter(getIttr(), async (v, i) => {
      await then(`${v}${v}`);
      order.push(i);
      return i % 2;
    });

    t.deepEqual(output, ['b', 'd']);
    t.notDeepEqual(order, [0, 1, 2, 3]);
  })
);

test(
  'fulfill {} filter',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await filter(
      {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      },
      async (v, i) => {
        const res = await then(v);
        order.push(i);
        return res % 2;
      }
    );

    t.notDeepEqual(order, ['a', 'b', 'c', 'd']);
    t.deepEqual(output, {
      a: 1,
      c: 3
    });
  })
);

test(
  'fail [] filter',
  schedule(async t => {
    const then = timeout(4);

    t.throws(
      filter([1, 2, 3, 4], async (v, i) => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return await then(v * 2);
      })
    );
  })
);

test(
  'fail @@Iterator filter',
  schedule(async t => {
    const then = timeout(4);

    t.throws(
      filter(getIttr(), async (v, i) => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return await then(`${v}${v}`);
      })
    );
  })
);

test(
  'fail {} filter',
  schedule(async t => {
    const then = timeout(4);

    t.throws(
      filter(
        {
          a: 1,
          b: 2,
          c: 3,
          d: 4
        },
        async (v, i) => {
          if (i === 'c') {
            throw new Error('expected error');
          }

          return await then(v * 2);
        }
      )
    );
  })
);

test(
  'fulfill [] filterSeries',
  schedule(async t => {
    const then = timeout(4);
    const input = [1, 2, 3, 4];
    const order = [];

    const output = await filter.series(input.map(Number), async (v, i) => {
      const res = await then(v);
      order.push(i);
      return res % 2;
    });

    t.deepEqual(output, [1, 3]);
    t.deepEqual(order, [0, 1, 2, 3]);
  })
);

test(
  'fulfill @@Iterator mapSeries',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await filter.series(getIttr(), async (v, i) => {
      await then(`${v}${v}`);
      order.push(i);
      return i % 2;
    });

    t.deepEqual(output, ['b', 'd']);
    t.deepEqual(order, [0, 1, 2, 3]);
  })
);

test(
  'fulfill {} filterSeries',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await filter(
      {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      },
      async (v, i) => {
        const res = await then(v);
        order.push(i);
        return res % 2;
      }
    );

    t.notDeepEqual(order, ['a', 'b', 'c', 'd']);
    t.deepEqual(output, {
      a: 1,
      c: 3
    });
  })
);

test(
  'fail [] filterSeries',
  schedule(async t => {
    const then = timeout(4);

    t.throws(
      filter.series([1, 2, 3, 4], async (v, i) => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return await then(v * 2);
      })
    );
  })
);

test(
  'fail @@Iterator filterSeries',
  schedule(async t => {
    const then = timeout(4);

    t.throws(
      filter.series(getIttr(), async (v, i) => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return await then(`${v}${v}`);
      })
    );
  })
);

test(
  'fail {} filterSeries',
  schedule(async t => {
    const then = timeout(4);

    t.throws(
      filter.series(
        {
          a: 1,
          b: 2,
          c: 3,
          d: 4
        },
        async (v, i) => {
          if (i === 'c') {
            throw new Error('expected error');
          }

          return await then(v * 2);
        }
      )
    );
  })
);
