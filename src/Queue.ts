import { deprecated } from './util/deprecated';
import Collection from './Collection';

/**
 * Queue-based collection to fetch, requeue, and do other stuff!
 */
export default class Queue<T = any> {
  /** Array of the cache to use */
  private cache: T[];

  /**
   * Constructs a new instance of the `Queue` class
   * @param cache Optional value to set your own cache to the queue
   */
  constructor(cache: T[] = []) {
    this.cache = cache;
  }

  /**
   * Enqueue a new value to the cache, run `tick` to process it!
   * 
   * This method is deprecated, use `Queue#add`
   * 
   * @param value The value to put
   */
  @deprecated('add')
  enqueue(value: T) {
    this.cache.push(value);
    return this;
  }

  /**
   * Adds a item to the cache
   * @param value The value to add
   */
  add(value: T) {
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
  @deprecated('last')
  peek() {
    return this.cache[this.cache.length - 1];
  }

  /**
   * Peek at an index of the cache
   * @param index The index to peek at
   * @returns A value if it didn't return null
   */
  @deprecated('get')
  peekAt(index: number): T | null {
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
    if (typeof item === 'number') {
      const value = this.cache[(item as number)];
      if (!value || value === null) throw new Error(`Item at index ${item} is not in the cache.`);

      for (let i = 0; i < this.size(); i++) {
        if (i === item) this.cache.splice(i, 1);
      }

      return this;
    } else {
      for (let i = 0; i < this.size(); i++) {
        if (this.cache[i] === item) this.cache.splice(i, 1);
      }

      return this;
    }
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
    Object.freeze(this);
    Object.freeze(this.constructor);

    return this;
  }

  /**
   * Override function to return this as a String
   */
  toString() {
    const getKindOf = (element: T) => {
      if (element === undefined) return 'undefined';
      if (element === null) return 'null';
      if (!['object', 'function'].includes(typeof element)) return (typeof element);
      if (element instanceof Array) return 'array';
      
      return {}.toString.call(element).slice(8, -2).toLowerCase();
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
Queue.prototype[Symbol.iterator] = function iterator() {
  let index = -1;
  const items = this.toArray();

  return {
    next: () => ({
      value: items[++index],
      done: index === items.length
    })
  };
};