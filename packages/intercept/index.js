/**
 * <a id="intercept"></a>
 * Intercepts errors, the Go way!
 *
 * [![](https://img.shields.io/npm/v/apr-intercept.svg?style=flat-square)](https://www.npmjs.com/package/apr-intercept) [![](https://img.shields.io/npm/l/apr-intercept.svg?style=flat-square)](https://www.npmjs.com/package/apr-intercept)
 *
 * @kind function
 * @name intercept
 * @param {Promise} input
 * @returns {Promise}
 *
 * @example
 * import ctch from 'apr-intercept';
 *
 * const [err1, res1] = await ctch(fn(1));
 * const [err2, res2] = await ctch(fn(1));
 * const [, res3] = await ctch(fn(3));
 */
export default p => {
  return new Promise(resolve => {
    return p.then(
      (...res) => resolve([null, ...res]),
      err => resolve([err, undefined]),
    );
  });
};
