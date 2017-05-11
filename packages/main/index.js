/**
 * <a id="main"></a>
 * Catches a promise error, writes the stacktrace to stderr and exists
 *
 * [![](https://img.shields.io/npm/v/apr-main.svg?style=flat-square)](https://www.npmjs.com/package/apr-main) [![](https://img.shields.io/npm/l/apr-main.svg?style=flat-square)](https://www.npmjs.com/package/apr-main)
 *
 * @kind function
 * @name main
 * @param {Promise} input
 * @returns {Promise}
 *
 * @example
 * import main from 'apr-main';
 *
 * main(async () => 'hello') // writes nothing
 * main(async () => undefined) // writes nothing
 * main(async () => { throw new Error('uncaught error') }) // writes the stack trace to stderr and exists
 */
module.exports = p =>
  p().catch(err => {
    console.error(err);
    process.exit(1);
  });
