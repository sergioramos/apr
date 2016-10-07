const isArray = require('lodash.isarraylike');
const sortBy = require('lodash.sortby');

const Sum = require('./engine/sum');
const back = require('./engine/back');
const map = require('./map');

const wrap = (input, p) => {
  const isObj = !isArray(Sum(input));

  const after = (items) => {
    return sortBy(items.filter((item) => {
      return !item.result.done;
    }), (item) => {
      return item.result.value;
    }).map((item) => {
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

module.exports = (input, fn, opts) => {
  return wrap(input, map(input, fn, opts));
};

module.exports.series = (input, fn, opts) => {
  return module.exports.limit(input, 1, fn, opts);
};

module.exports.limit = (input, limit, fn, opts) => {
  return wrap(input, map.limit(input, limit, fn, opts));
};
