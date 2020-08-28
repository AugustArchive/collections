export type NormalObject<T> = Record<string | number | symbol, T>;

/**
 * Utility check to see if it's an object
 * @param obj The object iself
 * @returns a boolean check
 */
export default <S>(obj: NormalObject<S>): obj is NormalObject<S> => !Array.isArray(obj) && typeof obj === 'object';
