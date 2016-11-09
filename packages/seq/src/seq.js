const waterfall = require('apr-waterfall');

module.exports = (...args) => {
  return (value) => {
    return waterfall([...args], value);
  };
};
