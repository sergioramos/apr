const buildArray = require('build-array');
const test = require('ava');
const apr = require('../');

const getIttr = require('./common/get-ittr');
const timeout = require('./common/timeout');

test('fulfill [] find', async function(t) {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.find(input.map(Number), async function(v, i) {
    await then(v);
    order.push(i);
    return v === 2;
  });

  t.deepEqual(output, 2);
  t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));
});

test('fulfill @@Iterator find', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.find(getIttr(), async function(v, i) {
    await then(`${v}${v}`);
    order.push(i);
    return i === 2;
  });

  t.deepEqual(output, 'c');
  t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));
});

test('fulfill {} find', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.find({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    await then(v);
    order.push(v);
    return v === 2;
  });

  t.notDeepEqual(order, buildArray(order.length).map((v, i) => (i + 1)));
  t.deepEqual(output, {
    key: 'b',
    value: 2
  });
});

test('fail [] find', async function(t) {
  t.throws(apr.find([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail @@Iterator find', async function(t) {
  t.throws(apr.find(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail {} find', async function(t) {
  t.throws(apr.find({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fulfill [] findSeries', async function(t) {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.findSeries(input.map(Number), async function(v, i) {
    await then(v);
    order.push(i);
    return v === 2;
  });

  t.deepEqual(output, 2);
  t.deepEqual(order, buildArray(order.length).map((v, i) => i));
});

test('fulfill @@Iterator findSeries', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.findSeries(getIttr(), async function(v, i) {
    await then(`${v}${v}`);
    order.push(i);
    return i === 2;
  });

  t.deepEqual(output, 'c');
  t.deepEqual(order, buildArray(order.length).map((v, i) => i));
});

test('fulfill {} findSeries', async function(t) {
  const then = timeout(4);
  const order = [];

  const output = await apr.findSeries({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    await then(v);
    order.push(v);
    return v === 2;
  });

  t.deepEqual(order, buildArray(order.length).map((v, i) => (i + 1)));
  t.deepEqual(output, {
    key: 'b',
    value: 2
  });
});

test('fail [] findSeries', async function(t) {
  t.throws(apr.findSeries([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail @@Iterator findSeries', async function(t) {
  t.throws(apr.findSeries(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail {} findSeries', async function(t) {
  t.throws(apr.findSeries({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return false;
  }));
});
