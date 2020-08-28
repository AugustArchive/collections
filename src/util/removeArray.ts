export default function removeArray<T>(cache: any[], item: T | number) {
  if (typeof item === 'number') {
    const value = cache[(item as number)];
    if (!value || value === null) throw new Error(`Item at index ${item} is not in the cache.`);

    const i = cache.indexOf(value);
    if (i !== -1) cache.splice(i, 1);
  } else {
    const i = cache.indexOf(item);
    if (i !== -1) cache.splice(i, 1);
  }
}
