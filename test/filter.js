const test = require('ava');
const apr = require('../');

const getIttr = require('./common/get-ittr');
const timeout = require('./common/timeout');

test('fulfill [] filter', async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.filter(input.map(Number), async (v, i) => {
    const res = await then(v);
    order.push(i);
    return res % 2;
  });

  t.deepEqual(output, [1, 3]);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator filter', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.filter(getIttr(), async (v, i) => {
    await then(`${v}${v}`);
    order.push(i);
    return i % 2;
  });

  t.deepEqual(output, ['b', 'd']);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} filter', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.filter({
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
    a: 1,
    c: 3
  });
});

test('fail [] filter', async (t) => {
  const then = timeout(4);

  t.throws(apr.filter([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator filter', async (t) => {
  const then = timeout(4);

  t.throws(apr.filter(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} filter', async (t) => {
  const then = timeout(4);

  t.throws(apr.filter({
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
});

test('fulfill [] filterSeries', async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.filterSeries(input.map(Number), async (v, i) => {
    const res = await then(v);
    order.push(i);
    return res % 2;
  });

  t.deepEqual(output, [1, 3]);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator mapSeries', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.filterSeries(getIttr(), async (v, i) => {
    await then(`${v}${v}`);
    order.push(i);
    return i % 2;
  });

  t.deepEqual(output, ['b', 'd']);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} filterSeries', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.filter({
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
    a: 1,
    c: 3
  });
});

test('fail [] filterSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.filterSeries([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator filterSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.filterSeries(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} filterSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.filterSeries({
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
});
