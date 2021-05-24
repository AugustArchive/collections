/**
 * Copyright (c) Noelware
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as utils from './utils';

/**
 * Represents a [[Queue]] class, which handles queue-based systems in a simple class.
 * @template T The structure of this [[Queue]] instance
 */
export class Queue<T = unknown> {
  public ['constructor']: typeof Queue;
  private items: T[];

  /**
   * Inserts a new element at the start of the callstack
   * @notice This is for backwards compatibility for Queue.add from 0.x
   * @param item The item to push
   * @returns The size of this [[Queue]]
   */
  public addFirst!: (item: T) => number;

  /**
   * Pushes a new item at the end of the callstack
   * @notice This is for backwards compatibility for Queue.add from 0.x
   * @param item The item to push
   * @returns The size of this [[Queue]]
   */
  public add!: (item: T) => number;

  /**
   * Represents a [[Queue]] class, which handles queue-based systems in a simple class.
   * @param items The items to inject when creating a new instance
   */
  constructor(items?: T[]) {
    this.items = items ?? [];

    const compat = [
      'add',
      'addFirst'
    ] as const;

    for (let i = 0; i < compat.length; i++) {
      let func;
      switch (compat[i]) {
        case 'addFirst':
          func = this.unshift.bind(this);
          break;

        case 'add':
          func = this.push.bind(this);
          break;

        default:
          func = undefined;
          break;
      }

      if (func !== undefined) {
        this[compat[i] as string] = (...args: any[]) => {
          utils.deprecate(compat[i]);
          return func(...args);
        };
      }
    }
  }

  /** Returns if this [[`Queue`]] is empty or not */
  get empty() {
    return this.items.length === 0;
  }

  /**
   * Pushes a new item at the end of the callstack
   * @param item The item to push
   * @returns The size of this [[Queue]]
   */
  push(item: T) {
    this.items.push(item);
    return this.items.length;
  }

  /**
   * Inserts a new element at the start of the callstack
   * @param item The item to push
   * @returns The size of this [[Queue]]
   */
  unshift(item: T) {
    this.items.unshift(item);
    return this.items.length;
  }

  /**
   * Returns the first item in the cache and removes it from the cache
   */
  shift() {
    return this.items.shift();
  }

  /**
   * Returns the last item in the cache and removes it from the cache
   */
  pop() {
    return this.items.pop();
  }

  /**
   * Finds an item in the cache or returns `undefined` if not found
   * @param predicate The predicate function
   */
  find(predicate: (item: T) => boolean) {
    return this.items.find(predicate);
  }

  /**
   * Returns the the queued items as an Array
   */
  toArray() {
    return this.items;
  }

  /**
   * Returns the last value of the cache
   */
  last() {
    return this.items[this.items.length - 1];
  }

  /**
   * Returns the value or `null` if not found
   * @param index The index to peek at
   * @returns A value if it didn't return null
   */
  get(index: number): T | null {
    if (!this.items.length) return null;

    const item = this.items[index];
    return (item === void 0 || item === null) ? null : item!;
  }

  /**
   * Removes the item from the queue
   *
   * @warning Use `Queue#tick` to remove all items!
   * @param item The item to remove
   */
  remove(item: T | number) {
    const r = utils.removeArray(this.items, item);
    this.items = r;

    return this;
  }

  /**
   * Checks if the key is included in the cache
   * @param key The key to find
   */
  includes(key: T) {
    return this.items.includes(key);
  }

  /**
   * Returns the size of this [[Queue]]
   */
  size() {
    return this.items.length;
  }

  /**
   * Clones a new [[Queue]] instance with the items available
   */
  clone() {
    return new this.constructor(this.items);
  }

  /**
   * Perform a specific action from it's [[predicate]] function
   * @param predicate The predicate function
   * @param thisArg A custom `this` context for the predicate
   */
  forEach<ThisArg = Queue<T>>(predicate: (this: ThisArg, value: T, index: number) => void, thisArg?: ThisArg) {
    // @ts-ignore overloads can go suck my ass
    predicate = predicate.bind(thisArg !== undefined ? thisArg : this);

    for (let i = 0; i < this.items.length; i++)
      // @ts-ignore go suck it
      predicate(this.items[i], i);
  }

  [Symbol.iterator]() {
    let index = -1;
    const items = this.toArray();

    return {
      next: () => ({
        value: items[++index],
        done: index >= items.length
      })
    };
  }
}
