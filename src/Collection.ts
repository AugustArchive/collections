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

/**
 * Represents a predicate function for any mutable methods
 */
type Predicate<ThisArg, Value, Index, Key, ReturnAs>
  = (this: ThisArg, value: Value, index: Index, key: Key) => ReturnAs;

/**
 * Represents a predicate function for [[Collection#reduce]]
 */
type ReducePredicate<ThisArg, Current, Acc, ReturnAs> = (this: ThisArg, acc: Acc, current: Current) => ReturnAs;

/**
 * Same as [[Predicate]] but with no this context binded.
 */
type UndetailedPredicate<Value, Index, Key, ReturnAs> = (value: Value, index: Index, key: Key) => ReturnAs;

/**
 * Same as [[Predicate]] but with no `key` argument
 */
type PredicateWithoutKey<ThisArg, Value, Index, ReturnAs> = (this: ThisArg, value: Value, index: Index) => ReturnAs;

/**
 * Same as [[Predicate]] but without `index` and `key` arguments
 */
type MinimalPredicate<ThisArg, Value, ReturnAs> = (this: ThisArg, value: Value) => ReturnAs;

/**
 * Same as [[Predicate]] but with no `index` argument
 */
type MinimalPredicateWithKey<Value, Index, ReturnAs> = (value: Value, index: Index) => ReturnAs;

/**
 * Same as [[Predicate]] but with no this context binded and without `index` or `key` arguments
 */
type UndetailedMinimalPredicate<Value, ReturnAs> = (value: Value) => ReturnAs;

/**
 * Represents a class to hold key-value pairs using [[Collection]]. This is a extension
 * of [Map] to add Array-like functions and a update builder.
 *
 * @template K The key structure for this [[Collection]]
 * @template V The value structure for this [[Collection]]
 */
export class Collection<K, V = unknown> extends Map<K, V> {
  protected _sweepInterval?: NodeJS.Timer;
  public ['constructor']: typeof Collection;

  /** Returns if this [[`Collection`]] is empty or not */
  get empty() {
    return this.size === 0;
  }

  /**
   * Use a predicate function to filter out values and return a new Array of the values
   * that resolved true in the predicate function. Use Collection#filterKeys to filter
   * out any keys if needed.
   *
   * @param predicate The predicate function to filter out
   * @param thisArg An additional `this` context if needed
   * @returns A new Array of the values that returned `true` in the predicate function
   */
  filter<ThisArg = Collection<K, V>>(predicate: Predicate<ThisArg, V, number, K, boolean>, thisArg?: ThisArg) {
    let func: UndetailedPredicate<V, number, K, boolean>;

    if (thisArg !== undefined)
      func = predicate.bind(thisArg);
    else
      func = predicate.bind(<any> this);

    const results: V[] = [];
    let i = -1;

    for (const [key, value] of this.entries()) {
      if (func(value, i++, key)) results.push(value);
    }

    return results;
  }

  /**
   * Use a predicate function to filter out keys and return a new Array of the keys
   * that resolved true in the predicate function. Use Collection#filter to filter out
   * any values from this [[`Collection`]].
   *
   * @param predicate The predicate function to filter out
   * @param thisArg An additional `this` context if needed
   * @returns A new Array of the values that returned `true` in the predicate function
   */
  filterKeys<ThisArg = Collection<K, V>>(predicate: Predicate<ThisArg, V, number, K, boolean>, thisArg?: ThisArg) {
    let func: UndetailedPredicate<V, number, K, boolean>;

    if (thisArg !== undefined)
      func = predicate.bind(thisArg);
    else
      func = predicate.bind(<any> this);

    const results: K[] = [];
    let i = -1;

    for (const [key, value] of this.entries()) {
      if (func(value, i++, key)) results.push(key);
    }

    return results;
  }

