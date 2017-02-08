const each = require('apr-engine-each');

module.exports = (input, initial) => {
  let last = initial;

  return each({
    input,
    opts: {
      limit: 1
    },
    after: (value, item) => {
      last = value;
    },
    call: (item) => {
      return item.value(last);
    }
  }).then(() => {
    return last;
  });
};
