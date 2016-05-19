const Sum = require('./engine/sum');
const back = require('./engine/back');
const map = require('./map');

const wrap = function(input, p) {
  const after = function(items) {
    return items.filter(function(item) {
      return !item.result.value && !item.result.done;
    }).reduce(function(sum, item, i) {
      const key = item.isObj ? item.key : i;
      sum[key] = item.input.value;
      return sum;
    }, Sum(input));
  };

  return back({
    p,
    input
  }).then(after);
};

module.exports = function(input, fn, opts) {
  return wrap(input, map(input, fn, opts));
};

module.exports.series = function(input, fn, opts) {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = function(input, limit, fn, opts) {
  return wrap(input, map.limit(input, limit, fn, opts));
};
