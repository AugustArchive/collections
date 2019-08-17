# @augu/immutable 
[![npm version](https://badge.fury.io/js/%40augu%2Fimmutable.svg)](https://badge.fury.io/js/%40augu%2Fimmutable) [![Stars](https://img.shields.io/github/stars/auguwu/immutable)](https://github.com/auguwu/immutable)

> Immutable library made in TypeScript
>
> [Documentation](https://auguwu.github.io/immutable) **|** [NPM](https://npmjs.com/package/@augu/immutable) **|** [GitHub](https://github.com/auguwu/immutable)

## Documentation (replaced soon:tm:)
### Collection<T>
> Synthethic extenstion to the Map instance with various functions

```ts
// TypeScript
import { Collection } from '@augu/immutable';
const coll = new Collection<number>({ name: 'sluts' });

coll.get('Brenda'); // 'Brenda' is not in the collection
coll.set('Brenda', coll.size); // Collection [Map] { 'Brenda': 1 }
coll.filter(slut => slut === 1); // ['Brenda']
coll.set('Patty', coll.size); // Collection [Map] { 'Brenda': 1, 'Patty': 2 }
coll.partition((u) => u === 1); // [Collection [Map] { 'Brenda': 1' }, Collection [Map] { 'Patty': 2 } ]
coll.delete('Patty'); // true 
coll.delete('Brenda'); // true
```

```js
// JavaScript
const { Collection } = require('@augu/immutable');
const coll = new Collection({ name: 'sluts' });

coll.get('Brenda'); // 'Brenda' is not in the collection
coll.set('Brenda', coll.size); // Collection [Map] { 'Brenda': 1 }
coll.filter(slut => slut === 1); // ['Brenda']
coll.set('Patty', coll.size); // Collection [Map] { 'Brenda': 1, 'Patty': 2 }
coll.partition((u) => u === 1); // [Collection [Map] { 'Brenda': 1' }, Collection [Map] { 'Patty': 2 } ]
coll.delete('Patty'); // true 
coll.delete('Brenda'); // true
```

### List<T>
> Synthetic extension to the Set instance with various functions

```ts
// TypeScript
import { List } from '@augu/immutable';
const list = new List<string>({ name: 'sluts' });

list.add('Brenda'); // List [Set] { 'Brenda' }
list.add('Patty'); // List [Set] { 'Brenda', 'Patty' }
list.merge(list); // Merged
list.delete('Brenda'); // true
list.delete('Patty'); // true
```

```js
// JavaScript
const { List } = require('@augu/immutable');
const list = new List({ name: 'sluts' });

list.add('Brenda'); // List [Set] { 'Brenda' }
list.add('Patty'); // List [Set] { 'Brenda', 'Patty' }
list.merge(list); // Merged
list.delete('Brenda'); // true
list.delete('Patty'); // true
```

## LICENSE
> [immutable](https://github.com/auguwu/immutable) was made by auguwu and released under the MIT license

```
Copyright (c) 2019 August

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```