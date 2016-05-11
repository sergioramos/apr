var isNumber = require('is-number');

const series = async function(coll, ittn) {
  const next = function(ittr, i, end) {
    if (!isNumber(i)) {
      return next(ittr, 0, i);
    }

    return function() {
      const curr = ittr.next();

      if (curr.done) {
        return end();
      }

      ittn(curr.value, i, coll)
        .then(next(ittr, i + 1, end), end);
    };
  };

  return new Promise(function(resolve, reject) {
    next(coll[Symbol.iterator](), function(err) {
      return err ? reject(err) : resolve();
    })();
  });
};

const parallel = async function(coll, ittn) {
  let failed = false;
  let total = 0;
  let count = 0;

  const check = function(resolve) {
    return function() {
      if (failed) {
        return;
      }

      if (++count === total) {
        resolve();
      }
    };
  };

  const fail = function(reject) {
    return function(err) {
      failed = true;
      reject(err);
    };
  };

  return new Promise(function(resolve, reject) {
    for (let v of coll) {
      if (failed) {
        break;
      }

      ittn(v, total++, coll)
        .then(check(resolve), fail(reject));
    }
  });
};

module.exports = async function(coll, ittn, opts) {
  const fn = (opts || {}).parallel ? parallel : series;
  return await fn(coll, ittn);
};