const repeat = require('./engine/repeat');

module.exports = (test, fn) => {
  return repeat({
    test,
    fn,
    after: (tested) => {
      return Boolean(tested);
    }
  });
};
