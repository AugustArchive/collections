import { ExtensiveName } from '..';

export default class List<T> extends Set<T> {
    private name: string;

    constructor(base?: ExtensiveName<T>) {
        super();

        this.name = base? base.name: 'unknown';
    }

    set(a: T) {
        return this.add(a);
    }

    merge(x: List<T>) {
        const newList = new List<T>();
        for (const item of x) this.set(item);
        return newList;
    }

    toString() {
        return `List<${this.name}>`;
    }
}