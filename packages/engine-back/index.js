const isArray = require('lodash.isarraylike');
const find = require('lodash.find');

const Iterator = require('apr-engine-iterator');
const Sum = require('apr-engine-sum');

module.exports = ctx => {
  const after = res => {
    const rItems = Iterator(res).next(Infinity);
    const iItems = Iterator(ctx.input).next(Infinity);
    const isObj = !isArray(Sum(ctx.input));

    return rItems.map((result, y) => {
      const input = !isObj
        ? iItems[result.key]
        : find(iItems, {
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

  return ctx.p.then(after).then(ctx.fn);
};
