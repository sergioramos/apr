const run = require('./run');

module.exports = (input, fn, opts) => {
  return run({
    input,
    fn,
    opts
  });
};
