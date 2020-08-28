/**
 * Stringifies a JavaScript object
 * @param element The element
 * @returns The stringified name
 */
export default (element: unknown) => {
  if (element === undefined) return 'undefined';
  if (element === null) return 'null';
  if (!['object', 'function'].includes(typeof element)) return (typeof element);
  if (Array.isArray(element)) return 'array';
  if (typeof element === 'function') {
    const func = element.toString();

    if (func.startsWith('function')) return 'function';
    if (func.startsWith('class')) return func.slice(5, func.indexOf('{')).trim();
  }
  
  return 'object';
};
