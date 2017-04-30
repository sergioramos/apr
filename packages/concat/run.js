const defaults = require('lodash.defaults');
const each = require('apr-engine-each');

module.exports = ctx => {
  let total;

  return each(
    defaults(
      {
        after: (value, item, i) => {
          total = i === 0 ? value : total + value;
        }
      },
      ctx
    )
  ).then(() => total);
};
