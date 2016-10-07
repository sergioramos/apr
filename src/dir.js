const console = require('./engine/console');

module.exports = function(fn, ...args) {
  return console('dir', fn, ...args);
};
