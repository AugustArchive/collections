declare module '@augu/immutable' {
    export const version: string;
    export interface ExtensiveName<T> {
        name: string;
    }
    export class List<T> extends Set<T> {
        constructor(base?: ExtensiveName<T>);

        private name: string;
        public set(a: T): any;
        public merge(x: List<T>): this;
        public toString(): string;
    }
    export class Collection<T> extends Map<string | number, T> {
        constructor(base?: ExtensiveName<T>);

        private name: string;
        public empty: boolean;
        public toArray(): T[];
        public find(fun: (i: T) => boolean): T | undefined;
        public filter(fun: (i: T) => boolean): T[];
        public map<S>(fun: (i: T) => S): S[];
        public random(): T | undefined;
        public partition(fun: (i: T) => boolean): [this, this];
        public merge(x: Collection<T>): this;
        public every(fun: (i: T) => boolean): boolean;
        public some(fun: (i: T) => boolean): boolean;
        public static from<V>(obj: V[] | Record<string | number | symbol, V>): Collection<V>;
        public toString(): string;
    }
}