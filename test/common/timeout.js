const buildArray = require('build-array');
const timeout = require('timeout-then');
const shuffle = require('array-shuffle');

const max = 2000;

module.exports = function(size) {
  const interval = max / size;
  const times = shuffle(buildArray(size).map((v, i) => interval * (i + 1)));

  let i = 0;

  return function(v) {
    return timeout(times[i++]).then(function() {
      return v;
    });
  };
};
