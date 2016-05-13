const random = require('random-decimal');
const timeout = require('timeout-then');

module.exports = async function(v) {
  return timeout(random({
    min: 0,
    max: 1000
  })).then(function() {
    return v;
  });
};
