const waterfall = require('./waterfall');

module.exports = function(...args) {
  return function(value) {
    return waterfall([...args], value);
  };
};
