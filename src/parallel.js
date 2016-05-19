const Sum = require('./engine/sum');
const reduce = require('./reduce');

module.exports = function(input) {
  return reduce(input, function(sum, fn, key) {
    return fn().then(function(res) {
      sum[key] = res;
      return sum;
    });
  }, Sum(input), {
    limit: Infinity
  });
};
