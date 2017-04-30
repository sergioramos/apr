const test = require('ava');

const reduce = require('../packages/reduce');
const getIttr = require('../packages/test-get-ittr');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test(
  'fulfill [] reduce',
  schedule(async t => {
    const then = timeout(4);
    const input = [1, 2, 3, 4];
    const order = [];

    const output = await reduce(
      input.map(Number),
      async (sum, v, i) => {
        const res = await then(v * 2);
        order.push(i);
        return sum + res;
      },
      0
    );

    t.deepEqual(output, 20);
    t.deepEqual(order, [0, 1, 2, 3]);
  })
);

test(
  'fulfill @@Iterator reduce',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await reduce(
      getIttr(),
      async (sum, v, i) => {
        const res = await then(v + v);
        order.push(i);
        return sum + res;
      },
      ''
    );

    t.deepEqual(output, 'aabbccdd');
    t.deepEqual(order, [0, 1, 2, 3]);
  })
);

test(
  'fulfill {} reduce',
  schedule(async t => {
    const then = timeout(4);
    const order = [];

    const output = await reduce(
      {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      },
      async (sum, v, i) => {
        sum.a = await then(v * 2);
        order.push(i);
        return sum;
      },
      {}
    );

    t.deepEqual(order, ['a', 'b', 'c', 'd']);
    t.deepEqual(output, {
      a: 8
    });
  })
);

test(
  'fail [] reduce',
  schedule(async t => {
    const then = timeout(4);

    t.throws(
      reduce([1, 2, 3, 4], async (sum, v, i) => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return await then(v * 2);
      })
    );
  })
);

test(
  'fail @@Iterator reduce',
  schedule(async t => {
    const then = timeout(4);

    t.throws(
      reduce(getIttr(), async (sum, v, i) => {
        if (i > 2) {
          throw new Error('expected error');
        }

        return await then(`${v}${v}`);
      })
    );
  })
);

test(
  'fail {} reduce',
  schedule(async t => {
    const then = timeout(4);

    t.throws(
      reduce(
        {
          a: 1,
          b: 2,
          c: 3,
          d: 4
        },
        async (sum, v, i) => {
          if (i === 'c') {
            throw new Error('expected error');
          }

          return await then(v * 2);
        }
      )
    );
  })
);
