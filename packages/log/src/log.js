const console = require('apr-engine-console');

module.exports = (fn, ...args) => {
  return console('log', fn, ...args);
};
