import Collection from '../Collection';

describe('immutable.Collection', () => {
  describe('immutable.Collection#from', () => {
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

  describe('immutable.Collection#find', () => {
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

  describe('immutable.Collection#filter', () => {
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

  describe('immutable.Collection#add', () => {
    const collection = Collection.from(['foo', 'bar', 'baz']);
    collection.add('test');
    it('should have a length of 4', () =>
      expect(collection.size).toBe(4)
    );
  });

  describe('immutable.Collection#map', () => {
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

  describe('immutable.Collection#first', () => {
    const collection = Collection.from({
      foo: 'a',
      bar: 'b',
      baz: 'c'
    });

    const first = collection.first();
    it('should be "a"', () =>
      expect(first).toBe('a')
    );
  });

  describe('immutable.Collection#last', () => {
    const collection = Collection.from({
      foo: 'foo',
      bar: 'bar',
      baz: 'baz'
    });

    const last = collection.last();
    it ('should be "baz"', () =>
      expect(last).toBe('baz')
    );
  });

  describe('immutable.Collection#reduce', () => {
    const collection = new Collection<number>();
    collection.set('totalCount', 5000);
    collection.set('allCount', 2500);

    const reduced = collection.reduce<number>((a, b) => a + b, 0);
    it('should be equal to 7500', () =>
      expect(reduced).toBe(7500)
    );
  });

  describe('immutable.Collection#toString', () => {
    const collection = new Collection({
      item1: 'item',
      item2: 'item2'
    });

    const type = collection.toString();
    it('should return Collection<string>', () =>
      expect(type).toStrictEqual('Collection<string>')
    );

    const collection2 = new Collection({
      item1: 'item',
      item2: 1,
      item3: false,
      item4: Symbol('$item4')
    });

    const type2 = collection2.toString();
    it('should return Collection<string | number | boolean | symbol>', () => {
      expect(type2).toBeDefined();
      expect(type2).toContain(' | ');
    });
  });

  describe('Collection#shift', () => {
    const collection = new Collection({ item1: 'uwu', item2: 'owo' });
    
    it('should not be removed by default', () => {
      const item = collection.shift();
      
      expect(collection.size).toBe(2);
      expect(item).toBeDefined();
      expect(item).toBe('uwu');
    });

    it('should remove it', () => {
      const item = collection.shift(true);

      expect(collection.size).toBe(1);
      expect(item).toBeDefined();
      expect(item).toBe('uwu');
    });
  });

  describe('Collection#unshift', () => {
    const collection = new Collection({ item1: 'uwu', item2: 'owo' });
    
    it('should not be removed by default', () => {
      const item = collection.unshift();
      
      expect(collection.size).toBe(2);
      expect(item).toBeDefined();
      expect(item).toBe('owo');
    });

    it('should remove it', () => {
      const item = collection.unshift(true);

      expect(collection.size).toBe(1);
      expect(item).toBeDefined();
      expect(item).toBe('owo');
    });
  });

  describe('Collection#firstKey', () => {
    const collection = new Collection({ item1: 'uwu', item2: 'owo' });
    it('should be "item1"', () => {
      const key = collection.firstKey();

      expect(key).toBeDefined();
      expect(key).toBe('item1');
    });
  });

  describe('Collection#lastKey', () => {
    const collection = new Collection({ item1: 'uwu', item2: 'owo' });
    it('should be "item2"', () => {
      const key = collection.lastKey();

      expect(key).toBeDefined();
      expect(key).toBe('item2');
    });
  });

  describe('Collection#emplace', () => {
    const collection = new Collection({ item1: 'uwu' });

    it('should insert "item2" into the collection', () => {
      const value = collection.emplace('item2', 'owo');

      expect(value).toBeDefined();
      expect(value).toStrictEqual('owo');
    });

    it('shouldn\'t insert "item2" into the collection', () => {
      const value = collection.emplace('item2', 'uwu');

      expect(value).toBeDefined();
      expect(value).toStrictEqual('owo');
    });
  });

  describe('Collection#toArray', () => {
    const collection = new Collection({ item1: 'uwu', item2: 'owo' });

    it('should return ["uwu", "owo"]', () => {
      const values = collection.toArray();

      expect(values).toBeDefined();
      expect(values.length).toBe(2);
      expect(values.join(', ')).toStrictEqual('uwu, owo');
    });
  });

  describe('Collection#toKeyArray', () => {
    const collection = new Collection({ item1: 'uwu', item2: 'owo' });

    it('should return ["item1", "item2"]', () => {
      const values = collection.toKeyArray();

      expect(values).toBeDefined();
      expect(values.length).toBe(2);
      expect(values.join(', ')).toStrictEqual('item1, item2');
    });
  });

  describe('Collection#sort', () => {
    const collection = new Collection({ item1: 'uwu', item2: 'owo', item3: 'owow' });
    const values = collection.sort((a, b) => b.length - a.length);

    expect(values).toBeDefined();
    expect(values.length).toBe(3);
    expect(values).toStrictEqual(['owow', 'uwu', 'owo']);
  });

  describe('Collection#sortKeys', () => {
    const collection = new Collection({ item1: 'uwu', item2: 'owo', item34: 'owow' });

    // ok, what the fuck? why type an arrow function to `any`?!
    //
    // Look, I have no idea on how to fix - 
    // Argument of type '(a: string, b: string) => number' is not assignable to parameter of type '(this: Collection<string>, a: string | number | bigint, b: string | number | bigint) => number'.
    //  Types of parameters 'a' and 'a' are incompatible.
    //  Type 'string | number | bigint' is not assignable to type 'string'.
    //    Type 'number' is not assignable to type 'string'.
    //
    // If you have a solution, make a PR!
    const values = collection.sortKeys(((a: string, b: string) => b.length - a.length) as any);

    expect(values).toBeDefined();
    expect(values.length).toBe(3);
    expect(values).toStrictEqual(['item34', 'item1', 'item2']);
  });

  describe('Collection#some', () => {
    const collection = new Collection({ item1: 'uwu', item2: 'owo', item34: 'owow' });

    it('should return `true` if the string length threshold is over 2', () => {
      const value = collection.some(value => value.length > 2);
      expect(value).toBeTruthy();
    });

    it('should return `false` if the string length is over 5', () => {
      const value = collection.some(value => value.length > 5);
      expect(value).toBeFalsy();
    });
  });

  describe('Collection#someKeys', () => {
    const collection = new Collection({ item1: 'uwu', item2: 'owo', item34: 'owow' });

    it('should return `true` if the string length is over 3', () => {
      const value = collection.someKeys(((key: string) => key.length > 3) as any);
      expect(value).toBeTruthy();
    });

    it('should return `false` if the string length is over 8', () => {
      const value = collection.someKeys(((key: string) => key.length > 8) as any);
      expect(value).toBeFalsy();
    });
  });
});
