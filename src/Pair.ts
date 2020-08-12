import getKindOf from './util/getKindOf';

export default class Pair<R = any, L = any> {
  /** Checks if this pair is mutable (values can be added) or not */
  public mutable: boolean;

  /** The right side of the pair */
  private right: R;

  /** The left side of the pair */
  private left: L;

  /**
   * Construct a new `Pair` instance
   * @param right The right side
   * @param left The left side
   */
  constructor(right: R, left: L) {
    this.mutable = true;
    this.right = right;
    this.left = left;
  }

  /** Function to get the right side of the pair */
  getRight() {
    return this.right;
  }

  /** Function to get the left side of the pair */
  getLeft() {
    return this.left;
  }

  /** Make this class immutable */
  freeze() {
    this.mutable = false;
    Object.freeze(this);
    Object.freeze(this.constructor);
  }

  /** Returns a new Pair instance of this immutable class */
  unfreeze() {
    return new Pair<R, L>(this.getRight(), this.getLeft());
  }

  /**
   * Override function to return this as a String
   */
  toString() {
    return `Pair<${getKindOf(this.right)}, ${getKindOf(this.left)}>`;
  }
}