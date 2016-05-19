const isArray = require('lodash.isarraylike');
const find = require('lodash.find');

const Iterator = require('./iterator');
const Sum = require('./sum');

module.exports = function(ctx) {
  const after = function(res) {
    const rItems = Iterator(res).next(Infinity);
    const iItems = Iterator(ctx.input).next(Infinity);
    const isObj = !isArray(Sum(ctx.input));

    return rItems.map(function(result, y) {
      const input = !isObj ? iItems[result.key] : find(iItems, {
        key: result.key
      });

      return {
        input,
        result,
        key: result.key,
        isObj
      };
    });
  };

  return ctx.p
    .then(after)
    .then(ctx.fn);
};
