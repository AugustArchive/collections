export type Class<T> = new (...args: any[]) => T;

/**
 * A check if the class has a `toJSON` function,
 * so we won't overheap the callstack
 * 
 * @param entity The class entity
 */
export default <T>(entity: Class<T>) => entity['toJSON']? entity['toJSON'](): null;