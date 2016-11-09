const test = require('ava');
const apr = require('../');

const getIttr = require('./common/get-ittr');
const timeout = require('./common/timeout');

test('fulfill [] concat', async (t) => {
  const then = timeout(4);

  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.concat(input.map(Number), async (v, i) => {
    const res = await then(v * 2);
    order.push(i);
    return res;
  });

  t.deepEqual(output, 20);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator concat', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.concat(getIttr(), async (v, i) => {
    const res = await then(`${v}${v}`);
    order.push(i);
    return res;
  });

  t.deepEqual(output, 'aabbccdd');
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} concat', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.concat({
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
  t.deepEqual(output, 20);
});

test('fail [] concat', async (t) => {
  const then = timeout(4);

  t.throws(apr.concat([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator concat', async (t) => {
  const then = timeout(4);

  t.throws(apr.concat(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} concat', async (t) => {
  const then = timeout(4);

  t.throws(apr.concat({
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

test('fulfill [] concatSeries', async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.concatSeries(input.map(Number), async (v, i) => {
    const res = await then(v * 2);
    order.push(i);
    return res;
  });

  t.deepEqual(output, 20);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator concatSeries', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.concatSeries(getIttr(), async (v, i) => {
    const res = await then(`${v}${v}`);
    order.push(i);
    return res;
  });

  t.deepEqual(output, 'aabbccdd');
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} concatSeries', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await apr.concatSeries({
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
  t.deepEqual(output, 20);
});

test('fail [] concatSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.concatSeries([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator concatSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.concatSeries(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} concatSeries', async (t) => {
  const then = timeout(4);

  t.throws(apr.concatSeries({
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
