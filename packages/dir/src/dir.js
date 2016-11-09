const console = require('apr-engine-console');

module.exports = (fn, ...args) => {
  return console('dir', fn, ...args);
};
