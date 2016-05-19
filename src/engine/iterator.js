const buildArray = require('build-array');
const isArray = require('lodash.isarraylike');
const isFinite = require('lodash.isfinite');
const keys = require('lodash.keys');

const until = require('./until');

const wrap = function(fn) {
  let done = false;
  let i = 0;

  const group = function(size) {
    if (isFinite(size)) {
      return buildArray(size).map(next);
    }

    return until(function() {
      return next();
    });
  };

  const next = function(size) {
    if (size) {
      return group(size);
    }

    const item = fn(i++);
    done = item.done;

    return item;
  };

  return {
    next
  };
};

const arr = function(input) {
  return wrap(function(i) {
    return {
      value: input[i],
      done: input.length === i,
      key: i
    };
  });
};

const ittr = function(input) {
  return wrap(function(i) {
    const item = input.next();

    return {
      done: item.done,
      value: item.value,
      key: i
    };
  });
};

const obj = function(input) {
  const okeys = keys(input);

  return wrap(function(i) {
    const key = okeys[i];

    return {
      value: input[key],
      done: okeys.length === i,
      key
    };
  });
};

module.exports = function(input) {
  if (isArray(input)) {
    return arr(input);
  }

  if (input[Symbol.iterator]) {
    return ittr(input[Symbol.iterator]());
  }

  return obj(input);
};
