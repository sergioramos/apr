const isArray = require('lodash.isarraylike');

module.exports = function(input) {
  if (isArray(input) || input[Symbol.iterator]) {
    return [];
  }

  return {};
};
