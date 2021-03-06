<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## reduce

<a id="reduce"></a>
Reduces `coll` into a single value using an async `iteratee` to return each successive step.

[![](https://img.shields.io/npm/v/apr-reduce.svg?style=flat-square)](https://www.npmjs.com/package/apr-reduce) [![](https://img.shields.io/npm/l/apr-reduce.svg?style=flat-square)](https://www.npmjs.com/package/apr-reduce)

**Parameters**

-   `input` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | Iterable)** 
-   `iteratee` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 

**Examples**

```javascript
import reduce from 'apr-reduce';

const sum = await reduce([1, 2, 3], async (sum, item) =>
  new Promise((resolve) => resolve(sum + item))
);
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 
