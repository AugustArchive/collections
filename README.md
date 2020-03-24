# @augu/immutable 
[![npm version](https://badge.fury.io/js/%40augu%2Fimmutable.svg)](https://badge.fury.io/js/%40augu%2Fimmutable) [![Stars](https://img.shields.io/github/stars/auguwu/immutable)](https://github.com/auguwu/immutable)

> Immutable library made in TypeScript
>
> [Documentation](https://auguwu.github.io/immutable) **|** [NPM](https://npmjs.com/package/@augu/immutable) **|** [GitHub](https://github.com/auguwu/immutable)

## Examples
```ts
import { Collection } from '@augu/immutable';

const collection = new Collection<string>();
collection.add('a'); //> Collection [Map] { 0 => 'a' }
collection.map(s => s); //> ['a']
collection.delete('a'); //> true
```

## LICENSE
**@augu/immutable** is released under the **MIT** License. Read [here](/LICENSE) for more information.