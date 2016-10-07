const Sum = require('./engine/sum');
const reduce = require('./reduce');

module.exports = (input) => {
  return reduce(input, (sum, fn, key) => {
    return fn().then((res) => {
      sum[key] = res;
      return sum;
    });
  }, Sum(input), {
    limit: 1
  });
};
