const defaults = require('lodash.defaults');

const each = require('apr-engine-each');
const Sum = require('apr-engine-sum');

module.exports = ctx => {
  const sum = Sum(ctx.input);

  return each(
    defaults(
      {
        after: (value, item) => {
          sum[item.key] = value;
        }
      },
      ctx
    )
  ).then(() => sum);
};
