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

test('fulfill [] reduce', async function(t) {
  const input = [1, 2, 3, 4];
  const order = [];

  const output = await apr.reduce(input.map(Number), async function(sum, v, i) {
    const res = await p(v * 2);
    order.push(i);
    return sum + res;
  }, 0);

  t.deepEqual(output, 20);
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill @@Iterator reduce', async function(t) {
  const order = [];

  const output = await apr.reduce(getIttr(), async function(sum, v, i) {
    const res = await p(v + v);
    order.push(i);
    return sum + res;
  }, '');

  t.deepEqual(output, 'aabbccdd');
  t.deepEqual(order, [0, 1, 2, 3]);
});

test('fulfill {} reduce', async function(t) {
  const order = [];

  const output = await apr.reduce({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(sum, v, i) {
    sum.a = await p(v * 2);
    order.push(i);
    return sum;
  }, {});

  t.deepEqual(order, ['a', 'b', 'c', 'd']);
  t.deepEqual(output, {
    a: 8
  });
});

test('fail [] reduce', async function(t) {
  t.throws(apr.reduce([1, 2, 3, 4], async function(sum, v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});

test('fail @@Iterator reduce', async function(t) {
  t.throws(apr.reduce(getIttr(), async function(sum, v, i) {
    if (i > 2) {
      throw new Error('expected error');
    }

    return await p(`${v}${v}`);
  }));
});

test('fail {} reduce', async function(t) {
  t.throws(apr.reduce({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  }, async function(sum, v, i) {
    if (i === 'c') {
      throw new Error('expected error');
    }

    return await p(v * 2);
  }));
});
