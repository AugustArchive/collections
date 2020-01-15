import isObject, { NormalObject } from './util/isObject';

export default class Collection<T> extends Map<string | number, T> {
    /**
     * Creates a new `Collection` instance
     * @param from Any values to add *before* we use the collection
     * @example
     * new Collection<string>(); // Create an empty collection
     * new Collection<string>(['aaa']); // Create a collection with an array value
     * new Collection<string>({ aaa: 'aaa' }); // Create a collection with an object value
     */
    constructor(from?: T[] | NormalObject<T>) {
        super();

        if (from) {
            if (Array.isArray(from)) {
                for (let i = 0; i < from.length; i++) this.set(i, from[i]);
            } else if (isObject(from)) {
                for (const [key, value] of Object.entries(from)) this.set(key, value);
            } else {
                throw new TypeError(`"from" must be a Object or Array, received ${typeof from}`);
            }
        }
    }

    /**
     * Checks if the collection is empty
     * @returns A boolean if the `size` property is 0
     * @example
     * return collection.empty;
     */
    get empty() {
        return this.size === 0;
    }

    /**
     * Returns an Array of all the values
     * @returns An array of all the values
     * @example
     * collection.toArray();
     */
    toArray() {
        const result: T[] = [];
        for (const [_, value] of this) result.push(value);

        return result;
    }

    /**
     * Returns an Object of all the values
     * @example
     * collection.toObject();
     */
    toObject() {
        const result: NormalObject<T> = {};
        for (const [key, value] of this) result[key] = value;

        return result;
    }

    /**
     * Adds an Array-like value to the Collection
     * @param value The value to set
     */
    add(value: T) {
        this.set(this.size, value);
    }

    /**
     * Filter out anything from the `pred` parameter
     * @param pred The predicate function to filter out
     * @returns An array of what you need
     * @example
     * collection.filter(a => a === 's');
     */
    filter(pred: (i: T) => boolean) {
        const result: T[] = [];
        for (const value of this.values()) {
            if (pred(value)) result.push(value);
        }

        return result;
    }

    /**
     * Map out anything from the `pred` parameter
     * @param pred The predicate function to map out
     * @returns An array of what you need
     * @example
     * collection.map(a => a).join(', ');
     */
    map<S>(pred: (i: T) => S) {
        const result: S[] = [];
        for (const value of this.values()) result.push(pred(value));

        return result;
    }

    /**
     * Find out anything in the Collection
     * @param pred The predicate function to find
     * @returns The value you need or `undefined` if the value wasn't found
     * @example
     * collection.find(a => a);
     */
    find(pred: (i: T) => boolean) {
        let result: T | undefined = undefined;
        for (const value of this.values()) {
            if (pred(value)) result = value;
        }

        return result;
    }

    /**
     * Get a random value from the Collection
     * @returns A random value or `undefined` if the collection is empty
     * @example
     * collection.random();
     */
    random() {
        if (this.empty) return undefined;
        const values = Array.from(this.values());

        return values[Math.floor(Math.random() * values.length)];
    }

    /**
     * Merge this Collection to a new one
     * @returns A new collection from the old Collection
     */
    merge(coll: Collection<T>) {
        const newC = new Collection<T>();
        for (const [key, value] of coll) newC.set(key, value);

        return newC;
    }

    /**
     * Partition the Collection into 2 Collections
     * @param pred The predicate function to partition out
     * @returns The 2 collections in an Array
     * @example
     * collection.partition(a => a === 's');
     */
    partition(pred: (i: T) => boolean) {
        const iter: [Collection<T>, Collection<T>] = [new Collection(), new Collection()];
        for (const [key, val] of this) {
            const result = pred(val);
            if (result) iter[0].set(key, val);
            else iter[1].set(key, val);
        }

        return iter;
    }

    /**
     * Returns a value resulting from applying
     * a function to every element of the Collection
     * 
     * @param func The function that takes the previous value
     * @param initialValue Any value to set
     * @returns The final result
     * @example
     * collection.reduce((a, b) => a + b, 0);
     */
    reduce<S>(func: (a: S, b: T) => S, initialValue?: S) {
        const iter = this.values();
        let val!: T;
        let res: S = initialValue === undefined? iter.next().value: initialValue;
        while ((val = iter.next().value) !== undefined) res = func(res, val);

        return res;
    }

    /**
     * Returns the first thing added to the Collection
     * @param amount The amount specified
     * @returns A value, an array of values, or undefined
     * @example
     * collection.first();
     */
    first(): T | undefined;
    first(amount: number): T[];
    first(amount?: number): T | T[] | undefined {
        if (typeof amount === 'undefined') {
            const iter = this.values();
            return iter.next().value;
        }

        if (amount < 0) return this.last(amount! * -1);
        amount = Math.min(amount, this.size);
        const iter = this.values();
        return Array.from({ length: amount }, (): T => iter.next().value);
    }

    /**
     * Returns the last value of the collection
     * @param amount An amount specified
     * @returns The value, an array of values, or undefined
     * @example
     * collection.last();
     */
    last(): T | undefined;
    last(amount: number): T[];
    last(amount?: number): T | T[] | undefined {
        const iter = [...this.values()];
        if (typeof amount === 'undefined') return iter[iter.length - 1];
        if (amount < 0) return this.first(amount! * -1);
        if (!amount) return [];

        return iter.slice(-amount);
    }

    /**
     * Statically form a new Collection
     * @param values The values to add
     * @returns The new Collection instance
     * @example
     * Collection.from<string>(['aaaa']); // Form a new collection as an Array
     * Collection.from<string>({ a: 'aaa' }); // Form a new collection as an Object
     */
    static from<V>(values: V[] | NormalObject<V>) {
        const coll = new Collection<V>();
        if (Array.isArray(values)) {
            for (let i = 0; i < values.length; i++) coll.set(i, values[i]);
        } else if (isObject(values)) {
            for (const [key, value] of Object.entries(values)) coll.set(key, value);
        }

        return coll;
    }
}