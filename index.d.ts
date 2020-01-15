declare module '@augu/immutable' {
    type NormalObject<T> = Record<string | number | symbol, T>;

    /**
     * The version of library: `@augu/immutable`
     */
    export const version: string;

    /**
     * The `Collection` immutable object
     */
    export class Collection<T> extends Map<string | number, T> {
        /**
         * Creates a new `Collection` instance
         * @param from Any values to add *before* we use the collection
         * @example
         * new Collection<string>(); // Create an empty collection
         * new Collection<string>(['aaa']); // Create a collection with an array value
         * new Collection<string>({ aaa: 'aaa' }); // Create a collection with an object value
         */
        constructor(from?: T[] | NormalObject<T>);

        /**
         * Checks if the collection is empty
         * @returns A boolean if the `size` property is 0
         * @example
         * return collection.empty;
         */
        public empty: boolean;

        /**
         * Returns an Array of all the values
         * @returns An array of all the values
         * @example
         * collection.toArray();
         */
        toArray(): T[];

        /**
         * Returns an Object of all the values
         * @example
         * collection.toObject();
         */
        toObject(): NormalObject<T>;

        /**
         * Adds an Array-like structure to the Collection
         * @param value The value to set
         */
        add(value: T): void;

        /**
         * Filter out anything from the `pred` parameter
         * @param pred The predicate function to filter out
         * @returns An array of what you need
         * @example
         * collection.filter(a => a === 's');
         */
        filter(pred: (i: T) => boolean): T[];

        /**
         * Map out anything from the `pred` parameter
         * @param pred The predicate function to map out
         * @returns An array of what you need
         * @example
         * collection.map(a => a).join(', ');
         */
        map<S>(pred: (i: T) => S): S[];

        /**
         * Find out anything in the Collection
         * @param pred The predicate function to find
         * @returns The value you need or `undefined` if the value wasn't found
         * @example
         * collection.find(a => a);
         */
        find(pred: (i: T) => boolean): T | undefined;

        /**
         * Get a random value from the Collection
         * @returns A random value or `undefined` if the collection is empty
         * @example
         * collection.random();
         */
        random(): T | undefined;

        /**
         * Merge this Collection to a new one
         * @returns A new collection from the old Collection
         */
        merge(coll: Collection<T>): Collection<T>;

        /**
         * Partition the Collection into 2 Collections
         * @param pred The predicate function to partition out
         * @returns The 2 collections in an Array
         * @example
         * collection.partition(a => a === 's');
         */
        partition(pred: (i: T) => boolean): [Collection<T>, Collection<T>];

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
        reduce<S>(func: (a: S, b: T) => S, initialValue?: S): S;

        /**
         * Returns the first thing added to the Collection
         * @param amount The amount specified
         * @returns A value, an array of values, or undefined
         * @example
         * collection.first();
         */
        first(): T | undefined;
        first(amount: number): T[];
        first(amount?: number): T | T[] | undefined;

        /**
         * Returns the last value of the collection
         * @param amount An amount specified
         * @returns The value, an array of values, or undefined
         * @example
         * collection.last();
         */
        last(): T | undefined;
        last(amount: number): T[];
        last(amount?: number): T | T[] | undefined;

        /**
         * Statically form a new Collection
         * @param values The values to add
         * @returns The new Collection instance
         * @example
         * Collection.from<string>(['aaaa']); // Form a new collection as an Array
         * Collection.from<string>({ a: 'aaa' }); // Form a new collection as an Object
         */
        static from<V>(values: V[] | NormalObject<V>): Collection<V>;
    }

    /**
     * The `Pair` immutable object
     */
    export class Pair<R, L> {
        /**
         * Creates a new instance of the `Pair` immutable object
         * @param right The right side instance
         * @param left The left side instance
         * @example
         * new Pair<string, string>('a', 'b');
         */
        constructor(right: R, left: L);

        /**
         * Gets the right side instance
         */
        getRight(): R;

        /**
         * Gets the left side instance
         */
        getLeft(): L;
    }

    /**
     * The dictionary immutable, just an extended version of the `Object` primitive type
     */
    export class Dictionary<V> {
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
        constructor(from?: V[] | NormalObject<V>);

        /**
         * Check if the object is empty
         */
        public empty: boolean;

        /**
         * Returns the size of the object if the key exists in the cache
         */
        public size(): number;

        /**
         * Returns an array of keys
         */
        public toKeyArray(): (string | number)[];

        /**
         * Returns an array of values
         */
        public toArray(): V[];

        /**
         * Returns an Array of the entries in the cache 
         */
        public getEntries(): [(string | number), V][];

        /**
         * Gets the names of the properties in the cache
         * if it has a `string` tied as the key
         * 
         * **NOTE**: This only gets it as a string, if they
         * are tied with `[Symbol]: value`, use `getPropertySymbols`
         */
        public getPropertyNames(): string[];

        /**
         * Gets the name of the properties in the cache
         * if it has a `symbol` tied as the key 
         */
        public getPropertySymbols(): symbol[];

        /**
         * Sets a value to the cache
         * @param key The key to add
         * @param value The value to insert
         */
        public set(key: string | number, value: V): boolean;

        /**
         * Deletes a key from the cache pool
         * @param key The key to remove
         */
        // eslint-disable-next-line
        delete(key: string | number): boolean;
        
        /**
         * Maps the object as with the `type` to an Array
         * @param type The type to get
         * @param predicate The predicate function to recursive over
         */
        map<S>(type: 'key', predicate: (item: string | number) => S): S[];
        map<S>(type: 'value', predicate: (item: V) => S): S[];
        map<S>(type: string, predicate: (item: any) => S): S[];

        /**
         * Filters out by the `type` from it's predicate function
         * @param type The type to filter out
         * @param predicate The predicate function to recursive over
         */
        filter(type: 'key', predicate: (item: string | number) => boolean): (string | number)[];
        filter(type: 'value', predicate: (item: V) => boolean): V[];
        filter(type: string, predicate: (item: any) => boolean): (string | number | V)[];
    }
}