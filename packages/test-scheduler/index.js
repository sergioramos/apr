const PQueue = require('p-queue');

module.exports = (concurrency) => {
  const queue = new PQueue({
    concurrency: concurrency || 1
  });

  return (task) => (t) => queue.add(() => task(t))
};
