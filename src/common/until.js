const until = function(sum, next) {
  const curr = next();
  const items = sum.concat([curr]);

  if (curr.done) {
    return items;
  }

  return until(items, next);
};

module.exports = function(next) {
  return until([], next);
};
