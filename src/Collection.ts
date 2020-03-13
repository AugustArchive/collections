import isObject, { NormalObject } from './util/isObject'; // eslint-disable-line no-unused-vars

/**
 * The `Collection` immutable object
 */
export default class Collection<T = any> extends Map<string | number | BigInt, T> {
  /**
   * Creates a new instance of the `Collection` immutable class
   * @param from Any values to add
   */
  constructor(from?: T[] | NormalObject<T>) {
    super();

    if (from) {
      if (Array.isArray(from)) {
        for (let i = 0; i < from.length; i++) this.set(i, from[i]);
      }
      else if (isObject(from)) {
        for (const [prop, value] of Object.entries(from)) this.set(prop, value);
      }
      else {
        throw new TypeError(`"from" expects to be an Object or Array, received ${typeof from}`);
      }
    }
  }

  /** Checker if the collection is empty */
  get empty() {
    return this.size === 0;
  }

  /**
   * Adds a value to the collection without using a key
   * @param val The value to add to the collection
   */
  add(val: T) {
    this.set(this.size, val);
  }

  /**
   * Use a predicate function to filter out anything and return a new Array
   * @param predicate The predicate function to filter out
   * @returns A new Array of the values that returned `true` in the predicate function
   */
  filter(predicate: (item: T) => boolean) {
    const result: T[] = [];
    for (const value of this.values()) {
      if (predicate(value)) result.push(value);
    }

    return result;
  }

  /**
   * Use a predicate function to map anything into a new array
   * @param predicate The predicate function to map out and return a new array
   * @returns A new Array of the values from that function
   */
  map<S>(predicate: (item: T) => S) {
    const result: S[] = [];
    for (const value of this.values()) result.push(predicate(value));

    return result;
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
   * Merges this collection into a new one
   * @param collection The collection to merge
   */
  merge(collection: Collection<T>) {
    const newColl = new Collection<T>();
    for (const [key, value] of collection) newColl.set(key, value);

    return newColl;
  }

  /**
   * Paritition the collection and return an Array of 2 collections that returned `true` or `false`
   * @param predicate The predicate function
   * @returns An array with 2 collections that represent a `true (first one)` and `false (second one)`
   */
  partition(predicate: (item: T) => boolean): [Collection<T>, Collection<T>] {
    const [item1, item2]: [Collection<T>, Collection<T>] = [new Collection(), new Collection()];
    for (const [key, value] of this) {
      const result = predicate(value);
      if (result) item1.set(key, value);
      else item2.set(key, value);
    }

    return [item1, item2];
  }

  /**
   * Reduce the collection and return a new initial value
   * @param predicate The predicate function
   * @param initialValue The initial value
   */
  reduce<S>(predicate: (a: S, b: T) => S, initialValue?: S) {
    const iterable = this.values();
    let value!: T;
    let res: S = initialValue === undefined ? iterable.next().value : initialValue;
    while ((value = iterable.next().value) !== undefined) res = predicate(res, value);

    return res;
  }

  /**
   * Returns the first element in the collection
   */
  first(): T | undefined;

  /**
   * Returns an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  first(amount: number): T[];

  /**
   * Returns the first element in the collection or an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  first(amount?: number): T | T[] | undefined {
    if (typeof amount === 'undefined') {
      const iterable = this.values();
      return iterable.next().value;
    }

    if (amount < 0) return this.last(amount! * -1);
    amount = Math.min(amount, this.size);
    
    const iterable = this.values();
    return Array.from({ length: amount }, (): T => iterable.next().value);
  }

  /**
   * Returns the last element in the collection
   */
  last(): T | undefined;

  /**
   * Returns an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  last(amount: number): T[];

  /**
   * Returns the last element in the collection or an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  last(amount?: number): T | T[] | undefined {
    const iter = [...this.values()];
    if (typeof amount === 'undefined') return iter[iter.length - 1];
    if (amount < 0) return this.first(amount! * -1);
    if (!amount) return [];

    return iter.slice(-amount);
  }

  /**
   * Find a value in the collection from it's predicate function
   * @param predicate The predicate function
   * @returns The value found or `null` if not found
   */
  find(predicate: (item: T) => boolean) {
    let result: T | null = null;
    for (const value of this.values()) {
      if (predicate(value)) result = value;
    }

    return result;
  }
  

  /**
   * Build a new Collection with(out) initial values
   * @param values The values to add
   */
  static from<V>(values: V[] | NormalObject<V>) {
    const collection = new Collection<V>();
    if (Array.isArray(values)) {
      for (let i = 0; i < values.length; i++) collection.set(i, values[i]);
    }
    else if (isObject(values)) {
      for (const [key, value] of Object.entries(values)) collection.set(key, value);
    }
    else {
      throw new TypeError(`Collection#from requires the values to be an Object or Array, received ${typeof values}`);
    }

    return collection;
  }

  /**
   * Override function to return this as a String
   */
  toString() {
    // TODO: Find a better solution for this
    //? since this uses the first element to find the state.
    //? and it can get inconsise when there is more then 1 element
    
    const getKindOf = () => {
      const element = this.first();
      if (element === undefined) return 'undefined';
      if (element === null) return 'null';
      if (!['object', 'function'].includes(typeof element)) return (typeof element);
      if (element instanceof Array) return 'array';
    
      if (typeof element === 'function') {
        if (element.toString().includes('class')) {
          const name = element.toString();
          return `class:${name.slice(6, name.length - 3)}`;
        }
    
        if (element.toString().includes('function')) {
          const name = element.toString();
          const par = name.indexOf('(');
          return `function:${name.slice(9, par)}`;
        }
      }
    
      return {}.toString.call(element).slice(8, -2).toLowerCase();
    };

    const kind = getKindOf();
    return `Collection<${kind}>`;
  }

  get [Symbol.toStringTag]() {
    return this.toString();
  }
}