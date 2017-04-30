const defaults = require('lodash.defaults');
const isArray = require('lodash.isarraylike');

const each = require('apr-engine-each');
const Sum = require('apr-engine-sum');

module.exports = ctx => {
  let first = null;

  return each(
    defaults(
      {
        after: (value, item) => {
          first = Boolean(value) && item;
          return first;
        }
      },
      ctx
    )
  ).then(
    () =>
      first &&
      (isArray(Sum(ctx.input))
        ? first.value
        : {
            key: first.key,
            value: first.value
          })
  );
};
