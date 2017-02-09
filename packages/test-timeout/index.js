const buildArray = require('build-array');
const timeout = require('timeout-then');
const shuffle = require('array-shuffle');

const getTimes = (size, interval) =>
  shuffle(buildArray(size).map((v, i) => interval * (i + 1)));

const _checkTimes = (times) => times.map((time, i) => {
  const a = times[i - 1] || 0;
  const b = times[i + 1] || Infinity;

  const min = Math.min(a, b);
  const max = Math.max(a, b);

  return !(time > min && time < max);
}).every(Boolean);

const checkTimes = (times) => times.length > 1
  ? _checkTimes(times)
  : false;

module.exports = (size) => {
  const interval = size * 25;
  let times;

  do {
    times = getTimes(size, interval);
  } while (checkTimes(times));

  let i = 0;

  return (v) => timeout(times[i++]).then(() => v);
};
