const buildArray = require('build-array');
const test = require('ava');

const { default: find, series } = require('../packages/find');
const getIttr = require('../packages/test-get-ittr');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill [] find',
  schedule(async t => {
    const then = timeout(4);
    const input = [1, 2, 3, 4];
    const order = [];

    const output = await find(input.map(Number), async (v, i) => {
      await then(v);
      order.push(i);
      return v === 2;
    });

    t.deepEqual(output, 2);
    t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));
  })
);

test(
  'fulfill @@Iterator find',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await find(getIttr(), async (v, i) => {
      await then(`${v}${v}`);
      order.push(i);
      return i === 2;
    });

    t.deepEqual(output, 'c');
    t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));
  })
);

test(
  'fulfill {} find',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await find(
      {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      },
      async (v, i) => {
        await then(v);
        order.push(v);
        return v === 2;
      }
    );

    t.notDeepEqual(order, buildArray(order.length).map((v, i) => i + 1));
    t.deepEqual(output, {
      key: 'b',
      value: 2
    });
  })
);

test(
  'fail [] find',
  schedule(async t => {
    t.throws(
      find([1, 2, 3, 4], async (v, i) => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return false;
      })
    );
  })
);

test(
  'fail @@Iterator find',
  schedule(
    async t =>
      t.throws(
        find(getIttr(), async (v, i) => {
          if (i > 2) {
            throw new Error('expected error');
          }

          return false;
        })
      )
  )
);

test(
  'fail {} find',
  schedule(
    async t =>
      t.throws(
        find(
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

            return false;
          }
        )
      )
  )
);

test(
  'fulfill [] findSeries',
  schedule(async t => {
    const then = timeout(4);
    const input = [1, 2, 3, 4];
    const order = [];

    const output = await series(input.map(Number), async (v, i) => {
      await then(v);
      order.push(i);
      return v === 2;
    });

    t.deepEqual(output, 2);
    t.deepEqual(order, buildArray(order.length).map((v, i) => i));
  })
);

test(
  'fulfill @@Iterator findSeries',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await series(getIttr(), async (v, i) => {
      await then(`${v}${v}`);
      order.push(i);
      return i === 2;
    });

    t.deepEqual(output, 'c');
    t.deepEqual(order, buildArray(order.length).map((v, i) => i));
  })
);

test(
  'fulfill {} findSeries',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await series(
      {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      },
      async (v, i) => {
        await then(v);
        order.push(v);
        return v === 2;
      }
    );

    t.deepEqual(order, buildArray(order.length).map((v, i) => i + 1));
    t.deepEqual(output, {
      key: 'b',
      value: 2
    });
  })
);

test(
  'fail [] findSeries',
  schedule(
    async t =>
      t.throws(
        series([1, 2, 3, 4], async (v, i) => {
          if (i > 2) {
            throw new Error('expected error');
          }

          return false;
        })
      )
  )
);

test(
  'fail @@Iterator findSeries',
  schedule(
    async t =>
      t.throws(
        series(getIttr(), async (v, i) => {
          if (i > 2) {
            throw new Error('expected error');
          }

          return false;
        })
      )
  )
);

test(
  'fail {} findSeries',
  schedule(
    async t =>
      t.throws(
        series(
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

            return false;
          }
        )
      )
  )
);
