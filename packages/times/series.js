const limit = require('./limit');

module.exports = (count, fn, opts) => {
  return limit(count, 1, fn, opts);
};
