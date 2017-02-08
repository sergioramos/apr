const buildArray = require('build-array');
const test = require('ava');

const some = require('../packages/some');
const getIttr = require('../packages/test-get-ittr');
const timeout = require('../packages/test-timeout');

test('fulfill [] some', async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const fn = (cnd, order) => {
    return async (v, i) => {
      await then(v);
      (order || []).push(i);
      return cnd(v, i);
    };
  };

  const found = await some(input.map(Number), fn((v, i) => {
    return v === 2;
  }, order));

  t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));

  const notFound = await some(input.map(Number), fn((v, i) => {
    return v === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fulfill @@Iterator some', async (t) => {
  const then = timeout(4);
  const order = [];

  const fn = (cnd, order) => {
    return async (v, i) => {
      await then(`${v}${v}`);
      (order || []).push(i);
      return cnd(v, i);
    };
  };

  const found = await some(getIttr(), fn((v, i) => {
    return i === 2;
  }, order));

  t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));

  const notFound = await some(getIttr(), fn((v, i) => {
    return i === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fulfill {} some', async (t) => {
  const then = timeout(4);
  const order = [];

  const input = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
  };

  const fn = (cnd, order) => {
    return async (v, i) => {
      await then(v);
      (order || []).push(v);
      return cnd(v, i);
    };
  };

  const found = await some(input, fn((v, i) => {
    return v === 2;
  }, order));

  t.notDeepEqual(order, buildArray(order.length).map((v, i) => (i + 1)));

  const notFound = await some(input, fn((v, i) => {
    return v === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fail [] some', async (t) => {
  t.throws(some([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail @@Iterator some', async (t) => {
  t.throws(some(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail {} some', async (t) => {
  t.throws(some({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fulfill [] someSeries', async (t) => {
  const then = timeout(4);
  const input = [1, 2, 3, 4];
  const order = [];

  const fn = (cnd, order) => {
    return async (v, i) => {
      await then(v);
      (order || []).push(i);
      return cnd(v, i);
    };
  };

  const found = await some.series(input.map(Number), fn((v, i) => {
    return v === 2;
  }, order));

  t.deepEqual(order, buildArray(order.length).map((v, i) => i));

  const notFound = await some(input.map(Number), fn((v, i) => {
    return v === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fulfill @@Iterator someSeries', async (t) => {
  const then = timeout(4);
  const order = [];

  const fn = (cnd, order) => {
    return async (v, i) => {
      await then(`${v}${v}`);
      (order || []).push(i);
      return cnd(v, i);
    };
  };

  const found = await some.series(getIttr(), fn((v, i) => {
    return i === 2;
  }, order));

  t.deepEqual(order, buildArray(order.length).map((v, i) => i));

  const notFound = await some(getIttr(), fn((v, i) => {
    return i === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fulfill {} someSeries', async (t) => {
  const then = timeout(4);
  const order = [];

  const input = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
  };

  const fn = (cnd, order) => {
    return async (v, i) => {
      await then(v);
      (order || []).push(v);
      return cnd(v, i);
    };
  };

  const found = await some.series(input, fn((v, i) => {
    return v === 2;
  }, order));

  t.deepEqual(order, buildArray(order.length).map((v, i) => (i + 1)));

  const notFound = await some(input, fn((v, i) => {
    return v === 5;
  }));

  t.deepEqual(notFound, false);
  t.deepEqual(found, true);
});

test('fail [] someSeries', async (t) => {
  t.throws(some.series([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail @@Iterator someSeries', async (t) => {
  t.throws(some.series(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return false;
  }));
});

test('fail {} someSeries', async (t) => {
  t.throws(some.series({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return false;
  }));
});
