import Pair from '../Pair';

describe('immutable.Pair', () => {
  describe('Pair#getRight', () => {
    const pair = new Pair('a', 'b');
    it('should return "a"', () =>
      expect(pair.getRight()).toBe('a')
    );
  });

  describe('Pair#getLeft', () => {
    const pair = new Pair('a', 'b');
    it('should return "b"', () =>
      expect(pair.getLeft()).toBe('b')
    );
  });

  describe('Pair#toString', () => {
    const pair = new Pair('item', 'item');

    const type = pair.toString();
    it('should return Pair<string, string>', () =>
      expect(type).toStrictEqual('Pair<string, string>')
    );
  });
});