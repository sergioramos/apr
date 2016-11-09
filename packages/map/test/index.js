const test = require('ava');
const apr = require('../');

const getIttr = require('./common/get-ittr');
const timeout = require('./common/timeout');

test('fulfill [] map', async (t) => {
  const then = timeout(4);

  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.map(input.map(Number), async (v, i) => {
    const res = await then(v * 2);
    order.push(i);
    return res;
  });

  t.deepEqual(output, [2, 4, 6, 8]);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator map', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.map(getIttr(), async (v, i) => {
    const res = await then(`${v}${v}`);
    order.push(i);
    return res;
  });

  t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} map', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.map({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    const res = await then(v * 2);
    order.push(i);
    return res;
  });

  t.notDeepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, {
    a: 2,
    b: 4,
    c: 6,
    d: 8
  });
});

test('fail [] map', async (t) => {
  const then = timeout(4);

  t.throws(apr.map([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator map', async (t) => {
  const then = timeout(4);

  t.throws(apr.map(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} map', async (t) => {
  const then = timeout(4);

  t.throws(apr.map({
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

test('fulfill [] mapSeries', async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.mapSeries(input.map(Number), async (v, i) => {
    const res = await then(v * 2);
    order.push(i);
    return res;
  });

  t.deepEqual(output, [2, 4, 6, 8]);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator mapSeries', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.mapSeries(getIttr(), async (v, i) => {
    const res = await then(`${v}${v}`);
    order.push(i);
    return res;
  });

  t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} mapSeries', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.mapSeries({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    const res = await then(v * 2);
    order.push(i);
    return res;
  });

  t.deepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, {
    a: 2,
    b: 4,
    c: 6,
    d: 8
  });
});

test('fail [] mapSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.mapSeries([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator mapSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.mapSeries(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} mapSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.mapSeries({
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
