const test = require('ava');

const { default: map, series } = require('../packages/map');
const getIttr = require('../packages/test-get-ittr');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill [] map',
  schedule(async t => {
    const then = timeout(4);

    const input = [1, 2, 3, 4];
    const order = [];

    const output = await map(input.map(Number), async (v, i) => {
      const res = await then(v * 2);
      order.push(i);
      return res;
    });

    t.deepEqual(output, [2, 4, 6, 8]);
    t.notDeepEqual(order, [0, 1, 2, 3]);
  }),
);

test(
  'fulfill @@Iterator map',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await map(getIttr(), async (v, i) => {
      const res = await then(`${v}${v}`);
      order.push(i);
      return res;
    });

    t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
    t.notDeepEqual(order, [0, 1, 2, 3]);
  }),
);

test(
  'fulfill {} map',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await map(
      {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      },
      async (v, i) => {
        const res = await then(v * 2);
        order.push(i);
        return res;
      },
    );

    t.notDeepEqual(order, ['a', 'b', 'c', 'd']);
    t.deepEqual(output, {
      a: 2,
      b: 4,
      c: 6,
      d: 8,
    });
  }),
);

test(
  'fail [] map',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      map([1, 2, 3, 4], async (v, i) => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return then(v * 2);
      }),
    );
  }),
);

test(
  'fail @@Iterator map',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      map(getIttr(), async (v, i) => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return then(`${v}${v}`);
      }),
    );
  }),
);

test(
  'fail {} map',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      map(
        {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
        },
        async (v, i) => {
          if (i === 'c') {
            throw new Error('expected error');
          }

          return then(v * 2);
        },
      ),
    );
  }),
);

test(
  'fulfill [] mapSeries',
  schedule(async t => {
    const then = timeout(4);
    const input = [1, 2, 3, 4];
    const order = [];

    const output = await series(input.map(Number), async (v, i) => {
      const res = await then(v * 2);
      order.push(i);
      return res;
    });

    t.deepEqual(output, [2, 4, 6, 8]);
    t.deepEqual(order, [0, 1, 2, 3]);
  }),
);

test(
  'fulfill @@Iterator mapSeries',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await series(getIttr(), async (v, i) => {
      const res = await then(`${v}${v}`);
      order.push(i);
      return res;
    });

    t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
    t.deepEqual(order, [0, 1, 2, 3]);
  }),
);

test(
  'fulfill {} mapSeries',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await series(
      {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      },
      async (v, i) => {
        const res = await then(v * 2);
        order.push(i);
        return res;
      },
    );

    t.deepEqual(order, ['a', 'b', 'c', 'd']);
    t.deepEqual(output, {
      a: 2,
      b: 4,
      c: 6,
      d: 8,
    });
  }),
);

test(
  'fail [] mapSeries',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      series([1, 2, 3, 4], async (v, i) => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return then(v * 2);
      }),
    );
  }),
);

test(
  'fail @@Iterator mapSeries',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      series(getIttr(), async (v, i) => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return then(`${v}${v}`);
      }),
    );
  }),
);

test(
  'fail {} mapSeries',
  schedule(async t => {
    const then = timeout(4);

    await t.throws(
      series(
        {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
        },
        async (v, i) => {
          if (i === 'c') {
            throw new Error('expected error');
          }

          return then(v * 2);
        },
      ),
    );
  }),
);
