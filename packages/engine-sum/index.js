const isArray = require('lodash.isarraylike');

module.exports = input => (isArray(input) || input[Symbol.iterator] ? [] : {});
