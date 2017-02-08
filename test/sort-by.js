const test = require('ava');

const sortBySeries = require('../packages/sort-by/series');
const sortBy = require('../packages/sort-by');
const getIttr = require('../packages/test-get-ittr');
const timeout = require('../packages/test-timeout');

test('fulfill [] sortBy', async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await sortBy(input.map(Number), async (v, i) => {
    await then(v);
    order.push(i);
    return -i;
  });

  t.deepEqual(output, [4, 3, 2, 1]);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator sortBy', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await sortBy(getIttr(), async (v, i) => {
    await then(`${v}${v}`);
    order.push(i);
    return -i;
  });

  t.deepEqual(output, ['d', 'c', 'b', 'a']);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} sortBy', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await sortBy({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    await then(v);
    order.push(i);
    return -i;
  });

  t.notDeepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, [{
    key: 'd',
    value: 4
  }, {
    key: 'c',
    value: 3
  }, {
    key: 'b',
    value: 2
  }, {
    key: 'a',
    value: 1
  }]);
});

test('fail [] sortBy', async (t) => {
  const then = timeout(4);

  t.throws(sortBy([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator sortBy', async (t) => {
  const then = timeout(4);

  t.throws(sortBy(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} sortBy', async (t) => {
  const then = timeout(4);

  t.throws(sortBy({
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

test('fulfill [] sortBySeries', async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await sortBy.series(input.map(Number), async (v, i) => {
    await then(v);
    order.push(i);
    return -i;
  });

  t.deepEqual(output, [4, 3, 2, 1]);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator mapSeries', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await sortBy.series(getIttr(), async (v, i) => {
    await then(`${v}${v}`);
    order.push(i);
    return -i;
  });

  t.deepEqual(output, ['d', 'c', 'b', 'a']);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} sortBySeries', async (t) => {
  const then = timeout(4);
  const order = [];

  const output = await sortBy.series({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    await then(v);
    order.push(i);
    return -i;
  });

  t.deepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, [{
    key: 'd',
    value: 4
  }, {
    key: 'c',
    value: 3
  }, {
    key: 'b',
    value: 2
  }, {
    key: 'a',
    value: 1
  }]);
});

test('fail [] sortBySeries', async (t) => {
  const then = timeout(4);

  t.throws(sortBy.series([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(v * 2);
  }));
});

test('fail @@Iterator sortBySeries', async (t) => {
  const then = timeout(4);

  t.throws(sortBy.series(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await then(`${v}${v}`);
  }));
});

test('fail {} sortBySeries', async (t) => {
  const then = timeout(4);

  t.throws(sortBy.series({
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
