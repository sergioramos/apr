const findLimit = require('apr-find/limit');
const then = require('./then');

module.exports = (...args) => {
  return findLimit(...args).then(then);
};
