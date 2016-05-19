const find = require('./find');

const some = function(first) {
  return Boolean(first);
};

module.exports = function(input, fn, opts) {
  return find(...arguments).then(some);;
};

module.exports.series = function(input, fn, opts) {
  return find.series(...arguments).then(some);
};

module.exports.limit = function(input, limit, fn, opts) {
  return find.limit(...arguments).then(some);
};
