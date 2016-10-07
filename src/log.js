const console = require('./engine/console');

module.exports = (fn, ...args) => {
  return console('log', fn, ...args);
};
