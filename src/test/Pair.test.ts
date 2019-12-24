import Pair from '../Pair';

describe('Pair', () => {
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
});