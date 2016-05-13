const isArrayLike = require('lodash.isarraylike');
const defaults = require('lodash.defaults');

const forEach = require('./forEach');

const Sum = function(input) {
  if (isArrayLike(input) || input[Symbol.iterator]) {
    return [];
  }

  return {};
};

const map = function(forEach, input, fn, opts, limit) {
  const sum = Sum(input);

  return forEach(input, fn, defaults(opts, {
    limit,
    after: function(value, item) {
      sum[item.key] = value;
    }
  })).then(function() {
    return sum;
  });
};

module.exports = function() {
  return map(forEach, ...arguments);
};

module.exports.series = function() {
  return map(forEach.series, ...arguments);
};

module.exports.limit = function(input, fn, limit, opts) {
  return map(forEach.limit, input, fn, opts, limit);
};
