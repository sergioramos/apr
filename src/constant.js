module.exports = function(...args) {
  return function() {
    return new Promise(function(resolve) {
      resolve(...args);
    });
  };
};
