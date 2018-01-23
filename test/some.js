const buildArray = require('build-array');
const test = require('ava');

const { default: some, series } = require('../packages/some');
const getIttr = require('../packages/test-get-ittr');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill [] some',
  schedule(async t => {
    const then = timeout(8);
    const input = [1, 2, 3, 4];
    const order = [];

    const fn = (cnd, order) => async (v, i) => {
      await then(v);
      (order || []).push(i);
      return cnd(v, i);
    };

    const found = await some(input.map(Number), fn((v, i) => v === 2, order));

    t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));

    const notFound = await some(input.map(Number), fn((v, i) => v === 5));

    t.deepEqual(notFound, false);
    t.deepEqual(found, true);
  })
);

test(
  'fulfill @@Iterator some',
  schedule(async t => {
    const then = timeout(8);
    const order = [];

    const fn = (cnd, order) => async (v, i) => {
      await then(`${v}${v}`);
      (order || []).push(i);
      return cnd(v, i);
    };

    const found = await some(getIttr(), fn((v, i) => i === 2, order));

    t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));

    const notFound = await some(getIttr(), fn((v, i) => i === 5));

    t.deepEqual(notFound, false);
    t.deepEqual(found, true);
  })
);

test(
  'fulfill {} some',
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

    const found = await some(input, fn((v, i) => v === 2, order));

    t.notDeepEqual(order, buildArray(order.length).map((v, i) => i + 1));

    const notFound = await some(input, fn((v, i) => v === 5));

    t.deepEqual(notFound, false);
    t.deepEqual(found, true);
  })
);

test(
  'fail [] some',
  schedule(
    async t =>
      await t.throws(
        some([1, 2, 3, 4], async (v, i) => {
          if (i > 2) {
            throw new Error('expected error');
          }

          return false;
        })
      )
  )
);

test(
  'fail @@Iterator some',
  schedule(
    async t =>
      await t.throws(
        some(getIttr(), async (v, i) => {
          if (i > 2) {
            throw new Error('expected error');
          }

          return false;
        })
      )
  )
);

test(
  'fail {} some',
  schedule(
    async t =>
      await t.throws(
        some(
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
  'fulfill [] someSeries',
  schedule(async t => {
    const then = timeout(6);
    const input = [1, 2, 3, 4];
    const order = [];

    const fn = (cnd, order) => async (v, i) => {
      await then(v);
      (order || []).push(i);
      return cnd(v, i);
    };

    const found = await series(
      input.map(Number),
      fn((v, i) => v === 2, order)
    );

    t.deepEqual(order, buildArray(order.length).map((v, i) => i));

    const notFound = await some(input.map(Number), fn((v, i) => v === 5));

    t.deepEqual(notFound, false);
    t.deepEqual(found, true);
  })
);

test(
  'fulfill @@Iterator someSeries',
  schedule(async t => {
    const then = timeout(7);
    const order = [];

    const fn = (cnd, order) => async (v, i) => {
      await then(`${v}${v}`);
      (order || []).push(i);
      return cnd(v, i);
    };

    const found = await series(getIttr(), fn((v, i) => i === 2, order));

    t.deepEqual(order, buildArray(order.length).map((v, i) => i));

    const notFound = await some(getIttr(), fn((v, i) => i === 5));

    t.deepEqual(notFound, false);
    t.deepEqual(found, true);
  })
);

test(
  'fulfill {} someSeries',
  schedule(async t => {
    const then = timeout(6);
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

    const found = await series(input, fn((v, i) => v === 2, order));

    t.deepEqual(order, buildArray(order.length).map((v, i) => i + 1));

    const notFound = await some(input, fn((v, i) => v === 5));

    t.deepEqual(notFound, false);
    t.deepEqual(found, true);
  })
);

test(
  'fail [] someSeries',
  schedule(
    async t =>
      await t.throws(
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
  'fail @@Iterator someSeries',
  schedule(
    async t =>
      await t.throws(
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
  'fail {} someSeries',
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

            return false;
          }
        )
      )
  )
);
