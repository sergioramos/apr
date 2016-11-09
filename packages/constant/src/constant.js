module.exports = (...args) => {
  return () => {
    return new Promise((resolve) => {
      resolve(...args);
    });
  };
};
