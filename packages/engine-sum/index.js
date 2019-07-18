import IsArray from 'lodash.isarraylike';

export default input => {
  return IsArray(input) || input[Symbol.iterator] ? [] : {};
};
