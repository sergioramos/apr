const filter = require('./engine/filter');
const map = require('./map');

const wrap = function(input, p) {
  return filter({
    p,
    input,
    fn: function(r) {
      return !r.value && !r.done;
    }
  });
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
