import { ExtensiveName } from '..';

export default class List<T> extends Set<T> {
    private name: string;

    /**
     * Creates a new instance of the `List` immutable class.
     * @param base The base
     */
    constructor(base?: ExtensiveName<T>) {
        super();

        this.name = base? base.name: 'unknown';
    }

    /**
     * Adds an object to the list
     * @param a The object to add
     */
    set(a: T) {
        return this.add(a);
    }

    /**
     * Merges a list to a new one
     * @param x The list to merge
     */
    merge(x: List<T>) {
        const newList = new List<T>();
        for (const item of x) this.set(item);
        return newList;
    }

    /**
     * Ignore this
     */
    toString() {
        return `List<${this.name}>`;
    }
}