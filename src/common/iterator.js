const buildArray = require('build-array');
const isFinite = require('lodash.isfinite');
const isArrayLike = require('lodash.isarraylike');
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
    if (done) {
      return {
        done
      };
    }

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

const arr = function(arr) {
  return wrap(function(i) {
    return {
      value: arr[i],
      done: arr.length === i,
      key: i
    };
  });
};

const ittr = function(ittr) {
  return wrap(function(i) {
    const item = ittr.next();

    return {
      done: item.done,
      value: item.value,
      key: i
    };
  });
};

const obj = function(obj) {
  const okeys = keys(obj);

  return wrap(function(i) {
    const key = okeys[i];

    return {
      value: obj[key],
      done: okeys.length === i,
      key
    };
  });
};

module.exports = function(coll) {
  if (isArrayLike(coll)) {
    return arr(coll);
  }

  if (coll[Symbol.iterator]) {
    return ittr(coll[Symbol.iterator]());
  }

  return obj(coll);
};
