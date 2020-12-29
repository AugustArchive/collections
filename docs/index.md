# @augu/collections · [![npm version](https://badge.fury.io/js/%40augu%2Fcollections.svg)](https://badge.fury.io/js/%40augu%2Fcollections) [![Stars](https://img.shields.io/github/stars/auguwu/collections)](https://github.com/auguwu/collections) [![Workflow Status](https://github.com/auguwu/collections/workflows/ESLint/badge.svg)](https://github.com/auguwu/collections/tree/master/.github/workflows) [![Build Status](https://travis-ci.org/auguwu/collections.svg?branch=master)](https://travis-ci.org/auguwu/collections) [![Build Size](https://img.shields.io/bundlephobia/min/@augu/collections?style=flat-square)](https://github.com/auguwu/collections)

> :pencil: **Collections library made in TypeScript**

## 0.x builds
If you would like to use the 0.x builds or view it's source code, it'll be available under the [0.x](https://github.com/auguwu/collections/tree/0.x) branch and you can do so with `npm i @augu/immutable`.

### Changes from 0.x -> 1.x
- `Pair` and `TimedQueue` are remvoed
- All deprecated methods are removed
- Name is changed from `@augu/immutable` to `@augu/collections`
- Added `Collection.update` to update values if they exist

## Usage
```js
// CommonJS
const collections = require('@augu/collections');

// ES6+
import collections from '@augu/collections';

// Collection: Key-value pair that is an extension of [Map]
const coll = new collections.Collection(); // Create a empty one
const coll = new collections.Collection({ // Create one with key-value pairs
  key: 'value',
  [Symbol('key')]: 'value'
}); 

coll.get('key'); // the value if added or undefined
coll.set('key', 'value'); // the value if the key isn't added
coll.update({ // Returns the new value updated
  set: {
    'key': 'value' // dot notation is supported for nested objects
  }
});

coll.filter(value => value === 'value'); // Returns a Array of values if the predicate is true
coll.map(v => v); // Returns a Array of values that are mapped by it's predicate function
coll.reduce((curr, acc) => curr + acc, 0); // Implementation of Array.reduce
coll.sort((a, b) => a - b); // Implementation of Array.sort

// Queue: Queue-based system with a timer extension to do time-based queues
const queue = new collections.Queue(); // Create a empty Queue
const queue = new collections.Queue(['a', 'b', 'c']); // Create one with values being added

queue.get(0); // Get a item from it's index
queue.add('c'); // Add a item to the queue
queue.delete(2); // Delete a item from it's index
queue.filter(c => c === 'a'); // Filter out the queue from a predicate function
queue.map(u => u); // Map out anything from a predicate function
```

## License
**@augu/collections** is released under [MIT](https://github.com/auguwu/collections/blob/master/LICENSE). :)
