const buildArray = require('build-array');
const test = require('ava');

const every = require('../packages/every');
const getIttr = require('../packages/test-get-ittr');
const timeout = require('../packages/test-timeout');

test('fulfill [] every', async (t) => {
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

  const always = await every(input.map(Number), fn((v, i) => {
    return v > 0;
  }, order));

  t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));

  const notAlways = await every(input.map(Number), fn((v, i) => {
    return v >= 2;
  }));

  t.deepEqual(notAlways, false);
  t.deepEqual(always, true);
});

test('fulfill @@Iterator every', async (t) => {
  const then = timeout(4);
  const order = [];

  const fn = (cnd, order) => {
    return async (v, i) => {
      await then(`${v}${v}`);
      (order || []).push(i);
      return cnd(v, i);
    };
  };

  const always = await every(getIttr(), fn((v, i) => {
    return i >= 0;
  }, order));

  t.notDeepEqual(order, buildArray(order.length).map((v, i) => i));

  const notAlways = await every(getIttr(), fn((v, i) => {
    return i > 0;
  }));

  t.deepEqual(notAlways, false);
  t.deepEqual(always, true);
});

test('fulfill {} every', async (t) => {
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

  const always = await every(input, fn((v, i) => {
    return v > 0;
  }, order));

  t.notDeepEqual(order, buildArray(order.length).map((v, i) => (i + 1)));

  const notAlways = await every(input, fn((v, i) => {
    return v >= 2;
  }));

  t.deepEqual(notAlways, false);
  t.deepEqual(always, true);
});

test('fail [] every', async (t) => {
  t.throws(every([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return true;
  }));
});

test('fail @@Iterator every', async (t) => {
  t.throws(every(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return true;
  }));
});

test('fail {} every', async (t) => {
  t.throws(every({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return true;
  }));
});

test('fulfill [] everySeries', async (t) => {
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

  const always = await every.series(input.map(Number), fn((v, i) => {
    return v > 0;
  }, order));

  t.deepEqual(order, buildArray(order.length).map((v, i) => i));

  const notAlways = await every(input.map(Number), fn((v, i) => {
    return v > 1;
  }));

  t.deepEqual(notAlways, false);
  t.deepEqual(always, true);
});

test('fulfill @@Iterator everySeries', async (t) => {
  const then = timeout(4);
  const order = [];

  const fn = (cnd, order) => {
    return async (v, i) => {
      await then(`${v}${v}`);
      (order || []).push(i);
      return cnd(v, i);
    };
  };

  const always = await every.series(getIttr(), fn((v, i) => {
    return i >= 0;
  }, order));

  t.deepEqual(order, buildArray(order.length).map((v, i) => i));

  const notAlways = await every(getIttr(), fn((v, i) => {
    return i > 0;
  }));

  t.deepEqual(notAlways, false);
  t.deepEqual(always, true);
});

test('fulfill {} everySeries', async (t) => {
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

  const always = await every.series(input, fn((v, i) => {
    return v > 0;
  }, order));

  t.deepEqual(order, buildArray(order.length).map((v, i) => (i + 1)));

  const notAlways = await every(input, fn((v, i) => {
    return v > 1;
  }));

  t.deepEqual(notAlways, false);
  t.deepEqual(always, true);
});

test('fail [] everySeries', async (t) => {
  t.throws(every.series([1, 2, 3, 4], async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return true;
  }));
});

test('fail @@Iterator everySeries', async (t) => {
  t.throws(every.series(getIttr(), async (v, i) => {
    if (i > 2) {
      throw new Error('expected error');
    }

    return true;
  }));
});

test('fail {} everySeries', async (t) => {
  t.throws(every.series({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async (v, i) => {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return true;
  }));
});
