const console = require('./engine/console');

module.exports = (fn, ...args) => {
  return console('dir', fn, ...args);
};
