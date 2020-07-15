declare module '@augu/immutable' {
  import { EventEmitter } from 'events';

  namespace immutable {
    /** Represents an object of key-value pairs */
    type NormalObject<T> = Record<string | number | symbol, T>;

    /** Represents a Iterator */
    interface Iterator<T> {
      next(): IteratorReturnResult<T>;
    }

    /** Options for the timed queue */
    interface TimedQueueOptions {
      /** The amount of items to locate */
      itemCount?: number;

      /** Interval to stop the timer */
      every?: number;

      /** The amount of time to wait */
      time?: number;
    }


    /** Returns the version of the library */
    export const version: string;

    /** The `Collection` immutable object, which is an extension of the `Map` class */
    export class Collection<T = any> extends Map<string | number, T> {
      /**
       * Creates a new instance of the `Collection` immutable class
       * @param from Any values to add
       */
      constructor(from?: T[] | immutable.NormalObject<T>);

      /** Getter if the collection is empty */
      public empty: boolean;

      /**
       * Adds a value to the collection with numbers from 0-... as it's key
       * @param item The item to push
       */
      public add(item: T): void;

      /**
       * Use a predicate function to filter out anything and return a new Array
       * @param func The predicate function to filter out
       * @returns A new Array of the values that returned `true` in the predicate function
       */
      public filter(func: (this: Collection<T>, item: T) => boolean): T[];

      /**
       * Use a predicate function to map anything into a new array
       * @param func The predicate function to map out and return a new array
       * @returns A new Array of the values from that function
       */
      public map<S>(func: (this: Collection<T>, item: T) => S): S[];

      /**
       * Returns a random value from the collection
       * @returns A random value or `null` if the collection is empty
       */
      public random(): T | null;
      
      /**
       * Merges all collections provided and this one to a new collection
       * @param collections Any collections to merge into this one
       */
      public merge(...collections: Collection<any>[]): Collection<T>;

      /**
       * Paritition the collection and return an Array of 2 collections that returned `true` or `false`
       * @param func The predicate function
       * @returns An array with 2 collections that represent a `true (first one)` and `false (second one)`
       */
      public partition(func: (this: Collection<T>, item: T) => boolean): [Collection<T>, Collection<T>];

      /**
       * Reduce the collection and return a new initial value
       * @param func The predicate function
       * @param initialValue The initial value
       */
      public reduce<S>(func: (this: Collection<T>, curr: S, acc: T) => S, initialValue?: S): S;

      /**
       * Returns the first element in the collection
       */
      public first(): T | undefined;

      /**
       * Returns an Array of the values from the correspondant `amount`
       * @param amount The amount to fetch from
       */
      public first(amount: number): T[];

      /**
       * Returns the last element in the collection
       */
      public last(): T | undefined;

      /**
       * Returns an Array of the values from the correspondant `amount`
       * @param amount The amount to fetch from
       */
      public last(amount: number): T[];

      /**
       * Find a value in the collection from it's predicate function
       * @param predicate The predicate function
       * @returns The value found or `null` if not found
       */
      public find(predicate: (item: T) => boolean): T | null;

      /**
       * Deletes all elements from the collection
       */
      public deleteAll(): void;

      /**
       * Make this Collection immutable, all items will never be removed or added
       */
      public freeze(): void;

      /**
       * Makes this class mutable and returns a new collection of the copied values of this immutable collection
       */
      public unfreeze(): this;

      /**
       * Build a new Collection with(out) initial values
       * @param values The values to add
       */
      public static from<V>(values: V[] | NormalObject<V>): Collection<V>;
    }

    export class Pair<R = any, L = any> {
      /**
       * Creates a new `Pair` instance
       * @param right The right side of the pair
       * @param left The left side of the pair
       */
      constructor(right: R, left: L);

      /**
       * Function to get the right side of the pair
       */
      public getRight(): R;

      /**
       * Function to get the left side of the pair
       */
      public getLeft(): L;

      /**
       * Make this Pair immutable, all items will never be removed or added
       */
      public freeze(): void;

      /**
       * Makes this class mutable and returns a new Pair of the copied values of this immutable Pair
       */
      public unfreeze(): this;
    }

    /**
     * Queue-based collection to fetch, requeue, and do other stuff!
     */
    export class Queue<T = any> {
      /**
       * Constructs a new instance of the `Queue` class
       * @param cache Optional value to set your own cache to the queue
       */
      constructor(cache?: T[]);

      /**
       * Enqueue a new value to the cache, run `tick` to process it!
       * 
       * This method is deprecated, use `Queue#add`
       * 
       * @param value The value to put
       */
      public enqueue(value: T): this;

      /**
       * Adds a item to the cache
       * @param value The value to add
       */
      public add(value: T): this;

      /**
       * Runs all of the queue values that was put with `add`.
       * 
       * This removes the cache while a for loop doesn't
       * 
       * @param func The function when a new queue item has ticked
       */
      public tick(func: (item: T) => void): void;

      /**
       * Returns the last value of the queue
       */
      public last(): T;

      /**
       * Returns the value or `null` if not found
       * @param index The index to peek at
       * @returns A value if it didn't return null
       */
      public get(index: number): T | null;

      /**
       * Removes an item from the cache
       * 
       * @warning Use `Queue#tick` to remove all!
       * @param item The item to remove or it's index
       * @returns This queue without the item
       */
      public remove(item: T | number): this;

      /**
       * Returns the last value of the queue
       * 
       * This function is deprecated, use `Queue#last`
       */
      public peek(): T;

      /**
       * Returns the value or `null` if not found
       * 
       * This function is deprecated, use `Queue#get`
       * @param index The index to peek at
       * @returns A value if it didn't return null
       */
      public peekAt(index: number): T | null;

      /**
       * Returns the size of the cache
       */
      public size(): number;

      /**
       * Makes the queue into an Array
       */
      public toArray(): T[];

      /**
       * Makes the queue into a Collection
       */
      public toCollection(): immutable.Collection<T>;

      /**
       * Make this Queue immutable, all items will never be removed or added
       */
      public freeze(): void;

      /**
       * Makes this class mutable and returns a new collection of the copied values of this immutable collection
       */
      public unfreeze(): this;

      /**
      * Checks if the key is included in the cache
      * @param key The key to find
      */
      public includes(key: T): boolean;

      /**
       * Makes this class iterable
       */
      [Symbol.iterator](): immutable.Iterator<T>;
    }

    export class TimedQueue<T = unknown> extends EventEmitter {
      /** The timer instance (that is running) */
      private _timer?: NodeJS.Timer;

      /** The amount of items to allocate */
      public itemCount: number;

      /** If the timer started or not */
      public started: boolean;

      /** The mutable state */
      public mutable: boolean;

      /** The cache of the queue */
      private cache: T[];

      /** Interval to stop the timer */
      public every: number;

      /** The amount of time to wait */
      public time: number;

      /**
       * Creates a new TimedQueue
       * @param options The options to use
       */
      constructor(options?: TimedQueueOptions);

      /**
       * Adds an item to the queue
       * @param item The item to add
       */
      public add(item: T): this;

      /**
       * Adds an array of items to the queue
       * @param item The items to add
       */
      public add(item: T[]): this;

      /**
       * Removes an item from the queue
       * @param item The item to remove
       */
      public remove(item: T | number): void;

      /**
       * Clears the cache
       */
      public clear(): void;

      /**
       * Returns the size of this TimedQueue
       */
      public size(): number;

      /**
       * Starts the timed queue
       */
      public start(): Promise<void>;

      /**
       * Stops the timed queue
       */
      public stop(): void;

      /**
       * Make this TimedQueue immutable, all items will never be removed or added
       */
      public freeze(): void;

      /**
       * Makes this class mutable and returns a new collection of the copied values of this immutable collection
       */
      public unfreeze(): this;
    }
  }

  export = immutable;
}