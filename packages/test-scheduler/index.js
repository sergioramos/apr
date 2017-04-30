module.exports = () => {
  const queue = [];
  let running = null;

  const run = () => {
    if (running || !queue.length) {
      return;
    }

    const task = queue.pop();

    running = task.id;

    const resolve = (err, val) => {
      running = null;
      run();

      return err ? task.reject(err) : task.resolve(val);
    };

    task.fn(...task.args).then(val => resolve(null, val), err => resolve(err));
  };

  const add = (fn, args) => (resolve, reject) => {
    queue.push({
      id: new Date().getTime(),
      args,
      fn,
      resolve,
      reject
    });

    run();
  };

  return fn => (...args) => new Promise(add(fn, args));
};
