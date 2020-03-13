export default class Pair<R = any, L = any> {
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
}