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
   * @param value The value to put
   */
  enqueue(value: T) {
    this.cache.push(value);
    return this;
  }

  /**
   * Runs all of the queue values that was put with `enqueue`
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
    return this.cache[this.cache.length - 1];
  }

  /**
   * Peek at an index of the cache
   * @param index The index to peek at
   * @returns A value if it didn't return null
   */
  peekAt(index: number): T | null {
    const item = this.cache[index];
    return (item === void 0 || item === null) ? null : item!;
  }

  /**
   * Returns the size of the cache
   */
  size() {
    return this.cache.length;
  }
}