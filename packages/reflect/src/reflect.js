module.exports = (fn) => {
  return (...args) => {
    return fn(...args).then((value) => {
      return {
        value,
        error: null
      };
    }).catch((err) => {
      return {
        value: null,
        error: err
      };
    });
  };
};
