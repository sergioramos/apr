const test = require('ava');
const apr = require('../')

const getIttr = require('./common/get-ittr');
const p = require('./common/p');

test('fulfill [] filter', async function(t) {
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.filter(input.map(Number), async function(v, i) {
    const res = await p(v);
    order.push(i);
    return res%2;
  });

  t.deepEqual(output, [1, 3]);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator filter', async function(t) {
  const order = [];

  const output = await apr.filter(getIttr(), async function(v, i) {
    const res = await p(`${v}${v}`);
    order.push(i);
    return i%2;
  });

  t.deepEqual(output, ['b', 'd']);
  t.notDeepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} filter', async function(t) {
  const order = [];

  const output = await apr.filter({
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
    a: 1,
    c: 3
  });
});

test('fail [] filter', async function(t) {
  t.throws(apr.filter([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fail @@Iterator filter', async function(t) {
  t.throws(apr.filter(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(`${v}${v}`);
  }));
});

test('fail {} filter', async function(t) {
  t.throws(apr.filter({
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

test('fulfill [] filterSeries', async function(t) {
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.filterSeries(input.map(Number), async function(v, i) {
    const res = await p(v);
    order.push(i);
    return res%2;
  });

  t.deepEqual(output, [1, 3]);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator mapSeries', async function(t) {
  const order = [];

    const output = await apr.filterSeries(getIttr(), async function(v, i) {
      const res = await p(`${v}${v}`);
      order.push(i);
      return i%2;
    });

    t.deepEqual(output, ['b', 'd']);
    t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} filterSeries', async function(t) {
  const order = [];

  const output = await apr.filter({
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
    a: 1,
    c: 3
  });
});

test('fail [] filterSeries', async function(t) {
  t.throws(apr.filterSeries([1, 2, 3, 4], async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fail @@Iterator filterSeries', async function(t) {
  t.throws(apr.filterSeries(getIttr(), async function(v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(`${v}${v}`);
  }));
});

test('fail {} filterSeries', async function(t) {
  t.throws(apr.filterSeries({
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
