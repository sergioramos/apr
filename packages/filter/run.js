const Sum = require('apr-engine-sum');
const back = require('apr-engine-back');

module.exports = (input, p) => {
  const after = (items) => {
    return items.filter((item) => {
      return Boolean(item.result.value) && !item.result.done;
    }).reduce((sum, item, i) => {
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

module.exports.series = (input, fn, opts) => {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = (input, limit, fn, opts) => {
  return wrap(input, map.limit(input, limit, fn, opts));
};
