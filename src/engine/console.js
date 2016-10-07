module.exports = (type, fn, ...args) => {
  return fn(...args).then((...args) => {
    console[type](...args);

    return new Promise((resolve) => {
      resolve(...args);
    });
  });
};
