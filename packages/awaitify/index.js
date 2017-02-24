module.exports = (fn) => (...args) =>
  new Promise((resolve, reject) => fn(...args, (err, ...args) => err
    ? reject(err)
    : resolve(...args)
  ));
