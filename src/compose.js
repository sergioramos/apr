const waterfall = require('./waterfall');
const reverse = require('lodash.reverse');

module.exports = (...args) => {
  return (value) => {
    const input = reverse([...args]);
    return waterfall(input, value);
  };
};
