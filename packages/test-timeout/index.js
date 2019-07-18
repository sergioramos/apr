import BuildArray from 'build-array';
import Timeout from 'timeout-then';
import Shuffle from 'array-shuffle';

const checkTimes = times => {
  return !times
    .map((time, i) => {
      const a = times[i - 1] || -Infinity;
      const b = times[i + 1] || Infinity;

      const min = Math.min(a, b);
      const max = Math.max(a, b);

      return time > min && time < max;
    })
    .every(Boolean);
};

const getTimes = (size, interval) => {
  const times = Shuffle(BuildArray(size).map((v, i) => interval * (i + 1)));

  if (times.length === 1) {
    return times;
  }

  if (checkTimes(times)) {
    return times;
  }

  return getTimes(size, interval);
};

export default (size, label) => {
  const interval = size * 25;
  const times = getTimes(size, interval);

  let i = 0;

  return v => Timeout(times[i++]).then(() => v);
};
