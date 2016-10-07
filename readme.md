# apr - async promise resolve

Collection of tools to manage control flow of/with Promises - inspired by [caolan/async](https://github.com/caolan/async).

Works with and without async/await. The lib itself only uses promises.

<a id="contents"></a>
## contents

* [contents](#contents)
* [api](#api)
  * [collections](#collections)
    * [concat](#concat)
    * [concatSeries](#concat-series)
    * [detect](#detect)
    * [detectLimit](#detect-limit)
    * [detectSeries](#detect-series)
    * [each](#each)
    * [eachLimit](#each-limit)
    * [eachOf](#each-of)
    * [eachOfLimit](#each-of-limit)
    * [eachOfSeries](#each-of-series)
    * [eachSeries](#each-series)
    * [every](#every)
    * [everyLimit](#every-limit)
    * [everySeries](#every-series)
    * [filter](#filter)
    * [filterLimit](#filter-limit)
    * [filterSeries](#filter-series)
    * [map](#map)
    * [mapLimit](#map-limit)
    * [mapSeries](#map-series)
    * [mapValues](#map-salues)
    * [mapValuesLimit](#map-values-limit)
    * [mapValuesSeries](#map-values-series)
    * [reduce](#reduce)
    * [reduceRight](#reduce-right)
    * [reject](#reject)
    * [rejectLimit](#reject-limit)
    * [rejectSeries](#reject-series)
    * [some](#some)
    * [someLimit](#some-limit)
    * [someSeries](#some-series)
    * [sortBy](#sort-by)
    * [transform](#transform)
  * [control flow](#control-flow)
    * [compose](#compose)
    * [parallel](#parallel)
    * [parallelLimit](#parallel-limit)
    * [seq](#seq)
    * [series](#series)
    * [times](#times)
    * [timesLimit](#times-limit)
    * [timesSeries](#times-series)
    * [until](#until)
    * [waterfall](#waterfall)
    * [whilst](#whilst)
  * [utils](#utils)
    * [apply](#apply)
    * [asyncify](#asyncify)
    * [constant](#constant)
    * [dir](#dir)
    * [reflect](#reflect)
* [caolan/async parity](#async-parity)
* [license](#license)

<a id="api"></a>
## api

<a id="collections"></a>
### collections

<a id="each"></a>
#### each(arr, iteratee) / forEach(arr, iteratee)


```js
const writeFile = thenify(fs.writeFile);

await apr.each([
  '/home/.vimrc',
  '/home/.zshrc'
], async (file) => {
  return await writeFile(file, 'boom');
});
```

<a id="map"></a>
#### map(arr, iteratee)

```js
const stats = await apr.map([
  'file1',
  'file2',
  'file3'
], async (file) => {
  return await stat(file);
});
```

<a id="filter"></a>
#### filter(arr, iteratee)

```js
var existent = await apr.filter([
  'file1',
  'file2',
  'file3'
], async (file) => {
  return await access(file);
});
```

<a id="reject"></a>
#### reject(arr, iteratee)

```js
var missing = await apr.reject([
  'file1',
  'file2',
  'file3'
], async (file) => {
  return await access(file);
});
```

<a id="reduce"></a>
#### reduce(arr, iteratee, initialValue)

```js
const sum = await apr.reduce([1, 2, 3], async (sum, item) => {
  return new Promise((resolve) => {
    resolve(sum + item);
  });
});
```

<a id="find"></a>
#### find(arr, iteratee) / detect(arr, iteratee)

```js
const first = await apr.find([
  'file1',
  'file2',
  'file3'
], async (file) => {
  return await access(file);
});
```

<a id="sort-by"></a>
#### sortBy(arr, iteratee)

```js
const sorted = await apr.sortBy([
  'file1',
  'file2',
  'file3'
], await (file){
  const fstat = await stat(file);
  return fstat.mtime;
});
```

<a id="some"></a>
#### some(arr, iteratee)

```js
const oneExist = await apr.some([
  'file1',
  'file2',
  'file3'
], async (file) => {
  return await access(file);
});
```

<a id="every"></a>
#### every(coll, iteratee)

```js
const allExist = await apr.every([
  'file1',
  'file2',
  'file3'
], async (file) => {
  return await access(file);
});
```

<a id="concat"></a>
#### concat(arr, iteratee)

```js
const files = await apr.concat([
  'dir1',
  'dir2',
  'dir3'
], async (dir) => {
  return await readdir(dir);
});
```

<a id="control-flow"></a>
### control flow

<a id="series"></a>
#### series(tasks)

```js
const res = await apr.series([
  async () => {
    return await myAsyncFn1();
  },
  async () => {
    return await myAsyncFn2();
  }
]);
```

```js
const res = await apr.series({
  one: async () => {
    return await myAsyncFn1();
  },
  two: async () => {
    return await myAsyncFn2();
  }
});
```

<a id="parallel"></a>
#### parallel(tasks) / concurrent(tasks)

```js
const res = await apr.parallel([
  async () => {
    return await myAsyncFn1();
  },
  async () => {
    return await myAsyncFn2();
  }
]);
```
```js
const res = await apr.parallel({
  one: async () => {
    return await myAsyncFn1();
  },
  two: async () => {
    return await myAsyncFn2();
  }
});
```

<a id="utils"></a>
#### utils

<a id="async-parity"></a>
### [caolan/async](https://github.com/caolan/async) feature parity

Eventually it should have feature parity with [caolan/async](https://github.com/caolan/async).

##### [collections](#collections) 
 - [x] concat
 - [x] concatSeries
 - [x] detect
 - [x] detectLimit
 - [x] detectSeries
 - [x] each
 - [x] eachLimit
 - [x] eachOf
 - [x] eachOfLimit
 - [x] eachOfSeries
 - [x] eachSeries
 - [x] every
 - [x] everyLimit
 - [x] everySeries
 - [x] filter
 - [x] filterLimit
 - [x] filterSeries
 - [x] map
 - [x] mapLimit
 - [x] mapSeries
 - [x] mapValues
 - [x] mapValuesLimit
 - [x] mapValuesSeries
 - [x] reduce
 - [ ] reduceRight
 - [x] reject
 - [x] rejectLimit
 - [x] rejectSeries
 - [x] some
 - [x] someLimit
 - [x] someSeries
 - [x] sortBy
 - [ ] transform

##### control flow

 - [ ] applyEach
 - [ ] applyEachSeries
 - [ ] auto
 - [ ] autoInject
 - [ ] cargo
 - [x] compose
 - [ ] doDuring
 - [ ] doUntil
 - [ ] doWhilst
 - [ ] during
 - [ ] forever
 - [x] parallel
 - [x] parallelLimit
 - [ ] priorityQueue
 - [ ] queue
 - [ ] race
 - [ ] retry
 - [ ] retryable
 - [x] seq
 - [x] series
 - [x] times
 - [x] timesLimit
 - [x] timesSeries
 - [x] until
 - [x] waterfall
 - [x] whilst

##### utils

 - [x] apply
 - [x] asyncify
 - [x] constant
 - [x] dir
 - [ ] ensureAsync
 - [ ] log
 - [ ] memoize
 - [ ] nextTick
 - [x] reflect
 - [ ] reflectAll
 - [ ] setImmediate
 - [ ] timeout
 - [ ] unmemoize

<a id="license"></a>
## license

MIT
