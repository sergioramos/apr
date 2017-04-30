const until = (sum, next) => {
  const curr = next();
  const items = sum.concat([curr]);

  if (curr.done) {
    return items;
  }

  return until(items, next);
};

module.exports = next => until([], next);
