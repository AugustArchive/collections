/**
 * Copyright (c) Noelware
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Checks if [[`value`]] is a object or not
 * @param value The value to check
 * @returns If the value is a object or not.
 */
export function isObject(value: unknown): value is object {
  return (
    typeof value === 'object' &&
    !Array.isArray(value) && // arrays are enumerable objects, so `typeof []` would be `object`
    value !== null
  ); // null is considered object for some reason?
}

/**
 * Checks if [[`value`]] is an Array or not
 * @param value The value to check
 * @returns If the value is an Array or not.
 */
export function isArray(value: unknown): value is any[] {
  return typeof value === 'object' && Array.isArray(value);
}

/**
 * Deprecates a method if it's no longer gonna be updated
 * @param method The method that is deprecated
 */
export function deprecate(method: string) {
  console.warn(
    `(collections:${process.pid}) DeprecationWarning: Method "${method}" is deprecated and will be removed in a future release, refrain from creating bug reports of this method.`
  );
}

/**
 * Stringifies a JavaScript object or primitive
 * @param value The value to check
 * @returns The stringified value
 */
export function stringify(value: unknown) {
  if (!['object'].includes(<any>value)) return typeof value;
  if (value instanceof Error) return 'Error';
  if (value instanceof Date) return 'Date';
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';

  if (value instanceof Array) {
    const objects = value.map(stringify);
    const known = [...new Set(objects)];

    return `Array<${known.join(' | ')}>`;
  }

  return 'object';
}

/**
 * Removes a item from the array by it's index or value
 * @param arr The array to check from
 * @param value The index or value to remove
 * @returns The array that was updated or not
 */
export function removeArray<T>(arr: T[], value: number | T) {
  if (typeof value === 'number') {
    const item: T = arr[value];
    if (!item) throw new TypeError(`Item in index '${value}' was nothing.`);

    const index = arr.indexOf(item);
    if (index !== -1) {
      arr.splice(index, 1);
      return arr;
    } else {
      return arr;
    }
  } else {
    const index = arr.indexOf(value);
    if (index !== -1) {
      arr.splice(index, 1);
      return arr;
    }

    return arr;
  }
}
