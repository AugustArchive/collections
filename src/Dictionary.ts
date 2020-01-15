import isObject, { NormalObject } from './util/isObject';

/**
 * The dictionary immutable, just an extended version of the `Object` primitive type
 */
export default class Dictionary<V> {
    /**
     * The cache portion of the dictionary, usually private
     */
    private cache: { [x: string]: V; } | { [x: number]: V; };

    /**
     * Creates a new instance of the Dictionary immutable collection
     * @param from Anything to add when constructing
     * @example
     * ```js
     * // Creates a new empty Dictionary
     * const dict = new Dictionary<string>();
     * 
     * // Creates a Dictionary with values inserted as an Object
     * const dict = new Dictionary<string>({
     *   foo: 'foo',
     *   bar: 'bar',
     *   baz: 'baz'
     * });
     * 
     * // Creates a Dictionary with values inserted as an Array
     * const dict = new Dictionary<string>(['foo', 'bar', 'baz']);
     * ```
     */
    constructor(from?: V[] | NormalObject<V>) {
        this.cache = {};
        if (from) {
            if (Array.isArray(from)) {
                for (const val of from) this.set(this.size(), val);
            }
            else if (isObject(from)) {
                for (const [key, value] of Object.entries(from)) this.set(key, value);
            }
            else {
                throw new TypeError(`"from" must be a Object or Array, received ${typeof from}`);
            }
        }
    }

    /**
     * Check if the object is empty
     */
    get empty() {
        return this.size() === 0;
    }

    /**
     * Returns the size of the object if the key exists in the cache
     */
    size() {
        let size = 0;
        for (const key in this.cache) {
            if (this.cache.hasOwnProperty(key)) size++;
        }

        return size;
    }

    /**
     * Returns an array of keys
     */
    toKeyArray() {
        return Object.keys(this.cache);
    }

    /**
     * Returns an array of values
     */
    toArray() {
        return Object.values(this.cache);
    }

    /**
     * Returns an Array of the entries in the cache 
     */
    getEntries() {
        return Object.entries(this.cache);
    }

    /**
     * Gets the names of the properties in the cache
     * if it has a `string` tied as the key
     * 
     * **NOTE**: This only gets it as a string, if they
     * are tied with `[Symbol]: value`, use `getPropertySymbols`
     */
    getPropertyNames() {
        return Object.getOwnPropertyNames(this.cache);
    }

    /**
     * Gets the name of the properties in the cache
     * if it has a `symbol` tied as the key 
     */
    getPropertySymbols() {
        return Object.getOwnPropertySymbols(this.cache);
    }

    /**
     * Sets a value to the cache
     * @param key The key to add
     * @param value The value to insert
     */
    set(key: string | number, value: V) {
        if (this.cache.hasOwnProperty(key)) return false;
        this.cache[key] = value;
        return true;
    }

    /**
     * Deletes a key from the cache pool
     * @param key The key to remove
     */
    // eslint-disable-next-line
    delete(key: string | number) {
        if (!this.cache.hasOwnProperty(key)) return false;
        delete this.cache[key];
        return true;
    }
    
    /**
     * Maps the object as with the `type` to an Array
     * @param type The type to get
     * @param predicate The predicate function to recursive over
     */
    map<S>(type: 'key', predicate: (item: string | number) => S): S[];
    map<S>(type: 'value', predicate: (item: V) => S): S[];
    map<S>(type: string, predicate: (item: any) => S) {
        const results: S[] = [];
        switch (type) {
            case 'key': {
                const keys = this.toKeyArray();
                for (const key of keys) results.push(predicate(key));
            } break;

            case 'value': {
                const values = this.toArray();
                for (const val of values) results.push(predicate(val));
            } break;

            default: throw new TypeError(`Invalid type for Dictionary#map, expected 'key' or 'value', gotten: ${type}`);
        }

        return results;
    }

    /**
     * Filters out by the `type` from it's predicate function
     * @param type The type to filter out
     * @param predicate The predicate function to recursive over
     */
    filter(type: 'key', predicate: (item: string | number) => boolean): (string | number)[];
    filter(type: 'value', predicate: (item: V) => boolean): V[];
    filter(type: string, predicate: (item: any) => boolean) {
        const results: any[] = [];
        switch (type) {
            case 'key': {
                const keys = this.toKeyArray();
                for (const key of keys) {
                    if (predicate(key)) results.push(key);
                }
            } break;

            case 'value': {
                const values = this.toArray();
                for (const val of values) {
                    if (predicate(val)) results.push(val);
                }
            } break;

            default: throw new TypeError(`Invalid type for Dictionary#map, expected 'key' or 'value', gotten: ${type}`);
        }

        return results;
    }

    /**
     * If the object has a contained element in it
     * @param key The key to find
     */
    contains(key: string | number) {
        if (this.empty) return false;
        if (!this.cache.hasOwnProperty(key)) return false;
        return true;
    }
}