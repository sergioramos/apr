module.exports = function(fn, ...args) {
  return function() {
    return fn(...args);
  };
};
