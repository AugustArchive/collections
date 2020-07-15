import { TimedQueue } from '..';

describe('immutable.TimedQueue', () => {
  let queue!: TimedQueue<number | string>;
  beforeAll(() => {
    queue = new TimedQueue();
    queue.add(['a', 'b', 'c', 0, 1, 2]);
  });

  afterAll(() => queue.clear());

  it('shouldn\'t be empty by default', () =>
    expect(queue.size()).toBe(6)
  );

  it('should not be called but then called afterwards', () => {
    expect(queue.started).toBeFalsy();

    queue.start();
    expect(queue.started).toBeTruthy();
    queue.stop();

    expect(queue.started).toBeFalsy();
  });
});