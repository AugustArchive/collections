import { ImmutabilityError } from './util/errors';
import { deprecate } from './util/deprecated';
import removeArray from './util/removeArray';
import Collection from './Collection';

/**
 * Queue-based collection to fetch, requeue, and do other stuff!
 */
export default class Queue<T = any> {
  /** Checks if this Queue is mutable (values can be added) or not */
  public mutable: boolean;

  /** Array of the cache to use */
  private cache: T[];

  /**
   * Constructs a new instance of the `Queue` class
   * @param cache Optional value to set your own cache to the queue
   */
  constructor(cache: T[] = []) {
    this.mutable = true;
    this.cache = cache;
  }

  /**
   * Checks if the queue is empty
   */
  get empty() {
    return this.cache.length === 0;
  }

  /**
   * Enqueue a new value to the cache, run `tick` to process it!
   * 
   * This method is deprecated, use `Queue#add`
   * 
   * @param value The value to put
   */
  enqueue(value: T) {
    deprecate('enqueue', 'add');
    this.cache.push(value);
    return this;
  }

  /**
   * Adds a item to the cache
   * @param value The value to add
   */
  add(value: T) {
    if (!this.mutable) throw new ImmutabilityError('queue', 'add');
    this.cache.push(value);
    return this;
  }

  /**
   * Runs all of the queue values that was put with `add`.
   * 
   * This removes the cache while a for loop doesn't
   * 
   * @param func The function when a new queue item has ticked
   */
  tick(func: (item: T) => void) {
    for (const item of this.cache) func(item);
    this.cache.length = 0;
  }

  /**
   * Peek at the last value of the queue
   */
  peek() {
    if (!this.cache.length) throw new Error('There are no items in the queue');

    deprecate('peek', 'last');
    return this.cache[this.cache.length - 1];
  }

  /**
   * Peek at an index of the cache
   * @param index The index to peek at
   * @returns A value if it didn't return null
   */
  peekAt(index: number): T | null {
    deprecate('peekAt', 'get');
    if (!this.cache.length) throw new Error('There are no items in the queue');

    const item = this.cache[index];
    return (item === void 0 || item === null) ? null : item!;
  }

  /**
   * Returns the last value of the cache
   */
  last() {
    return this.cache[this.cache.length - 1];
  }

  /**
   * Returns the value or `null` if not found
   * @param index The index to peek at
   * @returns A value if it didn't return null
   */
  get(index: number): T | null {
    if (!this.cache.length) throw new Error('There are no items in the queue');

    const item = this.cache[index];
    return (item === void 0 || item === null) ? null : item!;
  }

  /**
   * Removes the item from the queue
   * 
   * @warning Use `Queue#tick` to remove all items!
   * @param item The item to remove
   */
  remove(item: T | number) {
    if (!this.mutable) throw new ImmutabilityError('queue', 'remove');
    removeArray(this.cache, item);

    return this;
  }

  /**
   * Checks if the key is included in the cache
   * @param key The key to find
   */
  includes(key: T) {
    return this.cache.includes(key);
  }

  /**
   * Returns the size of the cache
   */
  size() {
    return this.cache.length;
  }

  /**
   * Returns the cache as an Array
   */
  toArray() {
    return this.cache;
  }

  /**
   * Returns the cache as an Collection
   */
  toCollection() {
    return Collection.from(this.cache);
  }

  /** Make this class immutable */
  freeze() {
    this.mutable = false;
    Object.freeze(this);
    Object.freeze(this.constructor);
  }

  /** Make this class mutable and returns a new Queue instance that is mutable */
  unfreeze() {
    const queue = new (this.constructor as typeof Queue)<T>();
    for (const item of this) queue.add(item);

    return queue;
  }

  /**
   * Returns the first item in the cache and removes it from the cache
   */
  shift() {
    return this.cache.shift();
  }

  /**
   * Returns the last item in the cache and removes it from the cache
   */
  unshift() {
    return this.cache.pop();
  }

  /**
   * Override function to return this as a String
   */
  toString() {
    const getKindOf = (element: unknown) => {
      if (element === undefined) return 'undefined';
      if (element === null) return 'null';
      if (!['object', 'function'].includes(typeof element)) return (typeof element);
      if (Array.isArray(element)) return 'array';
      if (typeof element === 'function') {
        const func = element.toString();

        if (func.startsWith('function')) return 'function';
        if (func.startsWith('class')) return func.slice(5, func.indexOf('{')).trim();
      }
      
      return 'object';
    };

    const all: string[] = [];
    this.cache.map(getKindOf).filter((item) => {
      if (!all.includes(item)) all.push(item);
    });

    return `Queue<${all.join(' | ')}>`;
  }

  [Symbol.iterator]() {
    let index = -1;
    const items = this.toArray();
  
    return {
      next: () => ({
        value: items[++index],
        done: index === items.length
      })
    };
  }
}

// Add it to the prototype
Queue.prototype[Symbol.iterator] = function iterator(this: Queue<any>) {
  let index = -1;
  const items = this.toArray();

  return {
    next: () => ({
      value: items[++index],
      done: index === items.length
    })
  };
};