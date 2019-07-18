/**
 * <a id="awaitify"></a>
 * Transform a callback-based function into a promise-based one.
 *
 * [![](https://img.shields.io/npm/v/apr-awaitify.svg?style=flat-square)](https://www.npmjs.com/package/apr-awaitify) [![](https://img.shields.io/npm/l/apr-awaitify.svg?style=flat-square)](https://www.npmjs.com/package/apr-awaitify)
 *
 * @kind function
 * @name awaitify
 * @param {Function} function
 * @returns {Function}
 *
 * @example
 * import { readFile as readFileCb } from 'fs';
 * import awaitify from 'apr-awaitify';
 * import path from 'path';
 *
 * const readFile = awaitify(readFileCb);
 * const pkgPath = path.join(__dirname, './package.json');
 *
 * const pkg = await readFile(pkgPath, 'utf-8');
 */
export default fn => (...args) => {
  return new Promise((resolve, reject) => {
    return fn(...args, (err, ...args) => {
      return err ? reject(err) : resolve(...args);
    });
  });
};
