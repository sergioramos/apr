module.exports = function(fn) {
  return function(...args) {
    return fn(...args).then(function(value) {
      return {
        value,
        error: null
      };
    }).catch(function(err) {
      return {
        value: null,
        error: err
      };
    });
  };
};
