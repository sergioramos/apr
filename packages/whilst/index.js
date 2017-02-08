const repeat = require('apr-engine-repeat');

module.exports = (test, fn) => {
  return repeat({
    test,
    fn,
    after: (tested) => {
      return !tested;
    }
  });
};
