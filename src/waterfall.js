const each = require('./engine/each');

module.exports = function(input, initial) {
  let last = initial;

  return each({
    input,
    opts: {
      limit: 1
    },
    after: function(value, item) {
      last = value;
    },
    call: function(item) {
      return item.value(last);
    }
  }).then(function() {
    return last;
  });
};
