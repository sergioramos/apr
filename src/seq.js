const waterfall = require('./waterfall');

module.exports = (...args) => {
  return (value) => {
    return waterfall([...args], value);
  };
};
