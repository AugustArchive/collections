import getKindOf from './util/getKindOf';

export default class Pair<F = any, S = any> {
  /** Checks if this pair is mutable (values can be added) or not */
  public mutable: boolean;

  /** The first instance of the pair */
  public first: F;

  /** The second instance of the pair */
  public second: S;

  /**
   * Construct a new `Pair` instance
   * @param right The right side
   * @param left The left side
   */
  constructor(right: F, left: S) {
    this.mutable = true;
    this.first = right;
    this.second = left;
  }

  /** Make this class immutable */
  freeze() {
    this.mutable = false;
    Object.freeze(this);
    Object.freeze(this.constructor);
  }

  /** Returns a new Pair instance of this immutable class */
  unfreeze() {
    return new Pair<F, S>(this.first, this.second);
  }

  /**
   * Override function to return this as a String
   */
  toString() {
    return `Pair<${getKindOf(this.first)}, ${getKindOf(this.second)}>`;
  }
}
