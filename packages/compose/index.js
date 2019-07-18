import Waterfall from 'apr-waterfall';
import Reverse from 'lodash.reverse';

/**
 * <a id="sompose"></a>
 * Creates a function which is a composition of the passed asynchronous functions. Each function consumes the return value of the function that follows. Composing functions f(), g(), and h() would produce the result of f(g(h())).
 *
 * [![](https://img.shields.io/npm/v/apr-compose.svg?style=flat-square)](https://www.npmjs.com/package/apr-compose) [![](https://img.shields.io/npm/l/apr-compose.svg?style=flat-square)](https://www.npmjs.com/package/apr-compose)
 *
 * @kind function
 * @name compose
 * @param {Function} function
 * @returns {Function}
 *
 * @example
 * import compose from 'apr-compose';
 *
 * const then = (v) => new Promise((resolve) => resolve(v));
 *
 * const composed = compose(
 *   async (v) => await then(v + 1),
 *   async (v) => await then(v + 2),
 *   async (v) => await then(v + 3)
 * );
 *
 * const output = await composed(1); // 7
 */
export default (...args) => value => {
  return Waterfall(Reverse([...args]), value);
};
