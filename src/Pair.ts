export default class Pair<R = any, L = any> {
  private right: R;
  private left: L;

  constructor(right: R, left: L) {
    this.right = right;
    this.left = left;
  }

  getRight() {
    return this.right;
  }

  getLeft() {
    return this.left;
  }
}