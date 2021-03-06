<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## times

<a id="times"></a>
Calls the `iteratee` function `n` times, and accumulates results in the same manner you would use with [map](#map).

[![](https://img.shields.io/npm/v/apr-times.svg?style=flat-square)](https://www.npmjs.com/package/apr-times) [![](https://img.shields.io/npm/l/apr-times.svg?style=flat-square)](https://www.npmjs.com/package/apr-times)

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `iteratee` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 

**Examples**

```javascript
import times from 'apr-times';

const then = (v) => new Promise((resolve) => resolve(v));

const res = await times(6, async (i) =>
  await then(i);
);

// res = [0, 1, 2, 3, 4, 5]
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### series

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `iteratee` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### limit

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `limit` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `iteratee` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 
