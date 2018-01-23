const buildArray = require('build-array');
const test = require('ava');

const { default: every, series } = require('../packages/every');
const getIttr = require('../packages/test-get-ittr');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill [] every',
  schedule(async t => {
    const then = timeout(8);
    const input = [1, 2, 3, 4];
    const order = [];

    const fn = (cnd, order) => async (v, i) => {
      await then(v);
      (order || []).push(i);
      return cnd(v, i);
    };

    const always = await every(input.map(Number), fn((v, i) => v > 0, order));

    t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));

    const notAlways = await every(input.map(Number), fn((v, i) => v >= 2));

    t.deepEqual(notAlways, false);
    t.deepEqual(always, true);
  })
);

test(
  'fulfill @@Iterator every',
  schedule(async t => {
    const then = timeout(8);
    const order = [];

    const fn = (cnd, order) => async (v, i) => {
      await then(`${v}${v}`);
      (order || []).push(i);
      return cnd(v, i);
    };

    const always = await every(getIttr(), fn((v, i) => i >= 0, order));

    t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));

    const notAlways = await every(getIttr(), fn((v, i) => i > 0));

    t.deepEqual(notAlways, false);
    t.deepEqual(always, true);
  })
);

test(
  'fulfill {} every',
  schedule(async t => {
    const then = timeout(8);
    const order = [];

    const input = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    };

    const fn = (cnd, order) => async (v, i) => {
      await then(v);
      (order || []).push(v);
      return cnd(v, i);
    };

    const always = await every(input, fn((v, i) => v > 0, order));

    t.notDeepEqual(order, buildArray(order.length).map((v, i) => i + 1));

    const notAlways = await every(input, fn((v, i) => v >= 2));

    t.deepEqual(notAlways, false);
    t.deepEqual(always, true);
  })
);

test(
  'fail [] every',
  schedule(
    async t =>
      await t.throws(
        every([1, 2, 3, 4], async (v, i) => {
          if (i > 2) {
            throw new Error('expected error');
          }

          return true;
        })
      )
  )
);

test(
  'fail @@Iterator every',
  schedule(
    async t =>
      await t.throws(
        every(getIttr(), async (v, i) => {
          if (i > 2) {
            throw new Error('expected error');
          }

          return true;
        })
      )
  )
);

test(
  'fail {} every',
  schedule(
    async t =>
      await t.throws(
        every(
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

            return true;
          }
        )
      )
  )
);

test(
  'fulfill [] everySeries',
  schedule(async t => {
    const then = timeout(5);
    const input = [1, 2, 3, 4];
    const order = [];

    const fn = (cnd, order) => async (v, i) => {
      await then(v);
      (order || []).push(i);
      return cnd(v, i);
    };

    const always = await series(
      input.map(Number),
      fn((v, i) => v > 0, order)
    );

    t.deepEqual(order, buildArray(order.length).map((v, i) => i));

    const notAlways = await series(
      input.map(Number),
      fn((v, i) => v > 1)
    );

    t.deepEqual(notAlways, false);
    t.deepEqual(always, true);
  })
);

test(
  'fulfill @@Iterator everySeries',
  schedule(async t => {
    const then = timeout(5);
    const order = [];

    const fn = (cnd, order) => async (v, i) => {
      await then(`${v}${v}`);
      (order || []).push(i);
      return cnd(v, i);
    };

    const always = await series(getIttr(), fn((v, i) => i >= 0, order));

    t.deepEqual(order, buildArray(order.length).map((v, i) => i));

    const notAlways = await series(getIttr(), fn((v, i) => i > 0));

    t.deepEqual(notAlways, false);
    t.deepEqual(always, true);
  })
);

test(
  'fulfill {} everySeries',
  schedule(async t => {
    const then = timeout(5);
    const order = [];

    const input = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    };

    const fn = (cnd, order) => async (v, i) => {
      await then(v);
      (order || []).push(v);
      return cnd(v, i);
    };

    const always = await series(input, fn((v, i) => v > 0, order));

    t.deepEqual(order, buildArray(order.length).map((v, i) => i + 1));

    const notAlways = await series(input, fn((v, i) => v > 1));

    t.deepEqual(notAlways, false);
    t.deepEqual(always, true);
  })
);

test(
  'fail [] everySeries',
  schedule(
    async t =>
      await t.throws(
        series([1, 2, 3, 4], async (v, i) => {
          if (i > 2) {
            throw new Error('expected error');
          }

          return true;
        })
      )
  )
);

test(
  'fail @@Iterator everySeries',
  schedule(
    async t =>
      await t.throws(
        series(getIttr(), async (v, i) => {
          if (i > 2) {
            throw new Error('expected error');
          }

          return true;
        })
      )
  )
);

test(
  'fail {} everySeries',
  schedule(
    async t =>
      await t.throws(
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

            return true;
          }
        )
      )
  )
);
