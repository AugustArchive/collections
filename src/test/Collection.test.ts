import Collection from '../Collection';

describe('Collection', () => {
    describe('Collection#from', () => {
        const coll1 = new Collection<string>();
        const coll2 = new Collection<string>();

        coll1.add('a');
        coll1.add('b'); 
        coll1.add('c');
        coll1.add('d');

        coll2.set('foo', '1');
        coll2.set('bar', '2');
        coll2.set('baz', '3');

        const array: string[] = ['a', 'b', 'c', 'd'];
        const obj: { [x in 'foo' | 'bar' | 'baz']: string } = {
            foo: '1',
            bar: '2',
            baz: '3'
        };

        it('should be equal to the collections\' values', () => {
            const collWithArr = Collection.from(array);
            const collWithObj = Collection.from(obj);

            expect(collWithArr).toStrictEqual(coll1);
            expect(collWithObj).toStrictEqual(coll2);
        });
    });

    describe('Collection#find', () => {
        const collection = Collection.from({
            foo: 'foo',
            bar: 'bar',
            baz: 'baz'
        });

        const found = collection.find(v => v === 'foo')!;
        it('should equal to "foo"', () =>
            expect(found).toStrictEqual('foo')
        );
    });

    describe('Collection#filter', () => {
        const collection = Collection.from({
            foo: 'foo',
            bar: 'bar',
            baz: 'baz'
        });

        const filtered = collection.filter(a => a === 'foo');
        it('should be an Array of ["bar", "baz"]', () =>
            expect(filtered).toStrictEqual(['foo'])
        );
    });

    describe('Collection#add', () => {
        const collection = Collection.from(['foo', 'bar', 'baz']);
        collection.add('test');
        it('should have a length of 4', () =>
            expect(collection.size).toBe(4)
        );
    });

    describe('Collection#map', () => {
        const collection = Collection.from({
            foo: 'foo',
            bar: 'bar',
            baz: 'baz'
        });

        const mapped = collection.map(s => s.startsWith('b'));
        it('should be an Array of ["false", "true", "true"]', () =>
            expect(mapped).toStrictEqual([false, true, true])
        );
    });
});