declare module '@augu/immutable' {
    export const version: string;
    export class Collection<T> extends Map<string | number, T> {
        constructor(name?: string);

        private name: string;
        public empty: boolean;
        public toArray(): T[];
        public toObject(): Record<string | number, T>;
        public find(fun: (i: T) => boolean): T | undefined;
        public filter(fun: (i: T) => boolean): T[];
        public map<S>(fun: (i: T) => S): S[];
        public random(): T | undefined;
        public partition(fun: (i: T) => boolean): [this, this];
        public merge(x: Collection<T>): this;
        public every(fun: (i: T) => boolean): boolean;
        public some(fun: (i: T) => boolean): boolean;
        public reduce(fun: (prev: number, curr: T) => number, acc?: number): any;
        public toJSONArray(): string;
        public toJSON(): string;
        public static from<V>(obj: V[] | Record<string | number | symbol, V>): Collection<V>;
        public toString(): string;
    }
}