import { ExtensiveName } from '..';

export default class Collection<T> extends Map<string | number, T> {
    private name: string;
    
    constructor(base?: ExtensiveName<T>) {
        super();

        this.name = base? base.name: "unknown";
    }

    toArray() {
        return [...this.values()];
    }

    find(fun: (i: T) => boolean) {
        for (const val of this.values()) {
            if (fun(val)) return val;
        }
        return undefined;
    }

    filter(fun: (i: T) => boolean) {
        const results: T[] = [];
        for (let item of this.values()) if (fun(item)) results.push(item);
        return results;
    }

    map<S>(fun: (i: T) => S) {
        const results: S[] = [];
        for (let item of this.values()) results.push(fun(item));
        return results;
    }

    random() {
        const iter = Array.from(this.values());
        return iter[Math.floor(Math.random() * iter.length)];
    }

    partition(fun: (i: T) => boolean) {
        const iterational = [new Collection<T>(), new Collection<T>()];
        for (const [k, v] of this) {
            if (fun(v)) iterational[0].set(k, v);
            else iterational[1].set(k, v);
        }
        return iterational;
    }

    merge(x: Collection<T>) {
        const newColl = new Collection<T>();
        for (const [key, val] of x) newColl.set(key, val);
        return newColl;
    }

    toString() {
        return `Collection<${this.name}>`;
    }
}