import BuildArray from 'build-array';
import IsArray from 'lodash.isarraylike';
import isFinite from 'lodash.isfinite';
import Keys from 'lodash.keys';

import until from 'apr-engine-until';

const wrap = fn => {
  let i = 0;

  const group = size => {
    if (isFinite(size)) {
      return BuildArray(size).map(next);
    }

    return until(() => next());
  };

  const next = size => {
    if (size) {
      return group(size);
    }

    return fn(i++);
  };

  return {
    next,
  };
};

const arr = input =>
  wrap(i => ({
    value: input[i],
    done: input.length === i,
    key: i,
  }));

const ittr = input =>
  wrap(i => {
    const item = input.next();

    return {
      done: item.done,
      value: item.value,
      key: i,
    };
  });

const obj = input => {
  const okeys = Keys(input);

  return wrap(i => {
    const key = okeys[i];

    return {
      value: input[key],
      done: okeys.length === i,
      key,
    };
  });
};

export default input => {
  if (IsArray(input)) {
    return arr(input);
  }

  if (input[Symbol.iterator]) {
    return ittr(input[Symbol.iterator]());
  }

  return obj(input);
};
