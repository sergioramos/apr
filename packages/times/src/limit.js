const defaults = require('lodash.defaults');
const times = require('./times');

module.exports = (count, limit, fn, opts) => {
  return times(count, fn, defaults({
    limit
  }, opts));
};
