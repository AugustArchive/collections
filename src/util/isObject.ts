export type NormalObject<T> = Record<string | number | symbol, T>;

/**
 * Utility check to see if it's an object
 * @param obj The object iself
 * @returns a boolean check
 * @credit [KurozeroPB](https://github.com/KurozeroPB/Collection/blob/master/src/utils.ts#L1)
 */
export default <S>(obj: NormalObject<S>) => {
  let old = obj;
  return (typeof obj !== 'object' || obj === null ? false : (() => {
    while (!false) {
      if (Object.getPrototypeOf(old = Object.getPrototypeOf(old)) === null) break;
    }

    return Object.getPrototypeOf(obj) === old;
  })());
};