  /**
   * Use a predicate function to map anything into a new array
   * @param predicate The predicate function to map out and return a new array
   * @param thisArg An additional `this` context if needed
   * @returns A new Array of the values from that function
   */
  map<S, ThisArg = Collection<K, V>>(
    predicate: Predicate<ThisArg, V, number, K, S>,
    thisArg?: ThisArg
  ) {
    let func: UndetailedPredicate<V, number, K, S>;

    if (thisArg !== undefined)
      func = predicate.bind(thisArg);
    else
      func = predicate.bind(<any> this);

    const results: S[] = [];
    let i = -1;

    for (const [key, value] of this.entries()) {
      results.push(func(value, ++i, key));
    }

    return results;
  }

  /**
   * Returns a random value from the collection
   * @returns A random value or `null` if the collection is empty
   */
  random() {
    if (this.empty) return null;
    const iterable = Array.from(this.values());

    return iterable[Math.floor(Math.random() * iterable.length)];
  }

  /**
   * Reduce the collection and return a new initial value
   * @param predicate The predicate function
   * @param initialValue The initial value
   */
  reduce<S>(
    predicate: ReducePredicate<Collection<K, V>, V, S, S>,
    initialValue?: S
  ) {
    const iterable = this.values();
    let value!: V;
    let res: S = initialValue === undefined ? iterable.next().value : initialValue;

    const func = predicate.bind(this);
    while ((value = iterable.next().value) !== undefined) res = func(res, value);

    return res;
  }

  /**
   * Returns the first element in the collection
   */
  first(): V | undefined;

  /**
   * Returns an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  first(amount: number): V[];

  /**
   * Returns the first element in the collection or an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  first(amount?: number): V | V[] | undefined {
    if (typeof amount === 'undefined') {
      const iterable = this.values();
      return iterable.next().value;
    }

    if (amount < 0) return this.last(amount! * -1);
    amount = Math.min(amount, this.size);

    const iterable = this.values();
    return Array.from({ length: amount }, (): V => iterable.next().value);
  }

  /**
   * Returns the last element in the collection
   */
  last(): V | undefined;

  /**
   * Returns an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  last(amount: number): V[];

  /**
   * Returns the last element in the collection or an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  last(amount?: number): V | V[] | undefined {
    const iter = [...this.values()];
    if (typeof amount === 'undefined') return iter[iter.length - 1];
    if (amount < 0) return this.first(amount! * -1);
    if (!amount) return [];

    return iter.slice(-amount);
  }

  /**
   * Returns the last element in the collection
   */
  lastKey(): K | undefined;

  /**
   * Returns an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  lastKey(amount: number): K[];

  /**
   * Returns the last element in the collection or an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  lastKey(amount?: number): K | K[] | undefined {
    const iter = [...this.keys()];
    if (typeof amount === 'undefined') return iter[iter.length - 1];
    if (amount < 0) return this.firstKey(amount! * -1);
    if (!amount) return [];

    return iter.slice(-amount);
  }

  /**
   * Returns the first key in the collection
   */
  firstKey(): K | undefined;

  /**
   * Returns an Array of the keys from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  firstKey(amount: number): K[];

  /**
   * Returns the first key in the collection or an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  firstKey(amount?: number): K | K[] | undefined  {
    if (typeof amount === 'undefined') {
      return (this.keys()).next().value;
    }

    if (amount < 0) return this.lastKey(amount! * -1);
    amount = Math.min(amount, this.size);

    const iterable = this.keys();
    return Array.from({ length: amount }, (): K => iterable.next().value);
  }

  /**
   * Returns all of the values as an Array
   */
  toArray() {
    return [...this.values()];
  }

  /**
   * Returns all of the keys as an Array
   */
  toKeyArray() {
    return [...this.keys()];
  }

  /**
   * Gets the first item in the collection and removes it (if provided)
   * @param remove If we should remove it or not
   */
  shift(remove: boolean = false) {
    const item = this.first();
    const key = this.firstKey();
    if (item === undefined || key === undefined) return null;

    if (remove) this.delete(key);
    return item;
  }

  /**
   * Gets the last item in the collection and removes it(if provided)
   * @param remove If we should remove it or not
   */
  unshift(remove: boolean = false) {
    const item = this.last();
    const key = this.lastKey();

    if (item === undefined || key === undefined) return null;

    if (remove) this.delete(key);
    return item;
  }

