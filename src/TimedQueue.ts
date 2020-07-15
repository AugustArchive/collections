import { ImmutabilityError } from './util/errors';
import { EventEmitter } from 'events';
import removeArray from './util/removeArray';
import sleep from './util/sleep';

/** Options for the timed queue */
interface TimedQueueOptions {
  /** The amount of items to locate */
  itemCount?: number;

  /** Interval to stop the timer */
  every?: number;

  /** The amount of time to wait */
  time?: number;
}

/**
 * Queue instance but times everything when started/stopped
 */
export default class TimedQueue<T = unknown> extends EventEmitter {
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
  constructor(options?: TimedQueueOptions) {
    super();

    this.itemCount = options ? options.hasOwnProperty('itemCount') ? options.itemCount! : 1 : 1;
    this.started = false;
    this.mutable = true;
    this.cache = [];
    this.every = options ? options.hasOwnProperty('every') ? options.every! : 30000 : 30000;
    this.time = options ? options.hasOwnProperty('time') ? options.time! : 5000 : 5000;
  }

  /**
   * Adds an item to the queue
   * @param item The item to add
   */
  add(item: T): this;

  /**
   * Adds an array of items to the queue
   * @param item The items to add
   */
  add(item: T[]): this;

  /**
   * Adds an item to the queue
   * @param item The item to push
   */
  add(item: T | T[]) {
    if (!this.mutable) throw new ImmutabilityError('timedQueue', 'add');
    const items = Array.isArray(item) ? item : [item];
    this.cache.push(...items);

    return this;
  }

  /**
   * Removes an item from the queue
   * @param item The item to remove
   */
  remove(item: T | number) {
    if (!this.mutable) throw new ImmutabilityError('timedQueue', 'remove');
    removeArray(this.cache, item);
  }

  /**
   * Clears the cache
   */
  clear() {
    this.cache.length = 0;
  }

  /**
   * Returns the size of this TimedQueue
   */
  size() {
    return this.cache.length;
  }

  /**
   * Starts the timed queue
   */
  async start() {
    if (this.started) throw new Error('Timed queue has already started');
    this.emit('start');

    this.started = true;
    this._timer = setTimeout(async() => {
      if (this.itemCount === 1) {
        while (this.started && this.cache.length > 0) {
          const item = this.cache.shift()!;
          this.emit('tick', item);
          await sleep(this.time);
        }
      } else {
        while (this.started && this.cache.length > 0) {
          const items = this.cache.slice(0, this.itemCount);
          this.emit('tick', items);
          await sleep(this.time);
        }
      }

      this.emit('end');
      this._timer = undefined;
    }, this.every);
    
    return this;
  }

  /**
   * Stops the timed queue
   */
  stop() {
    if (!this.started) throw new Error('Timed queue has not started');

    this.started = false;
    clearTimeout(this._timer!);
    return this;
  }

  /** Make this class immutable */
  freeze() {
    this.mutable = false;
    Object.freeze(this);
    Object.freeze(this.constructor);
  }

  /** Make this class mutable and returns a new TimedQueue instance that is mutable */
  unfreeze() {
    const queue = new (this.constructor as typeof TimedQueue)<T>();
    for (const item of this.cache) queue.add(item);

    return queue;
  }

  /**
   * Override function to return this as a String
   */
  toString() {
    const getKindOf = (element: unknown) => {
      if (element === undefined) return 'undefined';
      if (element === null) return 'null';
      if (!['object', 'function'].includes(typeof element)) return (typeof element);
      if (Array.isArray(element)) return 'array';
      if (typeof element === 'function') {
        const func = element.toString();

        if (func.startsWith('function')) return 'function';
        if (func.startsWith('class')) return func.slice(5, func.indexOf('{')).trim();
      }
      
      return 'object';
    };

    const all: string[] = [];
    this.cache.map(getKindOf).filter((item) => {
      if (!all.includes(item)) all.push(item);
    });

    return `TimedQueue<${all.join(' | ')}>`;
  }
}