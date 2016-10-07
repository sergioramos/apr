const isArray = require('lodash.isarraylike');

module.exports = (input) => {
  if (isArray(input) || input[Symbol.iterator]) {
    return [];
  }

  return {};
};
