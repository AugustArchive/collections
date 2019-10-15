// credit: https://github.com/KurozeroPB/Collection/blob/master/src/utils.ts#L1
const isObjectLiteral = <S>(obj: Record<string | number | symbol, S>) => {
    let test = obj;
    return (typeof obj !== 'object' || obj === null? false: ((() => {
        while (!false) {
            if (Object.getPrototypeOf(test = Object.getPrototypeOf(test)) === null) break;
        }

        return Object.getPrototypeOf(obj) === test;
    })()));
}

export default class Collection<T> extends Map<string | number, T> {
    private name: string;
    
    /**
     * Creates a new instance of the `Collection` instance
     * @param base Optional object of an "name"
     */
    constructor(name?: string) {
        super();

        this.name = name? name: "unknown";
    }

    /**
     * Makes all values into an array
     */
    toArray() {
        const result: T[] = [];
        for (const values of this.values()) result.push(values);

        return result;
    }

    /**
     * Makes all keys and values into an object
     */
    toObject() {
        const result: Record<string | number, T> = {};
        for (const [key, value] of this) result[key] = value;

        return result;
    }

    /**
     * Finds a value or returns `undefined` if nothing found
     * @param fun The function that should return a boolean
     */
    find(fun: (i: T) => boolean) {
        for (const val of this.values()) {
            if (fun(val)) return val;
        }
        return undefined;
    }

    /**
     * Filters out from a predicate and returns the items if found
     * @param fun The predicate function to filter out
     */
    filter(fun: (i: T) => boolean) {
        const results: T[] = [];
        for (let item of this.values()) if (fun(item)) results.push(item);
        return results;
    }

    /**
     * Maps out everything from `values` from a predicate and returns all of them
     * @param fun The predicate function to find
     */
    map<S>(fun: (i: T) => S) {
        const results: S[] = [];
        for (let item of this.values()) results.push(fun(item));
        return results;
    }

    /**
     * Randomizes the values and returns an value (or `undefined` if there isn't anything)
     */
    random() {
        if (this.empty) return undefined;
        const iter = Array.from(this.values());
        return iter[Math.floor(Math.random() * iter.length)];
    }

    /**
     * Partitions the collection into 2 collections that is smaller or larger
     * @param fun The predicate function to return something
     */
    partition(fun: (i: T) => boolean) {
        const iterational = [new Collection<T>(), new Collection<T>()];
        for (const [k, v] of this) {
            if (fun(v)) iterational[0].set(k, v);
            else iterational[1].set(k, v);
        }
        return iterational;
    }

    /**
     * Merges a collection into a new one
     * @param x The collection to merge
     */
    merge(x: Collection<T>) {
        const newColl = new Collection<T>();
        for (const [key, val] of x) newColl.set(key, val);
        return newColl;
    }

    /**
     * Used from the predicate function, to find if every value returns itself by the predicate function
     * @param fun The predicate function to find everything
     */
    every(fun: (i: T) => boolean) {
        for (const val of this.values()) {
            if (!fun(val)) return false;
        }

        return true;
    }

    /**
     * Used from the predicate function, to find "some" values that return itself from the predicate function
     * @param fun The predicate function to find "some" values
     */
    some(fun: (i: T) => boolean) {
        for (const value of this.values()) {
            if (!fun(value)) return false;
        }

        return true;
    }

    /**
     * Used from the predicate function, to reduce values into a number
     * @param fun The predicate function
     * @param acculamtor Optional acculamtor to add up to
     */
    reduce(fun: (acculamtor: number, value: T) => number, acculamtor: number = 0) {
        const array = this.toArray();
        return array.reduce(fun, acculamtor);
    }
    
    /**
     * Checks if the collection is empty
     */
    get empty() {
        return !this.size || this.size === 0;
    }

    /**
     * Creates a new collection and adds everything from an Array or Object
     * @param obj The object/array to create a new collection from
     */
    static from<V>(obj: V[] | Record<string | number | symbol, V>) {
        const i = new Collection<V>();
        if (Array.isArray(obj)) {
            for (let it = 0; it < obj.length; it++) i.set(it, obj[it]);
        } else if (isObjectLiteral<V>(obj)) {
            for (const [k, v] of Object.entries(obj)) i.set(k, v);
        }

        return i;
    }

    /**
     * Ignore this
     */
    toString() {
        return `Collection<${this.name}>`;
    }
}
