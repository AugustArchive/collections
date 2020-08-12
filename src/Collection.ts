import { ImmutabilityError, MergeConflictError } from './util/errors';
import isObject, { NormalObject } from './util/isObject';
import getKindOf from './util/getKindOf';

/**
 * The `Collection` immutable object
 */
export default class Collection<T = any> extends Map<string | number | bigint, T> {
  /** Checks if this Collection is mutable (values can be added) or not */
  public mutable: boolean;

  /**
   * Creates a new instance of the `Collection` immutable class
   * @param from Any values to add
   */
  constructor(from?: T[] | NormalObject<T>) {
    super();

    this.mutable = true;

    if (from) {
      if (Array.isArray(from)) {
        for (let i = 0; i < from.length; i++) this.set(i, from[i]);
      } else if (isObject(from)) {
        for (const [prop, value] of Object.entries(from)) this.set(prop, value);
      } else {
        throw new TypeError(`"from" expects to be an Object or Array, received ${typeof from}`);
      }
    }
  }

  /** Getter if the collection is empty */
  get empty() {
    return this.size === 0;
  }

  /**
   * Adds a value to the collection without using a key
   * @param val The value to add to the collection
   */
  add(val: T) {
    if (!this.mutable) throw new ImmutabilityError('collection', 'add');
    this.set(this.size, val);
  }

  /**
   * Use a predicate function to filter out anything and return a new Array
   * @param predicate The predicate function to filter out
   * @returns A new Array of the values that returned `true` in the predicate function
   */
  filter(predicate: (this: Collection<T>, item: T) => boolean) {
    const result: T[] = [];
    for (const value of this.values()) {
      const func = predicate.bind(this);
      if (func(value)) result.push(value);
    }

    return result;
  }

  /**
   * Use a predicate function to map anything into a new array
   * @param predicate The predicate function to map out and return a new array
   * @returns A new Array of the values from that function
   */
  map<S>(predicate: (this: Collection<T>, item: T) => S) {
    const result: S[] = [];
    const func = predicate.bind(this);

    for (const value of this.values()) result.push(func(value));

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
   * Merges all collections provided and this one to a new collection
   * @param collections Any collections to merge into this one
   */
  merge(...collections: Collection<any>[]) {
    if (collections.some(x => !x.mutable)) {
      const immutable = collections.filter(x => !x.mutable);
      throw new MergeConflictError(immutable.length);
    }

    const newColl = new Collection<T>();
    for (const [key, value] of this) newColl.set(key, value);

    for (const coll of collections) {
      for (const [key, val] of coll) newColl.set(key, val);
    }

    return newColl;
  }

  /**
   * Paritition the collection and return an Array of 2 collections that returned `true` or `false`
   * @param predicate The predicate function
   * @returns An array with 2 collections that represent a `true (first one)` and `false (second one)`
   */
  partition(predicate: (this: Collection<T>, item: T) => boolean): [Collection<T>, Collection<T>] {
    const [item1, item2]: [Collection<T>, Collection<T>] = [new Collection(), new Collection()];
    for (const [key, value] of this) {
      const func = predicate.bind(this);
      const result = func(value);

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
  reduce<S>(predicate: (this: Collection<T>, a: S, b: T) => S, initialValue?: S) {
    const iterable = this.values();
    let value!: T;
    let res: S = initialValue === undefined ? iterable.next().value : initialValue;

    const func = predicate.bind(this);
    while ((value = iterable.next().value) !== undefined) res = func(res, value);

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
  find(predicate: (this: Collection<T>, item: T) => boolean) {
    let result: T | null = null;
    for (const value of this.values()) {
      const find = predicate.bind(this);
      if (find(value)) result = value;
    }

    return result;
  }

  /**
   * Returns the last element in the collection
   */
  lastKey(): (string | number | bigint) | undefined;

  /**
   * Returns an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  lastKey(amount: number): (string | number | bigint)[];

  /**
   * Returns the last element in the collection or an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  lastKey(amount?: number): (string | number | bigint) | (string | number | bigint)[] | undefined {
    const iter = [...this.keys()];
    if (typeof amount === 'undefined') return iter[iter.length - 1];
    if (amount < 0) return this.firstKey(amount! * -1);
    if (!amount) return [];

    return iter.slice(-amount);
  }

  /**
   * Returns the first key in the collection
   */
  firstKey(): (string | number | bigint) | undefined;

  /**
   * Returns an Array of the keys from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  firstKey(amount: number): (string | number | bigint)[];

  /**
   * Returns the first key in the collection or an Array of the values from the correspondant `amount`
   * @param amount The amount to fetch from
   */
  firstKey(amount?: number): (string | number | bigint) | (string | number | bigint)[] | undefined  {
    if (typeof amount === 'undefined') {
      return (this.keys()).next().value;
    }

    if (amount < 0) return this.lastKey(amount! * -1);
    amount = Math.min(amount, this.size);

    const iterable = this.keys();
    return Array.from({ length: amount }, (): (string | number | bigint) => iterable.next().value);
  }

  /**
   * Deletes all elements from the collection
   */
  deleteAll() {
    if (!this.mutable) throw new ImmutabilityError('collection', 'deleteAll');
    for (const key of this.keys()) this.delete(key);
  }

  /** Overriden from `Map#delete` */
  delete(key: string | number | bigint) {
    if (!this.mutable) throw new ImmutabilityError('collection', 'delete');
    return super.delete(key);
  }

  /** Overriden from `Map#set` */
  set(key: string | number | bigint, value: T) {
    if (!this.mutable) throw new ImmutabilityError('collection', 'set');
    return super.set(key, value);
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

  /** Make this class immutable */
  freeze() {
    this.mutable = false;
    Object.freeze(this);
    Object.freeze(this.constructor);
  }

  /** Makes this class mutable and returns a new collection of the copied values of this immutable collection */
  unfreeze() {
    // There is no "way" that this can be unfrozed, so we make a
    // new collection for safety precautions
    const collection = new (this.constructor as typeof Collection)<T>();
    for (const [key, value] of this) collection.set(key, value);

    return collection;
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
   * Computes a value if it's absent in this Collection
   * @param key The key to find
   * @param insert Function to run if the key doesn't exist
   */
  emplace(key: string, insert: () => T) {
    if (!this.has(key)) {
      if (!this.mutable) throw new ImmutabilityError('collection', 'emplace');

      const item = insert();

      this.set(key, item);
      return item;
    } else {
      return this.get(key)!;
    }
  }

  /**
   * Build a new Collection with(out) initial values
   * @param values The values to add
   */
  static from<V>(values: V[] | NormalObject<V>) {
    const collection = new Collection<V>();
    if (Array.isArray(values)) {
      for (let i = 0; i < values.length; i++) collection.set(i, values[i]);
    } else if (isObject(values)) {
      for (const [key, value] of Object.entries(values)) collection.set(key, value);
    } else {
      throw new TypeError(`Collection#from requires the values to be an Object or Array, received ${typeof values}`);
    }

    return collection;
  }

  /**
   * Override function to return this as a String
   */
  toString() {
    const all: string[] = [];
    this.map(getKindOf).filter((item) => {
      if (!all.includes(item)) all.push(item);
    });

    return `Collection<${all.join(' | ')}>`;
  }
}