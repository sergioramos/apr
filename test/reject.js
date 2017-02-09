const test = require('ava');

const reject = require('../packages/reject');
const getIttr = require('../packages/test-get-ittr');
const schedule = require('../packages/test-scheduler')();
const timeout = require('../packages/test-timeout');

test('fulfill [] reject', schedule(async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await reject(input.map(Number), async (v, i) => {
    const res = await then(v);
    order.push(i);
    return res % 2;
  });

  t.deepEqual(output, [2, 4]);
  t.notDeepEqual(order, [0, 1, 2, 3]);
}));

test('fulfill @@Iterator reject', schedule(async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await reject(getIttr(), async (v, i) => {
    await then(`${v}${v}`);
    order.push(i);
    return i % 2;
  });

  t.deepEqual(output, ['a', 'c']);
  t.notDeepEqual(order, [0, 1, 2, 3]);
}));

test('fulfill {} reject', schedule(async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await reject({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    const res = await then(v);
    order.push(i);
    return res % 2;
  });

  t.notDeepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, {
    b: 2,
    d: 4
  });
}));

test('fail [] reject', schedule(async (t) => {
  const then = timeout(4);

  t.throws(reject([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
}));

test('fail @@Iterator reject', schedule(async (t) => {
  const then = timeout(4);

  t.throws(reject(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
}));

test('fail {} reject', schedule(async (t) => {
  const then = timeout(4);

  t.throws(reject({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
}));

test('fulfill [] rejectSeries', schedule(async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await reject.series(input.map(Number), async (v, i) => {
    const res = await then(v);
    order.push(i);
    return res % 2;
  });

  t.deepEqual(output, [2, 4]);
  t.deepEqual(order, [0, 1, 2, 3]);
}));

test('fulfill @@Iterator rejectSeries', schedule(async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await reject.series(getIttr(), async (v, i) => {
    await then(`${v}${v}`);
    order.push(i);
    return i % 2;
  });

  t.deepEqual(output, ['a', 'c']);
  t.deepEqual(order, [0, 1, 2, 3]);
}));

test('fulfill {} rejectSeries', schedule(async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await reject({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    const res = await then(v);
    order.push(i);
    return res % 2;
  });

  t.notDeepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, {
    b: 2,
    d: 4
  });
}));

test('fail [] rejectSeries', schedule(async (t) => {
  const then = timeout(4);

  t.throws(reject.series([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
}));

test('fail @@Iterator rejectSeries', schedule(async (t) => {
  const then = timeout(4);

  t.throws(reject.series(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
}));

test('fail {} rejectSeries', schedule(async (t) => {
  const then = timeout(4);

  t.throws(reject.series({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
}));
