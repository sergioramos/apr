const isArray = require('lodash.isarraylike');
const find = require('lodash.find');

const filter = require('./filter');
const Iterator = require('./iterator');
const Sum = require('./sum');

module.exports = function(ctx) {
  const after = function(res) {
    const rItems = Iterator(res).next(Infinity);
    const iItems = Iterator(ctx.input).next(Infinity);
    const sum = Sum(ctx.input);
    const isObj = !isArray(sum);

    const reducer = function(sum, r, y) {
      const i = !isObj ? y : r.key;
      const value = !isObj ? iItems[r.key].value : find(iItems, {
        key: r.key
      }).value;

      sum[i] = value;
      return sum;
    };

    return rItems.filter(ctx.fn).reduce(reducer, sum);
  };

  return ctx.p.then(after);
};
