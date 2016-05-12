const test = require('ava');
const random = require('random-decimal');
const timeout = require('timeout-then');
const apr = require('../')

const p = async function(v) {
  return timeout(random({
    min: 0,
    max: 1000
  })).then(function() {
    return v;
  });
};

const getIttr = function() {
  const items = ['a', 'b', 'c', 'd'];

  return {
    [Symbol.iterator]: function() {
      return {
        i: -1,
        next: function() {
          this.i += 1;

          return {
            value: items[this.i],
            done: items.length === this.i
          };
        }
      };
    }
  };
};

test('fulfill [] forEach', async function(t) {
  const input = [1, 2, 3, 4];
  const order = [];

  await apr.forEach(input.map(Number), async function(v, i) {
    input[i] = await p(v * 2);
    order.push(i);
  });

  t.deepEqual(input, [2, 4, 6, 8]);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator forEach', async function(t) {
  const output = [];
  const order = [];

  await apr.forEach(getIttr(), async function(v, i) {
    output[i] = await p(`${v}${v}`);
    order.push(i);
  });

  t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} forEach', async function(t) {
  const output = {};
  const order = [];

  await apr.forEach({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    output[i] = await p(v * 2);
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

test('fail [] forEach', async function(t) {
  t.throws(apr.forEach([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fail @@Iterator forEach', async function(t) {
  t.throws(apr.forEach(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(`${v}${v}`);
  }));
});

test('fail {} forEach', async function(t) {
  t.throws(apr.forEach({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fulfill [] forEachSeries', async function(t) {
  const input = [1, 2, 3, 4];
  const order = [];

  await apr.forEachSeries(input.map(Number), async function(v, i) {
    input[i] = await p(v * 2);
    order.push(i);
  });

  t.deepEqual(input, [2, 4, 6, 8]);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator forEachSeries', async function(t) {
  const output = [];
  const order = [];

  await apr.forEachSeries(getIttr(), async function(v, i) {
    output[i] = await p(`${v}${v}`);
    order.push(i);
  });

  t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} forEachSeries', async function(t) {
  const output = {};
  const order = [];

  await apr.forEachSeries({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    output[i] = await p(v * 2);
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

test('fail [] forEachSeries', async function(t) {
  t.throws(apr.forEachSeries([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fail @@Iterator forEachSeries', async function(t) {
  t.throws(apr.forEachSeries(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(`${v}${v}`);
  }));
});

test('fail {} forEachSeries', async function(t) {
  t.throws(apr.forEachSeries({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fulfill [] forEachLimit', async function(t) {
  const input = [1, 2, 3, 4];
  const order = [];

  await apr.forEachLimit(input.map(Number), async function(v, i) {
    input[i] = await p(v * 2);
    order.push(i);
  });

  t.deepEqual(input, [2, 4, 6, 8]);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator forEachLimit', async function(t) {
  const output = [];
  const order = [];

  await apr.forEachLimit(getIttr(), async function(v, i) {
    output[i] = await p(`${v}${v}`);
    order.push(i);
  });

  t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} forEachLimit', async function(t) {
  const output = {};
  const order = [];

  await apr.forEachLimit({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    output[i] = await p(v * 2);
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

test('fail [] forEachLimit', async function(t) {
  t.throws(apr.forEachLimit([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fail @@Iterator forEachLimit', async function(t) {
  t.throws(apr.forEachLimit(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(`${v}${v}`);
  }));
});

test('fail {} forEachLimit', async function(t) {
  t.throws(apr.forEachLimit({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});
