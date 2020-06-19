// Find a better way of doing this
const names: { [x in 'collection' | 'queue']: string } = {
  collection: 'Collection',
  queue: 'Queue'
};

export class ImmutabilityError extends Error {
  constructor(type: 'collection' | 'queue', func: string) {
    super(`${names[type]} is immutable, values cannot be changed. (Called by ${names[type]}#${func})`);

    //Error.captureStackTrace(this);
    this.name = 'ImmutabilityError';
  }
}

export class MergeConflictError extends Error {
  constructor(collections: number) {
    super(`${collections} collections cannot be merged due to some being immutable`);

    this.name = 'MergeConflictError';
  }
}