const buildArray = require('build-array');
const timeout = require('timeout-then');
const shuffle = require('array-shuffle');

const checkTimes = times =>
  !times
    .map((time, i) => {
      const a = times[i - 1] || -Infinity;
      const b = times[i + 1] || Infinity;

      const min = Math.min(a, b);
      const max = Math.max(a, b);

      return time > min && time < max;
    })
    .every(Boolean);

const getTimes = (size, interval) => {
  const times = shuffle(buildArray(size).map((v, i) => interval * (i + 1)));

  if (times.length === 1) {
    return times;
  }

  if (checkTimes(times)) {
    return times;
  }

  return getTimes(size, interval);
};

module.exports = (size, label) => {
  const interval = size * 25;
  const times = getTimes(size, interval);

  let i = 0;

  return v => timeout(times[i++]).then(() => v);
};
