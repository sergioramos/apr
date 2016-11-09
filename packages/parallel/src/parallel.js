const Sum = require('apr-engine-sum');
const reduce = require('apr-reduce');

module.exports = (input) => {
  return reduce(input, (sum, fn, key) => {
    return fn().then((res) => {
      sum[key] = res;
      return sum;
    });
  }, Sum(input), {
    limit: Infinity
  });
};
