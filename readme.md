// adicionar race

# apr - async promise resolve

### Utils

* [`apply`](#apply) // ou curry
* [`nextTick`](#nextTick)
* [`memoize`](#memoize)
* [`unmemoize`](#unmemoize)
* [`ensureAsync`](#ensureAsync)
* [`constant`](#constant)
* [`asyncify`](#asyncify)
* [`wrapSync`](#wrapSync)
* [`log`](#log)
* [`dir`](#dir)
* [`noConflict`](#noConflict)
* [`timeout`](#timeout)
* [`reflect`](#reflect)
* [`reflectAll`](#reflectAll)

## Collections

### each(arr, iteratee)


```js
const writeFile = thenify(fs.writeFile);

await apr.each([
  '/home/.vimrc',
  '/home/.zshrc'
], async function(file) {
  return await writeFile(file, 'boom');
});
```

### forEachOf(obj, iteratee)

```js
const obj = {
  dev: '/dev.json',
  test: '/test.json',
  prod: '/prod.json'
};

const configs = {};

await apr.forEachOf(obj, async function(k, v) {
  const src = await readFile(__dirname + v, 'utf8');
  configs[k] = JSON.parse(src);
});
```

### map(arr, iteratee)

```js
const stats = await apr.map([
  'file1',
  'file2',
  'file3'
], async function(file) {
  return await stat(file);
});
```

### filter(arr, iteratee)

```js
var existent = await apr.filter([
  'file1',
  'file2',
  'file3'
], async function(file) {
  return await access(file);
});
```

### reject(arr, iteratee)

```js
var missing = await apr.reject([
  'file1',
  'file2',
  'file3'
], async function(file) {
  return await access(file);
});
```

### reduce(arr, iteratee, initialValue)

```js
const sum = await apr.reduce([1, 2, 3], async function(sum, item) {
  return new Promise(function(resolve) {
    resolve(sum + item);
  });
});
```

### find(arr, iteratee)

```js
const first = await apr.find([
  'file1',
  'file2',
  'file3'
], async function(file) {
  return await access(file);
});
```

### sortBy(arr, iteratee)

```js
const sorted = await apr.sortBy([
  'file1',
  'file2',
  'file3'
], await function(file){
  const fstat = await stat(file);
  return fstat.mtime;
});
```

### some(arr, iteratee)

```js
const oneExist = await apr.some([
  'file1',
  'file2',
  'file3'
], async function(file) {
  return await access(file);
});
```

### every(coll, iteratee)

```js
const allExist = await apr.every([
  'file1',
  'file2',
  'file3'
], async function(file) {
  return await access(file);
});
```

### concat(arr, iteratee)

```js
const files = await apr.concat([
  'dir1',
  'dir2',
  'dir3'
], async function(dir) {
  return await readdir(dir);
});
```

## Control Flow

### series(tasks)

```js
const res = await apr.series([
  async function() {
    return await myAsyncFn1();
  },
  async function() {
    return await myAsyncFn2();
  }
]);

const res = await apr.series({
  one: async function() {
    return await myAsyncFn1();
  },
  two: async function() {
    return await myAsyncFn2();
  }
});
```

### parallel(tasks) // ou concurrent

```js
const res = await apr.parallel([
  async function() {
    return await myAsyncFn1();
  },
  async function() {
    return await myAsyncFn2();
  }
]);

const res = await apr.parallel({
  one: async function() {
    return await myAsyncFn1();
  },
  two: async function() {
    return await myAsyncFn2();
  }
});
```