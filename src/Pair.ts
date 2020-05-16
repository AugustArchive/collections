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

  /** Make this class immutable */
  freeze() {
    Object.freeze(this);
    Object.freeze(this.constructor);

    return this;
  }

  /**
   * Override function to return this as a String
   */
  toString() {
    const getKindOf = (element: any) => {
      if (element === undefined) return 'undefined';
      if (element === null) return 'null';
      if (!['object', 'function'].includes(typeof element)) return (typeof element);
      if (element instanceof Array) return 'array';
      
      return {}.toString.call(element).slice(8, -2).toLowerCase();
    };

    return `Pair<${getKindOf(this.right)}, ${getKindOf(this.left)}>`;
  }
}