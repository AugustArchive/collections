import Queue from '../Queue';

describe('immutable.Queue', () => {
  it('should return 0 as the size of the queue', () => {
    const queue = new Queue();

    expect(queue).toBeDefined();
    expect(queue.size()).toBe(0);
  });

  it('should return 3 as the size of the queue', () => {
    const queue = new Queue([
      'a',
      'b',
      'c'
    ]);

    expect(queue.size()).toBe(3);
  });

  it('should peek at the last index of the queue', () => {
    const queue = new Queue([
      'a',
      'b',
      'c'
    ]);

    const last = queue.last();
    expect(last).toBe('c');
  });

  it('should peek at `1` of the queue\'s index', () => {
    const queue = new Queue([
      'a',
      'b',
      'c'
    ]);

    const item = queue.get(1);
    expect(item).toBeDefined();
    expect(item).toBe('b');
  });

  it('should be at an size of 4', () => {
    const queue = new Queue([
      'a',
      'b',
      'c'
    ]);

    queue.add('d');
    expect(queue.size()).toBe(4);
  });

  it('should push every value to a new value and return 5 as the array length', () => {
    const items: string[] = [];
    const queue = new Queue([
      'a',
      'b',
      'c',
      'd',
      'e'
    ]);

    queue.tick((item) => items.push(item));
    
    expect(queue.size()).toBe(0);
    expect(items.length).toBe(5);
  });

  it('should return `5` as the index of the iterations', () => {
    const queue = new Queue([
      'a',
      'b',
      'c',
      'd',
      'e'
    ]);

    let index = 0;
    for (const _ of queue) index++;

    expect(index).toBe(5);
    expect(index).not.toBe(0);
  });

  it('should include `5` in the queue', () => {
    const queue = new Queue(['a', 'b', '5']);
    expect(queue.includes('5')).toBeTruthy();
  });

  it('should return "a" from the first item in the queue', () => {
    const queue = new Queue(['a', 'b', '5']);
    const item = queue.shift();

    expect(queue).toBeDefined();
    expect(queue.size()).toBe(2);
    expect(item).toBe('a');
  });

  it('should return "5" from the last item in the queue', () => {
    const queue = new Queue(['a', 'b', '5']);
    const item = queue.unshift();

    expect(queue).toBeDefined();
    expect(queue.size()).toBe(2);
    expect(item).toBe('5');
  });

  describe('Queue#toString', () => {
    const queue = new Queue(['item', 'item', 'item']);
    const type = queue.toString();
    
    it('should return Queue<string>', () =>
      expect(type).toStrictEqual('Queue<string>')
    );
  });

  describe('Queue#find', () => {
    const queue = new Queue(['a', 'b', 'c', 'd']);

    it('should return "d" when using Queue#find', () => 
      expect(queue.find((item) => item === 'd')).toStrictEqual('d')
    );

    it('should return "undefined" when using Queue#find', () =>
      expect(queue.find(e => e === 'f')).toBeUndefined()
    );
  });
});
