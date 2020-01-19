import isObject, { NormalObject } from './util/isObject';

/**
 * The `Collection` immutable object
 */
export default class Collection<T = any> extends Map<string | number, T> {
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

  get empty() {
    return this.size === 0;
  }

  add(val: T) {
    this.set(this.size, val);
  }

  filter(predicate: (item: T) => boolean) {
    const result: T[] = [];
    for (const value of this.values()) {
      if (predicate(value)) result.push(value);
    }

    return result;
  }

  map<S>(predicate: (item: T) => S) {
    const result: S[] = [];
    for (const value of this.values()) result.push(predicate(value));

    return result;
  }

  random() {
    if (this.empty) return null;
    const iterable = Array.from(this.values());

    return iterable[Math.floor(Math.random() * iterable.length)];
  }

  merge(collection: Collection<T>) {
    const newColl = new Collection<T>();
    for (const [key, value] of collection) newColl.set(key, value);

    return newColl;
  }

  partition(predicate: (item: T) => boolean): [Collection<T>, Collection<T>] {
    const [item1, item2]: [Collection<T>, Collection<T>] = [new Collection(), new Collection()];
    for (const [key, value] of this) {
      const result = predicate(value);
      if (result) item1.set(key, value);
      else item2.set(key, value);
    }

    return [item1, item2];
  }

  reduce<S>(predicate: (a: S, b: T) => S, initialValue?: S) {
    const iterable = this.values();
    let value!: T;
    let res: S = initialValue === undefined ? iterable.next().value : initialValue;
    while ((value = iterable.next().value) !== undefined) res = predicate(res, value);

    return res;
  }

  first(): T | undefined;
  first(amount: number): T[];
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

  last(): T | undefined;
  last(amount: number): T[];
  last(amount?: number): T | T[] | undefined {
    const iter = [...this.values()];
    if (typeof amount === 'undefined') return iter[iter.length - 1];
    if (amount < 0) return this.first(amount! * -1);
    if (!amount) return [];

    return iter.slice(-amount);
  }

  find(predicate: (item: T) => boolean) {
    let result: T | null = null;
    for (const value of this.values()) {
      if (predicate(value)) result = value;
    }

    return result;
  }

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
}