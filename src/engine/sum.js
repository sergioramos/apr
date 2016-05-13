const isArrayLike = require('lodash.isarraylike');

module.exports = function(input) {
  if (isArrayLike(input) || input[Symbol.iterator]) {
    return [];
  }

  return {};
};
