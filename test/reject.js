const test = require('ava');
const apr = require('../')

const getIttr = require('./common/get-ittr');
const timeout = require('./common/timeout');

test('fulfill [] reject', async function(t) {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.reject(input.map(Number), async function(v, i) {
    const res = await then(v);
    order.push(i);
    return res%2;
  });

  t.deepEqual(output, [2, 4]);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator reject', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.reject(getIttr(), async function(v, i) {
    const res = await then(`${v}${v}`);
    order.push(i);
    return i%2;
  });

  t.deepEqual(output, ['a', 'c']);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} reject', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.reject({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    const res = await then(v);
    order.push(i);
    return res%2;
  });

  t.notDeepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, {
    b: 2,
    d: 4
  });
});

test('fail [] reject', async function(t) {
  const then = timeout(4);

  t.throws(apr.reject([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator reject', async function(t) {
  const then = timeout(4);

  t.throws(apr.reject(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} reject', async function(t) {
  const then = timeout(4);

  t.throws(apr.reject({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fulfill [] rejectSeries', async function(t) {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.rejectSeries(input.map(Number), async function(v, i) {
    const res = await then(v);
    order.push(i);
    return res%2;
  });

  t.deepEqual(output, [2, 4]);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator mapSeries', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.rejectSeries(getIttr(), async function(v, i) {
    const res = await then(`${v}${v}`);
    order.push(i);
    return i%2;
  });

  t.deepEqual(output, ['a', 'c']);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} rejectSeries', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.reject({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    const res = await then(v);
    order.push(i);
    return res%2;
  });

  t.notDeepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, {
    b: 2,
    d: 4
  });
});

test('fail [] rejectSeries', async function(t) {
  const then = timeout(4);

  t.throws(apr.rejectSeries([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator rejectSeries', async function(t) {
  const then = timeout(4);

  t.throws(apr.rejectSeries(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} rejectSeries', async function(t) {
  const then = timeout(4);

  t.throws(apr.rejectSeries({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});
