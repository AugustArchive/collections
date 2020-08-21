import { Collection, Pair, Queue, TimedQueue } from '..';
import * as errors from '../util/errors';

describe('Collection - Immutability Checks', () => {
  const collection = new Collection({
    item1: 'item',
    item2: 1,
    item3: false,
    item4: Symbol('$item4')
  });

  it('should be mutable by default', () => {
    expect(collection.mutable).toBeDefined();
    expect(collection.mutable).toBeTruthy();
  });

  it('should be immutable', () => {
    collection.freeze();

    expect(collection.mutable).toBeDefined();
    expect(collection.mutable).toBeFalsy();
  });

  it('should throw an error if we add a new value', () => {
    expect(collection.mutable).toBeFalsy();
    expect(() => collection.add('item5')).toThrow(errors.ImmutabilityError);
    expect(() => collection.set('item6', 69)).toThrow(errors.ImmutabilityError);
  });

  it('should throw an error if we delete a new value', () => {
    expect(collection.mutable).toBeFalsy();
    expect(() => collection.delete('item2')).toThrow(errors.ImmutabilityError);
  });

  it('should return a new mutable collection of the same key/value pairs', () => {
    const coll = collection.unfreeze();

    expect(coll.mutable).toBeDefined();
    expect(coll.mutable).toBeTruthy();
    expect(coll).toStrictEqual(collection);
  });

  it('should not merge collections', () => {
    const coll1 = new Collection([1, 2, 3]);
    const coll2 = new Collection(['a', 'b', 'c']);

    coll1.freeze();
    expect(() => coll2.merge(coll1)).toThrow(errors.MergeConflictError);
  });
});

describe('Pair - Immutability Checks', () => {
  const pair = new Pair('item', 'item2');

  it('should be mutable by default', () => {
    expect(pair.mutable).toBeDefined();
    expect(pair.mutable).toBeTruthy();
  });

  it('should be immutable', () => {
    pair.freeze();

    expect(pair.mutable).toBeDefined();
    expect(pair.mutable).toBeFalsy();
  });

  it('should return a new mutable pair of the same right/left side', () => {
    const pair2 = pair.unfreeze();

    expect(pair2.mutable).toBeDefined();
    expect(pair2.mutable).toBeTruthy();
    expect(pair2.first).toStrictEqual(pair.first);
    expect(pair2.second).toStrictEqual(pair.second);
  });
});

describe('Queue - Immutability Checks', () => {
  const queue = new Queue(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

  it('should be mutable by default', () => {
    expect(queue.mutable).toBeDefined();
    expect(queue.mutable).toBeTruthy();
  });

  it('should be immutable', () => {
    queue.freeze();

    expect(queue.mutable).toBeDefined();
    expect(queue.mutable).toBeFalsy();
  });

  it('should not allow new values to be added', () => 
    expect(() => queue.add('value')).toThrow(errors.ImmutabilityError)
  );

  // TODO: Fix this test and inspect why it's not working as intended
  it('should not allow to delete items in this specific queue', () => 
    expect(() => queue.remove('a')).toThrow(errors.ImmutabilityError)
  );

  it('should be the exact Queue if we make a new mutable Queue instanace', () => {
    const q = queue.unfreeze();

    expect(q.mutable).toBeDefined();
    expect(q.mutable).toBeTruthy();
    expect(q).toStrictEqual(queue);
    expect(q.size()).toBe(7);
  });
});

describe('Immutability - TimedQueue', () => {
  let queue!: TimedQueue<number>;
  beforeAll(() => {
    queue = new TimedQueue();
    queue.add([0, 1, 2, 3, 4, 5, 6]);
  });

  afterAll(() => {
    queue.clear();
  });

  it('should be mutable by default', () => {
    expect(queue.mutable).toBeDefined();
    expect(queue.mutable).toBeTruthy();
  });

  it('should not be mutable when called TimedQueue#freeze', () => {
    queue.freeze();

    expect(queue.mutable).toBeDefined();
    expect(queue.mutable).toBeFalsy();
  });

  it('should not allow new items to be queued', () => 
    expect(() => queue.add([0, 1, 2])).toThrow(errors.ImmutabilityError)
  );

  it('should not allow items to be removed', () =>
    expect(() => queue.remove(0)).toThrow(errors.ImmutabilityError)
  );

  it('should be the same exact TimedQueue when becoming mutable', () => {
    const q = queue.unfreeze();

    expect(q.mutable).toBeDefined();
    expect(q.mutable).toBeTruthy();
    expect(q.size()).toBe(7);
  });
});