const test = require('ava');
const apr = require('../')

const getIttr = require('./common/get-ittr');
const p = require('./common/p');

test('fulfill [] reject', async function(t) {
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.reject(input.map(Number), async function(v, i) {
    const res = await p(v);
    order.push(i);
    return res%2;
  });

  t.deepEqual(output, [2, 4]);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator reject', async function(t) {
  const order = [];

  const output = await apr.reject(getIttr(), async function(v, i) {
    const res = await p(`${v}${v}`);
    order.push(i);
    return i%2;
  });

  t.deepEqual(output, ['a', 'c']);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} reject', async function(t) {
  const order = [];

  const output = await apr.reject({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    const res = await p(v);
    order.push(i);
    return res%2;
  });

  t.notDeepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, {
    b: 2,
    d: 4
  });
});

test('fail [] reject', async function(t) {
  t.throws(apr.reject([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fail @@Iterator reject', async function(t) {
  t.throws(apr.reject(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(`${v}${v}`);
  }));
});

test('fail {} reject', async function(t) {
  t.throws(apr.reject({
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

test('fulfill [] rejectSeries', async function(t) {
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.rejectSeries(input.map(Number), async function(v, i) {
    const res = await p(v);
    order.push(i);
    return res%2;
  });

  t.deepEqual(output, [2, 4]);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator mapSeries', async function(t) {
  const order = [];

    const output = await apr.rejectSeries(getIttr(), async function(v, i) {
      const res = await p(`${v}${v}`);
      order.push(i);
      return i%2;
    });

    t.deepEqual(output, ['a', 'c']);
    t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} rejectSeries', async function(t) {
  const order = [];

  const output = await apr.reject({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(v, i) {
    const res = await p(v);
    order.push(i);
    return res%2;
  });

  t.notDeepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, {
    b: 2,
    d: 4
  });
});

test('fail [] rejectSeries', async function(t) {
  t.throws(apr.rejectSeries([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fail @@Iterator rejectSeries', async function(t) {
  t.throws(apr.rejectSeries(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(`${v}${v}`);
  }));
});

test('fail {} rejectSeries', async function(t) {
  t.throws(apr.rejectSeries({
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
