import IsArray from 'lodash.isarraylike';
import Find from 'lodash.find';
import Iterator from 'apr-engine-iterator';
import Sum from 'apr-engine-sum';

export default ctx => {
  const after = res => {
    const rItems = Iterator(res).next(Infinity);
    const iItems = Iterator(ctx.input).next(Infinity);
    const isObj = !IsArray(Sum(ctx.input));

    return rItems.map((result, y) => {
      const input = !isObj
        ? iItems[result.key]
        : Find(iItems, { key: result.key });

      return { input, result, key: result.key, isObj };
    });
  };

  return ctx.p.then(after).then(ctx.fn);
};
