const console = require('apr-engine-console');

module.exports = (fn, ...args) => console('dir', fn, ...args);
