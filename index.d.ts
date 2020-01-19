declare module '@augu/immutable' {
  type NormalObject<T> = Record<string | number | symbol, T>;

  export const version: string;
  export class Collection<T = any> extends Map<string | number, T> {
    constructor(from?: T[] | NormalObject<T>);

    public empty: boolean;
    public add(val: T): void;
    public filter(predicate: (item: T) => boolean): T[];
    public map<S>(predicate: (item: T) => S): S[];
    public random(): T | null;
    public merge(collection: Collection<T>): Collection<T>;
    public partition(predicate: (item: T) => boolean): [Collection<T>, Collection<T>];
    public reduce<S>(predicate: (a: S, b: T) => S, initialValue?: S): S;
    public first(): T | undefined;
    public first(amount: number): T[];
    public first(amount?: number): T | T[] | undefined;
    public last(): T | undefined;
    public last(amount: number): T[];
    public last(amount?: number): T | T[] | undefined;
    public find(predicate: (item: T) => boolean): T | null;
    public static from<V>(values: V[] | NormalObject<V>): Collection<V>;
  }

  export class Pair<R = any, L = any> {
    private right: R;
    private left: L;

    constructor(right: R, left: L);
    getRight(): R;
    getLeft(): L;
  }
}