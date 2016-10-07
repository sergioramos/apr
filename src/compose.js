const waterfall = require('./waterfall');
const reverse = require('lodash.reverse');

module.exports = function(...args) {
  return function(value) {
    const input = reverse([...args]);
    return waterfall(input, value);
  };
};
