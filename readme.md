# apr - async promise resolve

Collection of tools to manage control flow of/with Promises - inspired by [caolan/async](https://github.com/caolan/async).

Works with and without async/await. The lib itself only uses promises.

As someone beautifully put it:

> this is like [caolan/async](https://github.com/caolan/async) which is like [lodash](https://github.com/lodash/lodash) but async, but awaitful

<a id="contents"></a>
## contents

* [contents](#contents)
* [api](#api)
  * [collections](#collections)
    * [concat](#concat) ([series](#concat-series), [limit](#concat-limit))
    * [find](#find) ([series](#find-series), [limit](#find-limit))
    * [forEach](#each) ([series](#each-series), [limit](#each-limit))
    * [every](#every) ([series](#every-series), [limit](#every-limit))
    * [filter](#filter) ([series](#filter-series), [limit](#filter-limit))
    * [map](#map) ([series](#map-series), [limit](#map-limit))
    * [reduce](#reduce)
    * [reject](#reject) ([series](#reject-series), [limit](#reject-limit))
    * [some](#some) ([some](#some-series), [limit](#some-limit))
    * [sortBy](#sort-by) ([some](#sort-by-series), [limit](#sort-by-limit))
  * [control flow](#control-flow)
    * [compose](#compose)
    * [parallel](#parallel)
    * [seq](#seq)
    * [series](#series)
    * [times](#times) ([some](#times-series), [limit](#times-limit))
    * [until](#until)
    * [waterfall](#waterfall)
    * [whilst](#whilst)
  * [utils](#utils)
    * [apply](#apply)
    * [asyncify](#asyncify)
    * [constant](#constant)
* [todo](#todo)
* [caolan/async parity](#async-parity)
* [credits](#credits)
* [license](#license)

<a id="api"></a>
## api

<a id="collections"></a>
### collections

You can use `arrays`, `objects` and [`iterables`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols) as the input for all the collection functions. 

<a id="concat"></a>
#### concat(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

Applies `iteratee` to each item in `coll`, concatenating the results. Returns the concatenated list.

```js
import concat from 'apr-concat'

const readdir = thenify(fs.readdir);
const dirs = [
  'dir1',
  'dir2',
  'dir3'
];

const files = await concat(dirs, async (dir) => 
  await readdir(dir)
);
```

<a id="concat-series"></a>
##### concatSeries(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

```js
import concatSeries from 'apr-concat/series'
// import { series as concatSeries } from 'apr-concat/series'
```

<a id="concat-limit"></a>
##### concatLimit(coll: array | Iterable<any> | Object, limit: number, iteratee: Promise): Promise

```js
import concatLimit from 'apr-concat/limit'
// import { limit as concatLimit } from 'apr-concat/limit'
```

<a id="find"></a>
#### find(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

Returns the first value in `coll` that passes an async truth test.

```js
import concat from 'apr-concat'

const access = thenify(fs.access);
const files = [
  'file1',
  'file2',
  'file3'
];

const first = await find(files, async (file) =>
  await access(file)
);
```

<a id="find-series"></a>
##### findSeries(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

```js
import findSeries from 'apr-find/series'
// import { series as findSeries } from 'apr-find/series'
```

<a id="find-limit"></a>
##### findLimit(coll: array | Iterable<any> | Object, limit: number, iteratee: Promise): Promise

```js
import findLimit from 'apr-find/limit'
// import { limit as findLimit } from 'apr-find/limit'
```

<a id="each"></a>
#### forEach(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

Applies the function `iteratee` to each item in `coll`, in parallel.

```js
import forEach from 'apr-for-each'

const writeFile = thenify(fs.writeFile);
const files = [
  '/home/.vimrc',
  '/home/.zshrc'
];

await each(files, async (file) => 
  await writeFile(file, 'boom')
);
```

<a id="each-series"></a>
##### forEachSeries(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

```js
import forEachSeries from 'apr-for-each/series'
// import { series as forEachSeries } from 'apr-for-each/series'
```

<a id="each-limit"></a>
##### forEachLimit(coll: array | Iterable<any> | Object, limit: number, iteratee: Promise): Promise

```js
import forEachLimit from 'apr-for-each/limit'
// import { limit as forEachLimit } from 'apr-for-each/limit'
```

<a id="every"></a>
#### every(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

Returns true if every element in `coll` satisfies an async test. 

```js
import every from 'apr-every'

const access = thenify(fs.access);
const files = [
  'file1',
  'file2',
  'file3'
];

const allExist = await every(files, async (file) => 
  await access(file)
);
```

<a id="every-series"></a>
##### everySeries(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

```js
import everySeries from 'apr-every/series'
// import { series as everySeries } from 'apr-every/series'
```

<a id="every-limit"></a>
##### everyLimit(coll: array | Iterable<any> | Object, limit: number, iteratee: Promise): Promise

```js
import everyLimit from 'apr-every/limit'
// import { limit as everyLimit } from 'apr-every/limit'
```

<a id="filter"></a>
#### filter(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

Returns a new array of all the values in `coll` which pass an async truth test.

```js
import filter from 'apr-filter'

const access = thenify(fs.access);
const files = [
  'file1',
  'file2',
  'file3'
];

var existent = await filter(files, async (file) => 
  await access(file)
);
```

<a id="filter-series"></a>
##### filterSeries(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

```js
import filterSeries from 'apr-filter/series'
// import { series as filterSeries } from 'apr-filter/series'
```

<a id="filter-limit"></a>
##### filterLimit(coll: array | Iterable<any> | Object, limit: number, iteratee: Promise): Promise

```js
import filterLimit from 'apr-filter/limit'
// import { limit as filterLimit } from 'apr-filter/limit'
```

<a id="map"></a>
#### map(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

Produces a new collection of values by mapping each value in `coll` through the `iteratee` function.

```js
import map from 'apr-map'

const stat = thenify(fs.stat);
const files = [
  'file1',
  'file2',
  'file3'
];

const stats = await map(files, async (file) => 
  await stat(file);
);
```

<a id="map-series"></a>
##### mapSeries(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

```js
import mapSeries from 'apr-map/series'
// import { series as mapSeries } from 'apr-map/series'
```

<a id="map-limit"></a>
##### mapLimit(coll: array | Iterable<any> | Object, limit: number, iteratee: Promise): Promise

```js
import mapLimit from 'apr-map/limit'
// import { limit as mapLimit } from 'apr-map/limit'
```

<a id="reduce"></a>
#### reduce(coll: array | Iterable<any> | Object, iteratee: Promise, initialValue: any): Promise

Reduces `coll` into a single value using an async `iteratee` to return each successive step.

```js
import reduce from 'apr-reduce'

const sum = await reduce([1, 2, 3], async (sum, item) => 
  new Promise((resolve) => resolve(sum + item))
);
```

<a id="reject"></a>
#### reject(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

The opposite of [`filter`](#filter). Removes values that pass an async truth test.

```js
import reject from 'apr-reject'

const access = thenify(fs.access);
const files = [
  'file1',
  'file2',
  'file3'
];

var missing = await reject(files, async (file) => 
  await access(file)
);
```

<a id="reject-series"></a>
##### rejectSeries(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

```js
import rejectSeries from 'apr-reject/series'
// import { series as rejectSeries } from 'apr-reject/series'
```

<a id="reject-limit"></a>
##### rejectLimit(coll: array | Iterable<any> | Object, limit: number, iteratee: Promise): Promise

```js
import rejectLimit from 'apr-reject/limit'
// import { limit as rejectLimit } from 'apr-reject/limit'
```

<a id="some"></a>
#### some(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

Returns true if at least one element in the `coll` satisfies an async test.

```js
import some from 'apr-some'

const access = thenify(fs.access);
const files = [
  'file1',
  'file2',
  'file3'
];

const oneExist = await some(files, async (file) => 
  await access(file)
);
```

<a id="some-series"></a>
##### someSeries(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

```js
import someSeries from 'apr-some/series'
// import { series as someSeries } from 'apr-some/series'
```

<a id="some-limit"></a>
##### someLimit(coll: array | Iterable<any> | Object, limit: number, iteratee: Promise): Promise

```js
import someLimit from 'apr-some/limit'
// import { limit as someLimit } from 'apr-some/limit'
```

<a id="sort-by"></a>
#### sortBy(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

Sorts a list by the results of running each `coll` value through an async `iteratee`.

```js
import sortBy from 'apr-sort-by'

const stat = thenify(fs.stat);
const files = [
  'file1',
  'file2',
  'file3'
];

const sorted = await sortBy(files, await (file) => {
  const { mtime } = await stat(file);
  return mtime;
});
```

<a id="sort-by-series"></a>
##### sortBySeries(coll: array | Iterable<any> | Object, iteratee: Promise): Promise

```js
import sortBySeries from 'apr-sort-by/series'
// import { series as sortBySeries } from 'apr-sort-by/series'
```

<a id="sort-by-limit"></a>
##### sortByLimit(coll: array | Iterable<any> | Object, limit: number, iteratee: Promise): Promise

```js
import sortByLimit from 'apr-sort-by/limit'
// import { limit as sortByLimit } from 'apr-sort-by/limit'
```

<a id="control-flow"></a>
### control flow

<a id="sompose"></a>
#### compose(...tasks: Array<Promise>): (input: any): Promise

Creates a function which is a composition of the passed asynchronous functions. Each function consumes the return value of the function that follows. Composing functions f(), g(), and h() would produce the result of f(g(h())).

```js
import compose from 'apr-compose'

const then = (v) => new Promise((resolve) => resolve(v))

const composed = compose(
  async (v) => await then(v + 1),
  async (v) => await then(v + 2),
  async (v) => await then(v + 3)
);

const output = await composed(1); // 7
```

<a id="parallel"></a>
#### parallel(tasks: Array<Promise> | Object): Promise

Run the tasks collection of functions in parallel, without waiting until the previous function has completed. 

```js
import parallel from 'apr-parallel'

const then = (v) => new Promise((resolve) => resolve(v))

const withArray = await parallel([
  async () => await then(1),
  async () => await then(2)
]);

// withArray = [1, 2]

const withObject = await parallel({
  one: async () => await then(1),
  two: async () => await then(2)
});

// withObject = { one: 1, two: 2 }
```

<a id="seq"></a>
#### seq(tasks: Array<Promise>): (input: any): Promise

Version of the compose function that is more natural to read. Each function consumes the return value of the previous function. It is the equivalent of compose with the arguments reversed.

```js
import seq from 'apr-seq'

const then = (v) => new Promise((resolve) => resolve(v))

const seq = seq([
  async (v) => await then(v + 1),
  async (v) => await then(v + 2),
  async (v) => await then(v + 3)
]);

const output = await seq(1); // 7
```

<a id="series"></a>
#### series(tasks: Array<Promise> | Object): Promise

Run the functions in the `tasks` in series, each one running once the previous function has completed.

```js
import series from 'apr-series'

const then = (v) => new Promise((resolve) => resolve(v))

const withArray = await series([
  async () => await then(1),
  async () => await then(2)
]);

// withArray = [1, 2]

const withObject = await series({
  one: async () => await then(1),
  two: async () => await then(2)
});

// withObject = { one: 1, two: 2 }
```

<a id="until"></a>
#### until(test: Promise, fn: Promise): Promise

Repeatedly call `fn` until `test` returns `true`.

```js
import until from 'apr-until'

const then = (v) => new Promise((resolve) => resolve(v))

const maxCalls = 10;
let calls = 0;


const output = await until(async () => {
  await then();
  return (calls += 1) >= maxCalls;
}, async () => (
  await then(calls)
);

// output = 10
```

<a id="waterfall"></a>
#### waterfall(tasks: Array<Promise> | Object): Promise

Runs the `tasks` array of functions in series, each passing their results to the next in the array. 

```js
import waterfall from 'apr-waterfall'

const then = (v) => new Promise((resolve) => resolve(v))

const output = await waterfall([
  async () => await then(1),
  async (v) => await then(v + 2),
  async (v) => await then(v + 3)
]);

// output = 6
```

<a id="whilst"></a>
#### whilst(test: Promise, fn: Promise): Promise

Repeatedly call `fn`, while `test` returns true.

```js
import until from 'apr-until'

const then = (v) => new Promise((resolve) => resolve(v))

const maxCalls = 10;
let calls = 0;

const output = await until(async () => {
  await then();
  return (calls += 1) < maxCalls;
}, async () => (
  await then(calls)
);

// output = 10
```

<a id="utils"></a>
### utils

<a id="apply"></a>
#### apply(fn: Function): Promise

Creates a continuation function with some arguments already applied.

```js
import parallel from 'apr-parallel'
import apply from 'apr-apply'

const then = (v) => new Promise((resolve) => resolve(v))

const output = await parallel([
  apply(then, 1)
  apply(then, 2)
  apply(then, 3)
]);

// output = [1, 2, 3]
```

<a id="asyncify"></a>
#### asyncify(fn: Function)

Take a sync function and make it async. This is useful for plugging sync functions into a [`waterfall`](#waterfall), [`series`](#series), or other async functions.

```js
import asyncify from 'apr-asyncify'
import waterfall from 'apr-waterfall'
import apply from 'apr-apply'

const readFile = thenify(require('fs').readFile);
const pkgPath = path.join(__dirname, './package.json');

const pkg = await waterfall([
  apply(readFile, pkgPath, 'utf8'),
  asyncify(JSON.parse)
]);
```

<a id="constant"></a>
#### constant(...args: any): Promise

Returns a promise that when called, then's with the values provided. Useful as the first function in a [`waterfall`](#waterfall).

```js
import asyncify from 'apr-asyncify'
import waterfall from 'apr-waterfall'
import constant from 'apr-constant'

const pkg = await waterfall([
  constant('{"name": "apr"}'),
  asyncify(JSON.parse)
]);
```

<a id="todo"></a>
### todo

 - [ ] finish [caolan/async feature parity](#async-parity)
 - [ ] come up with a solution for generating readme and website from source
 - [ ] flow annotations

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

<a id="credits"></a>
## credits

 - both the method signatures and descriptions are copied from [caolan/async](https://github.com/caolan/async/blob/master/LICENSE)

<a id="license"></a>
## license

MIT