module.exports = function() {
  const items = ['a', 'b', 'c', 'd'];

  return {
    [Symbol.iterator]: function() {
      return {
        i: -1,
        next: function() {
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
