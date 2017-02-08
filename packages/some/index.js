const find = require('apr-find');
const then = require('./then');

module.exports = (...args) => {
  return find(...args).then(then);
};

module.exports.series = require('./series');
module.exports.limit = require('./limit');
