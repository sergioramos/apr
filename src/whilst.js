const repeat = require('./engine/repeat');

module.exports = function(test, fn) {
  return repeat({
    test,
    fn,
    after: function(tested) {
      return !tested;
    }
  });
};
