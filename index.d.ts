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
        public toArray(): T[];
        public find(fun: (i: T) => boolean): T | undefined;
        public filter(fun: (i: T) => boolean): T[];
        public map<S>(fun: (i: T) => S): S[];
        public random(): T;
        public partition(fun: (i: T) => boolean): [this, this];
        public merge(x: Collection<T>): Collection<T>;
        public toString(): string;
    }
}