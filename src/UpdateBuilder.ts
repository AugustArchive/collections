/**
 * Copyright (c) 2019-2021 August
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

/** List of update types that the [[UpdateBuilder]] can handle */
type UpdateQueryTypes = 'set' | 'push' | 'pull' | 'inc' | 'dec';

/** Query selector for [[UpdateQuery]] */
type ObjectQuerySelector<T> = T extends object ? { [P in keyof T]?: T[P]; } : T;

export type UpdateQuery<T> = {
  [P in UpdateQueryTypes]?: {
    [x: string]: ObjectQuerySelector<T>;
  };
}

const QueryTypes: UpdateQueryTypes[] = ['set', 'push', 'pull', 'inc', 'dec'];

/**
 * Represents a builder structure for updating objects in a [[Collection]]
 * @template T The type to update
 */
export default class UpdateBuilder<T> {
  /**
   * Create a [[UpdateBuilder]] and returns a [[`callback`]] function of what has updated or not
   * @param query The query to create
   * @param callback The callback function, if any
   */
  update(query: UpdateQuery<T>) {
    const keys = Object.keys(query);
    if (!keys.length) throw new TypeError('Query object cannot be a empty object');
    if (keys.some(i => !QueryTypes.includes(<any> i))) {
      const values = keys.filter(i => !QueryTypes.includes(<any> i));
      throw new TypeError(`Keys ${values.length} were not a valid query type. (valid: ${QueryTypes.join(', ')})`);
    }

    for (let i = 0; i < keys.length; i++) {
      // noop
    }
  }
}
