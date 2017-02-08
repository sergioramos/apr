const run = require('./run');

module.exports = (input, fn, opts) => {
  return run({
    input,
    fn,
    opts
  });
};

module.exports.series = require('./series');
module.exports.limit = require('./limit');
