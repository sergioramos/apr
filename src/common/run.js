const Iterator = require('./iterator');

module.exports = function(input, fn, opts) {
  const ittr = Iterator(input);

  let done = false;
  let brk = false;

  const after = function(items, end) {
    return function(v) {
      brk = brk || items.some(function(item, i) {
        return opts.after && opts.after(v[i], item);
      });

      done = done || brk;

      return done ? end() : next(end);
    };
  };

  const next = function(end) {
    const items = ittr.next(opts.limit).filter(function(item) {
      done = done || item.done;
      return !item.done;
    });

    Promise.all(items.map(function(item) {
      return fn(item.value, item.key, input);
    })).then(after(items, end), end);
  };

  return new Promise(function(resolve, reject) {
    next(function(err, res) {
      return err ? reject(err) : resolve(res);
    });
  });
};
