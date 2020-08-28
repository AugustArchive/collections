export default function removeArray<T>(cache: any[], item: T | number) {
  if (typeof item === 'number') {
    const value = cache[(item as number)];
    if (!value || value === null) throw new Error(`Item at index ${item} is not in the cache.`);

    for (let i = 0; i < cache.length; i++) {
      if (i === item) cache.splice(i, 1);
    }
  } else {
    for (let i = 0; i < cache.length; i++) {
      if (cache[i] === item) cache.splice(i, 1);
    }
  }
}