  /**
   * Find a value in the collection from it's predicate function
   * @param predicate The predicate function
   * @param thisArg An additional `this` context if needed
   * @returns The value found or `null` if not found
   */
  find<ThisArg = Collection<K, V>>(
    predicate: MinimalPredicate<ThisArg, V, boolean>,
    thisArg?: ThisArg
  ) {
    let func: UndetailedMinimalPredicate<V, boolean>;

    if (thisArg !== undefined)
      func = predicate.bind(thisArg);
    else
      func = predicate.bind(<any> this);

    let result: V | null = null;
    for (const value of this.values()) {
      if (func(value)) {
        result = value;
        break;
      }
    }

    return result;
  }

  /**
   * Finds a key in the collection from it's predicate function
   * @param predicate The predicate function
   * @param thisArg An additional `this` context if needed
   * @returns The key found or `null` if not found
   */
  findKey<ThisArg = Collection<K, V>>(
    predicate: MinimalPredicate<ThisArg, V, boolean>,
    thisArg?: ThisArg
  ) {
    let func: UndetailedMinimalPredicate<V, boolean>;

    if (thisArg !== undefined)
      func = predicate.bind(thisArg);
    else
      func = predicate.bind(<any> this);

    let result: K | null = null;
    for (const [key, value] of this.entries()) {
      if (func(value)) {
        result = key;
        break;
      }
    }

    return result;
  }

  /**
   * Computes a value if it's absent in this Collection
   * @param key The key to find
   * @param insert Item to add when it doesn't exist
   */
  emplace(key: K, insert: V | (() => V)) {
    if (!this.has(key)) {
      const item = typeof insert === 'function' ? (insert as any)() : insert;
      this.set(key, item);
      return item as unknown as V;
    } else {
      return this.get(key)!;
    }
  }

  /**
   * Similar to [Array.sort], which basically sorts the values of this Collection
   * to return a value
   *
   * @param compareFn The compare function
   * @returns The value
   */
  sort(compareFn: (a: V, b: V) => number) {
    const values = this.toArray();
    values.sort(compareFn);

    return values;
  }

  /**
   * Similar to [Array.sort], which basically sorts the values of this Collection
   * to return a value
   *
   * @param compareFn The compare function
   * @returns The value
   */
  sortKeys(compareFn: (a: K, b: K) => number) {
    const keys = this.toKeyArray();
    keys.sort(compareFn);

    return keys;
  }

  /**
   * Similar to [Array.some], this function tests whether atleast 1 item
   * in the predicate function passes the test in the values cache.
   *
   * @param func The function to use to filter out
   * @returns A boolean value if 1 item of the cache is truthy
   */
  some(func: (item: V) => boolean) {
    const values = this.toArray();

    for (let i = 0; i < values.length; i++) {
      if (func.call(this, values[i])) return true;
    }

    return false;
  }

  /**
   * Similar to [Array.some], this functions tests whether atleast 1 key
   * in the predicate function passes the test in the key cache.
   *
   * @param func The function to use to filter out
   * @returns A boolean value if 1 item of the cache is truthy
   */
  someKeys(func: (item: K) => boolean) {
    const keys = this.toKeyArray();

    for (let i = 0; i < keys.length; i++) {
      if (func.call(this, keys[i])) return true;
    }

    return false;
  }

  /**
   * Deletes any entries that satisfy the predicate function.
   * @param predicate The predicate function
   * @param thisArg A custom `this` context provided value for [[predicate]].
   * @returns The size from the previous size and the current size.
   */
  sweep<ThisArg = Collection<K, V>>(
    predicate: Predicate<ThisArg, V, number, K, boolean>,
    thisArg?: ThisArg
  ) {
    const func = thisArg !== undefined ? predicate.bind(thisArg) : predicate;
    const prevSize = this.size;

    let idx = -1;
    for (const [key, value] of this) {
      if (func.call(thisArg !== undefined ? thisArg : this as any, value, ++idx, key)) {
        this.delete(key);
      }
    }

    return prevSize - this.size;
  }

  /**
   * Clears every element in this [[Collection]].
   */
  clear() {
    if (this._sweepInterval !== undefined)
      clearInterval(this._sweepInterval);

    super.clear();
  }
}
