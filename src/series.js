const Sum = require('./engine/sum');
const reduce = require('./reduce');

module.exports = function(input) {
  return reduce(input, async function(sum, fn, key) {
    sum[key] = await fn();
    return sum;
  }, Sum(input), {
    limit: 1
  });
};