const Iterator = require('./iterator');

module.exports = function(input, fn, opts) {
  const ittr = Iterator(input);

  let done = false;

  const after = function(end) {
    return function() {
      return done ? end() : next(end);
    };
  };

  const next = function(end) {
    const items = ittr.next(opts.limit);

    Promise.all(items.filter(function(item) {
      done = done || item.done;
      return !item.done;
    }).map(function(item) {
      return fn(item.value, item.key, input);
    })).then(after(end), end);
  };

  return new Promise(function(resolve, reject) {
    next(function(err, res) {
      return err ? reject(err) : resolve(res);
    });
  });
};
