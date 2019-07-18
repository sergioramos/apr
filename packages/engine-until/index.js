const until = (sum, next) => {
  const curr = next();
  const items = sum.concat([curr]);
  return curr.done ? items : until(items, next);
};

export default next => {
  return until([], next);
};
