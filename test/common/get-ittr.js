module.exports = () => {
  const items = ['a', 'b', 'c', 'd'];

  return {
    [Symbol.iterator]: () => {
      return {
        i: -1,
        next: () => {
          this.i += 1;

          return {
            value: items[this.i],
            done: items.length === this.i
          };
        }
      };
    }
  };
};
