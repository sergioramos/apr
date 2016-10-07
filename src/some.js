const find = require('./find');

const some = (first) => {
  return Boolean(first);
};

module.exports = (input, fn, opts) => {
  return find(...arguments).then(some);
};

module.exports.series = (input, fn, opts) => {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = (input, limit, fn, opts) => {
  return find.limit(...arguments).then(some);
};
