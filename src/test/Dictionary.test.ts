import Dictionary from '../Dictionary';

describe('Dictionary', () => {
    describe('Dictionary#empty', () => {
        const dict = new Dictionary<string>();
        it('should be empty', () => 
            expect(dict.empty).toBe(true)
        );
    });

    describe('Dictionary#getPropertyNames', () => {
        const dict = new Dictionary<string>({
            a: 'a',
            b: 'b',
            c: 'c'
        });

        const values = dict.getPropertyNames();
        it('should return a length of 3', () => 
            expect(values.length).toBe(3)
        );
    });

    describe('Dictionary#size', () => {
        const dict = new Dictionary<number>({
            a: 0,
            b: 1,
            c: 2,
            d: 3
        });

        const size = dict.size();
        it('should return "4" as the Dictionary size', () =>
            expect(size).toBe(4)
        );
    });

    describe('Dictionary#toArray', () => {
        const dict = new Dictionary({
            a: 'a',
            b: 'b',
            c: 'c'
        });

        const array = dict.toArray();
        it('should return "3" as the Dictionary\'s value length', () =>
            expect(array.length).toBe(3)
        );
    });

    describe('Dictionary#toKeyArray', () => {
        const dict = new Dictionary({
            a: 'a',
            b: 'b',
            c: 'c'
        });

        const array = dict.toKeyArray();
        it('should return "3" as the Dictionary\'s key length', () =>
            expect(array.length).toBe(3)
        );
    });

    describe('Dictionary#map', () => {
        const dict = new Dictionary({
            a: 'a',
            b: 'b',
            c: 'c'
        });

        const first = dict.map('value', item => item)[0];
        it('should return "a" as the mapped value', () =>
            expect(first).toBe('a')
        );
    });

    describe('Dictionary#filter', () => {
        const dict = new Dictionary({
            a: 'a',
            b: 'b',
            c: 'c'
        });

        const key = dict.filter('value', item => item === 'a')[0];
        it('should return "true"', () =>
            expect(key).toBe('a')
        );
    });
});