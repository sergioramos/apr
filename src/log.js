const console = require('./engine/console');

module.exports = function(fn, ...args) {
  return console('log', fn, ...args);
};
