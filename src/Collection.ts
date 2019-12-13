import isObject, { NormalObject } from './util/isObject';
import hasToJSON from './util/hasToJson';

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
        for (const [_, value] of this) {
            if (isObject<T & any>(value)) return false;
        }
    }
}