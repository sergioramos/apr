const buildArray = require('build-array');
const test = require('ava');
const apr = require('../')

const getIttr = require('./common/get-ittr');
const timeout = require('./common/timeout');

test('fulfill [] some', async function(t) {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const fn = function(cnd, order) {
    return async function(v, i) {
      const res = await then(v);
      (order || []).push(i);
      return cnd(v, i);
    };
  };

  const found = await apr.some(input.map(Number), fn(function(v, i) {
    return v === 2;
  }, order));

  t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));

  const notFound = await apr.some(input.map(Number), fn(function(v, i) {
    return v === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fulfill @@Iterator some', async function(t) {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const fn = function(cnd, order) {
    return async function(v, i) {
      const res = await then(`${v}${v}`);
      (order || []).push(i);
      return cnd(v, i);
    };
  };

  const found = await apr.some(getIttr(), fn(function(v, i) {
    return i === 2;
  }, order));

  t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));

  const notFound = await apr.some(getIttr(), fn(function(v, i) {
    return i === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fulfill {} some', async function(t) {
  const then = timeout(4);
  const order = [];

  const input = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
  };

  const fn = function(cnd, order) {
    return async function(v, i) {
      const res = await then(v);
      (order || []).push(v);
      return cnd(v, i);
    };
  };

  const found = await apr.some(input, fn(function(v, i) {
    return v === 2;
  }, order));

  t.notDeepEqual(order, buildArray(order.length).map((v, i) => (i + 1)));

  const notFound = await apr.some(input, fn(function(v, i) {
    return v === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fail [] some', async function(t) {
  const then = timeout(4);

  t.throws(apr.some([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail @@Iterator some', async function(t) {
  const then = timeout(4);

  t.throws(apr.some(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail {} some', async function(t) {
  const then = timeout(4);

  t.throws(apr.some({
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

test('fulfill [] someSeries', async function(t) {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const fn = function(cnd, order) {
    return async function(v, i) {
      const res = await then(v);
      (order || []).push(i);
      return cnd(v, i);
    };
  };

  const found = await apr.someSeries(input.map(Number), fn(function(v, i) {
    return v === 2;
  }, order));

  t.deepEqual(order, buildArray(order.length).map((v, i) => i));

  const notFound = await apr.some(input.map(Number), fn(function(v, i) {
    return v === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fulfill @@Iterator someSeries', async function(t) {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const fn = function(cnd, order) {
    return async function(v, i) {
      const res = await then(`${v}${v}`);
      (order || []).push(i);
      return cnd(v, i);
    };
  };

  const found = await apr.someSeries(getIttr(), fn(function(v, i) {
    return i === 2;
  }, order));

  t.deepEqual(order, buildArray(order.length).map((v, i) => i));

  const notFound = await apr.some(getIttr(), fn(function(v, i) {
    return i === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fulfill {} someSeries', async function(t) {
  const then = timeout(4);
  const order = [];

  const input = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
  };

  const fn = function(cnd, order) {
    return async function(v, i) {
      const res = await then(v);
      (order || []).push(v);
      return cnd(v, i);
    };
  };

  const found = await apr.someSeries(input, fn(function(v, i) {
    return v === 2;
  }, order));

  t.deepEqual(order, buildArray(order.length).map((v, i) => (i + 1)));

  const notFound = await apr.some(input, fn(function(v, i) {
    return v === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fail [] someSeries', async function(t) {
  const then = timeout(4);

  t.throws(apr.someSeries([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail @@Iterator someSeries', async function(t) {
  const then = timeout(4);

  t.throws(apr.someSeries(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail {} someSeries', async function(t) {
  const then = timeout(4);

  t.throws(apr.someSeries({
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
