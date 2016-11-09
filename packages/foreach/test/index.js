const test = require('ava');
const apr = require('../');

const getIttr = require('./common/get-ittr');
const timeout = require('./common/timeout');

test('fulfill [] forEach', async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  await apr.forEach(input.map(Number), async (v, i) => {
    input[i] = await then(v * 2);
    order.push(i);
  });

  t.deepEqual(input, [2, 4, 6, 8]);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator forEach', async (t) => {
  const then = timeout(4);
  const output = [];
  const order = [];

  await apr.forEach(getIttr(), async (v, i) => {
    output[i] = await then(`${v}${v}`);
    order.push(i);
  });

  t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} forEach', async (t) => {
  const then = timeout(4);
  const output = {};
  const order = [];

  await apr.forEach({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    output[i] = await then(v * 2);
    order.push(i);
  });

  t.notDeepEqual(order, [0, 1, 2, 3]);
  t.deepEqual(output, {
    a: 2,
    b: 4,
    c: 6,
    d: 8
  });
});

test('fail [] forEach', async (t) => {
  const then = timeout(4);

  t.throws(apr.forEach([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator forEach', async (t) => {
  const then = timeout(4);

  t.throws(apr.forEach(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} forEach', async (t) => {
  const then = timeout(4);

  t.throws(apr.forEach({
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

test('fulfill [] forEachSeries', async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  await apr.forEachSeries(input.map(Number), async (v, i) => {
    input[i] = await then(v * 2);
    order.push(i);
  });

  t.deepEqual(input, [2, 4, 6, 8]);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator forEachSeries', async (t) => {
  const then = timeout(4);
  const output = [];
  const order = [];

  await apr.forEachSeries(getIttr(), async (v, i) => {
    output[i] = await then(`${v}${v}`);
    order.push(i);
  });

  t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} forEachSeries', async (t) => {
  const then = timeout(4);
  const output = {};
  const order = [];

  await apr.forEachSeries({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    output[i] = await then(v * 2);
    order.push(i);
  });

  t.deepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, {
    a: 2,
    b: 4,
    c: 6,
    d: 8
  });
});

test('fail [] forEachSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.forEachSeries([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator forEachSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.forEachSeries(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} forEachSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.forEachSeries({
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
