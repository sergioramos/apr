const limit = require('./limit');

module.exports = (input, fn, opts) => {
  return limit(input, 1, fn, opts);
};
