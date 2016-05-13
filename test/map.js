const test = require('ava');
const apr = require('../')

const getIttr = require('./common/get-ittr');
const p = require('./common/p');

test('fulfill [] map', async function(t) {
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.map(input.map(Number), async function(v, i) {
    const res = await p(v * 2);
    order.push(i);
    return res;
  });

  t.deepEqual(output, [2, 4, 6, 8]);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator map', async function(t) {
  const order = [];

  const output = await apr.map(getIttr(), async function(v, i) {
    const res = await p(`${v}${v}`);
    order.push(i);
    return res;
  });

  t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} map', async function(t) {
  const order = [];

  const output = await apr.map({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    const res = await p(v * 2);
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

test('fail [] map', async function(t) {
  t.throws(apr.map([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fail @@Iterator map', async function(t) {
  t.throws(apr.map(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(`${v}${v}`);
  }));
});

test('fail {} map', async function(t) {
  t.throws(apr.map({
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

test('fulfill [] mapSeries', async function(t) {
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.mapSeries(input.map(Number), async function(v, i) {
    const res = await p(v * 2);
    order.push(i);
    return res;
  });

  t.deepEqual(output, [2, 4, 6, 8]);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator mapSeries', async function(t) {
  const order = [];

  const output = await apr.mapSeries(getIttr(), async function(v, i) {
    const res = await p(`${v}${v}`);
    order.push(i);
    return res;
  });

  t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} mapSeries', async function(t) {
  const order = [];

  const output = await apr.mapSeries({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    const res = await p(v * 2);
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

test('fail [] mapSeries', async function(t) {
  t.throws(apr.mapSeries([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fail @@Iterator mapSeries', async function(t) {
  t.throws(apr.mapSeries(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(`${v}${v}`);
  }));
});

test('fail {} mapSeries', async function(t) {
  t.throws(apr.mapSeries({
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

// test('fulfill [] mapLimit', async function(t) {
//   const input = [1, 2, 3, 4];
//   const order = [];
//
//   await apr.mapLimit(input.map(Number), async function(v, i) {
//     input[i] = await p(v * 2);
//     order.push(i);
//   });
//
//   t.deepEqual(input, [2, 4, 6, 8]);
//   t.deepEqual(order, [0, 1, 2, 3]);
// });
//
// test('fulfill @@Iterator mapLimit', async function(t) {
//   const output = [];
//   const order = [];
//
//   await apr.mapLimit(getIttr(), async function(v, i) {
//     output[i] = await p(`${v}${v}`);
//     order.push(i);
//   });
//
//   t.deepEqual(output, ['aa', 'bb', 'cc', 'dd']);
//   t.deepEqual(order, [0, 1, 2, 3]);
// });
//
// test('fulfill {} mapLimit', async function(t) {
//   const output = {};
//   const order = [];
//
//   await apr.mapLimit({
//     a: 1,
//     b: 2,
//     c: 3,
//     d: 4
//   }, async function(v, i) {
//     output[i] = await p(v * 2);
//     order.push(i);
//   });
//
//   t.deepEqual(order, ['a', 'b', 'c', 'd']);
//   t.deepEqual(output, {
//     a: 2,
//     b: 4,
//     c: 6,
//     d: 8
//   });
// });
//
// test('fail [] mapLimit', async function(t) {
//   t.throws(apr.mapLimit([1, 2, 3, 4], async function(v, i) {
//     if (i > 2) {
//       throw new Error('expected error');
//     }
//
//     return await p(v * 2);
//   }));
// });
//
// test('fail @@Iterator mapLimit', async function(t) {
//   t.throws(apr.mapLimit(getIttr(), async function(v, i) {
//     if (i > 2) {
//       throw new Error('expected error');
//     }
//
//     return await p(`${v}${v}`);
//   }));
// });
//
// test('fail {} mapLimit', async function(t) {
//   t.throws(apr.mapLimit({
//     a: 1,
//     b: 2,
//     c: 3,
//     d: 4
//   }, async function(v, i) {
//     if (i === 'c') {
//       throw new Error('expected error');
//     }
//
//     return await p(v * 2);
//   }));
// });
