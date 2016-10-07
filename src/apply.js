module.exports = (fn, ...args) => {
  return () => {
    return fn(...args);
  };
};
