const isArray = require('lodash.isarraylike');
const sortBy = require('lodash.sortby')

const Sum = require('./engine/sum');
const back = require('./engine/back');
const map = require('./map');

const wrap = function(input, p) {
  const isObj = !isArray(Sum(input));

  const after = function(items) {
    return sortBy(items.filter(function(item) {
      return !item.result.done;
    }), function(item) {
      return item.result.value;
    }).map(function(item) {
      return !isObj ? item.input.value : {
        key: item.key,
        value: item.input.value
      };
    });
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
  return wrap(input, map.series(input, fn, opts));
};

module.exports.limit = function(input, limit, fn, opts) {
  return wrap(input, map.limit(input, limit, fn, opts));
};
