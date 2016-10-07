module.exports = function(fn) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      try {
        resolve(fn(...args));
      } catch (err) {
        reject(err);
      }
    });
  };
};
