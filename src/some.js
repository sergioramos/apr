const find = require('./find');

const some = function(first) {
  return Boolean(first);
};

module.exports = function(input, fn, opts) {
  return find(...arguments).then(some);;
};

module.exports.series = function(input, fn, opts) {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = function(input, limit, fn, opts) {
  return find.limit(...arguments).then(some);
};
