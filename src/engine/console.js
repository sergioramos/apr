module.exports = function(type, fn, ...args) {
  return fn(...args).then(function(...args) {
    console[type](...args);

    return new Promise(function(resolve) {
      resolve(...args);
    });
  });
};
