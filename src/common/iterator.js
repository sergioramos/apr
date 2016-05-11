const isArrayLike = require('lodash.isarraylike');
const keys = require('lodash.keys');

const arr = function(arr) {
  let len = arr.length;
  let i = -1;

  return {
    next: function() {
      i += 1;

      return {
        value: arr[i],
        done: arr.length === i,
        key: i
      };
    }
  };
};

const ittr = function(ittr) {
  let i = -1;

  return {
    next: function() {
      i += 1;

      const curr = ittr.next();

      return {
        done: curr.done,
        value: curr.value,
        key: i
      };
    }
  };
};

const obj = function(obj) {
  let okeys = keys(obj);
  let len = okeys.length;
  let i = -1;

  return {
    next: function() {
      i += 1;

      const key = okeys[i];

      return {
        value: obj[key],
        done: okeys.length === i,
        key: key
      };
    }
  };
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