const isArray = require('lodash.isarraylike');
const find = require('lodash.find');

const Iterator = require('./engine/iterator');
const Sum = require('./engine/sum');
const map = require('./map');

const filter = function(input, p) {
  const after = function(res) {
    const rItems = Iterator(res).next(Infinity);
    const iItems = Iterator(input).next(Infinity);
    const sum = Sum(input);
    const isObj = !isArray(sum);

    const reducer = function(sum, r, y) {
      const i = !isObj ? y : r.key;
      const value = !isObj ? iItems[r.key].value : find(iItems, {
        key: r.key
      }).value;

      sum[i] = value;
      return sum;
    };

    return rItems.filter(function(r) {
      return Boolean(r.value);
    }).reduce(reducer, sum);
  };

  return p.then(after);
};

module.exports = function(input, fn, opts) {
  return filter(input, map(input, fn, opts));
};

module.exports.series = function(input, fn, opts) {
  return filter(input, map.series(input, fn, opts));
};

module.exports.limit = function(input, limit, fn, opts) {
  return filter(input, map.limit(input, limit, fn, opts));
};
