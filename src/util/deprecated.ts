/**
 * Properly tell the user that this function is deprecated and will be removed in a future release
 * @param method The method itself
 * @param functions The other functions to use
 */
export function deprecate(method: string, functions: string | string[]) {
  const all = typeof functions === 'string' ? `function ${functions}` : `functions ${functions.join(', ')}`;

  console.log(`(immutable:${process.pid}) DeprecationWarning: Method "${method}" is deprecated and will be removed in a future release, please use ${all}.`);
}
