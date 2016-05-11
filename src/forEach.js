const defaults = require('lodash.defaults');
const Iterator = require('./common/iterator');
const once = require('onetime');

const series = async function(coll, ittn) {
  const ittr = Iterator(coll);

  const next = function(ittr, end) {
    return function() {
      const curr = ittr.next();

      if (curr.done) {
        return end();
      }

      ittn(curr.value, curr.key, coll)
        .then(next(ittr, end), end);
    };
  };

  return new Promise(function(resolve, reject) {
    next(ittr, once(function(err) {
      return err ? reject(err) : resolve();
    }))();
  });
};

const parallel = async function(coll, ittn) {
  const ittr = Iterator(coll);

  let total = -1;
  let count = 0;
  let err = null;

  const check = function(end) {
    return function() {
      if (err) {
        return end(err);
      }

      if (count++ === total) {
        end();
      }
    };
  };

  const fail = function(end) {
    return function(er) {
      end(err = er);
    };
  };

  const next = function(ittr, end) {
    if (err) {
      return end(err);
    }

    const curr = ittr.next();

    if (curr.done) {
      return;
    }

    total += 1;

    ittn(curr.value, curr.key, coll)
      .then(check(end), fail(end));

    next(ittr, end);
  }

  return new Promise(function(resolve, reject) {
    next(ittr, once(function(err) {
      return err ? reject(err) : resolve();
    }));
  });
};

module.exports = async function(coll, ittn, options) {
  const fn = defaults(options, {
    series: false
  }).series ? series : parallel;

  return await fn(coll, ittn);
};

module.exports.series = async function(coll, ittn, options) {
  return await module.exports(coll, ittn, defaults({
    series: true
  }, options));
};