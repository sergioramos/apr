const defaults = require('lodash.defaults');
const each = require('apr-engine-each');

module.exports = ctx => {
  let found = true;

  return each(
    defaults(
      {
        after: (value, item) => {
          found = Boolean(value);
          return !found;
        }
      },
      ctx
    )
  ).then(() => found);
};
