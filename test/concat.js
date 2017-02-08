const test = require('ava');

const concat = require('../packages/concat');
const getIttr = require('../packages/test-get-ittr');
const timeout = require('../packages/test-timeout');

test('fulfill [] concat', async (t) => {
  const then = timeout(4);

  const input = [1, 2, 3, 4];
  const order = [];

  const output = await concat(input.map(Number), async (v, i) => {
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

  const output = await concat(getIttr(), async (v, i) => {
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

  const output = await concat({
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

  t.throws(concat([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator concat', async (t) => {
  const then = timeout(4);

  t.throws(concat(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} concat', async (t) => {
  const then = timeout(4);

  t.throws(concat({
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

  const output = await concat.series(input.map(Number), async (v, i) => {
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

  const output = await concat.series(getIttr(), async (v, i) => {
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

  const output = await concat.series({
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

  t.throws(concat.series([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator concatSeries', async (t) => {
  const then = timeout(4);

  t.throws(concat.series(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} concatSeries', async (t) => {
  const then = timeout(4);

  t.throws(concat.series({
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
