const Sum = require('apr-engine-sum');
const back = require('apr-engine-back');

module.exports = (input, p) => {
  const after = items =>
    items
      .filter(item => !item.result.value && !item.result.done)
      .reduce((sum, item, i) => {
        const key = item.isObj ? item.key : i;
        sum[key] = item.input.value;
        return sum;
      }, Sum(input));

  return back({
    p,
    input
  }).then(after);
};
