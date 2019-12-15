declare module '@augu/immutable' {
    type NormalObject<T> = Record<string | number | symbol, T>;

    export const version: string;
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
         * Alias for `Map#set`
         * @param key The key to set
         * @param val The value to set
         */
        add(key: string | number, val: T): void;

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
}