# @augu/immutable 
[![npm version](https://badge.fury.io/js/%40augu%2Fimmutable.svg)](https://badge.fury.io/js/%40augu%2Fimmutable) [![Stars](https://img.shields.io/github/stars/auguwu/immutable)](https://github.com/auguwu/immutable)

> Immutable library made in TypeScript
>
> [Documentation](https://docs.augu.dev/immutable) **|** [NPM](https://npmjs.com/package/@augu/immutable) **|** [GitHub](https://github.com/auguwu/immutable)

## Examples
### Collection
```ts
import { Collection } from '@augu/immutable';

const collection = new Collection<string>();
collection.add('a'); //> Collection [Map] { 0 => 'a' }
collection.map(s => s); //> ['a']
collection.delete('a'); //> true
```

### Pair
```ts
import { Pair } from '@augu/immutable';

const pair = new Pair('a', 'b'); //> Pair<string, string>
pair.getRight(); //> 'a'
pair.getLeft(); //> 'b'
```

### Queue
```ts
import { Queue } from '@augu/immutable';

const queue = new Queue(['a', 'b', 'c']); //> Queue<string>
queue.peekAt(0); //> 'a'
queue.peek(); //> 'c'
queue.enqueue('d'); //> Queue<string>
queue.tick(console.log); //> Logs 'a', 'b', 'c', 'd'
```

## Maintainers
<table>
  <tbody>
    <tr>
      <td align='center' valign='middle'>
        <a href='https://github.com/auguwu' target='_blank'>
          <img src='https://avatars0.githubusercontent.com/u/27751995' alt='August' width='225' height='auto' />
          <br />
          <p>August</p>
        </a>
      </td>
    </tr>
  </tbody>
</table>

## LICENSE
**@augu/immutable** is released under the **MIT** License. Read [here](/LICENSE) for more information.