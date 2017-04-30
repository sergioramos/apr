const isArray = require('lodash.isarraylike');
const sortBy = require('lodash.sortby');
const Sum = require('apr-engine-sum');
const back = require('apr-engine-back');

module.exports = (input, p) => {
  const isObj = !isArray(Sum(input));

  const after = items =>
    sortBy(
      items.filter(item => !item.result.done),
      item => item.result.value
    ).map(
      item =>
        (!isObj
          ? item.input.value
          : {
              key: item.key,
              value: item.input.value
            })
    );

  return back({
    p,
    input
  }).then(after);
};
