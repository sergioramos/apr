const buildArray = require('build-array');
const isArray = require('lodash.isarraylike');
const isFinite = require('lodash.isfinite');
const keys = require('lodash.keys');

const until = require('apr-engine-until');

const wrap = (fn) => {
  let i = 0;

  const group = (size) => {
    if (isFinite(size)) {
      return buildArray(size).map(next);
    }

    return until(() => {
      return next();
    });
  };

  const next = (size) => {
    if (size) {
      return group(size);
    }

    return fn(i++);
  };

  return {
    next
  };
};

const arr = (input) => {
  return wrap((i) => {
    return {
      value: input[i],
      done: input.length === i,
      key: i
    };
  });
};

const ittr = (input) => {
  return wrap((i) => {
    const item = input.next();

    return {
      done: item.done,
      value: item.value,
      key: i
    };
  });
};

const obj = (input) => {
  const okeys = keys(input);

  return wrap((i) => {
    const key = okeys[i];

    return {
      value: input[key],
      done: okeys.length === i,
      key
    };
  });
};

module.exports = (input) => {
  if (isArray(input)) {
    return arr(input);
  }

  if (input[Symbol.iterator]) {
    return ittr(input[Symbol.iterator]());
  }

  return obj(input);
};
