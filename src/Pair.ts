/**
 * The `Pair` immutable object
 */
export default class Pair<R, L> {
    /**
     * The right side of the Pair
     */
    private right: R;

    /**
     * The left side of the Pair
     */
    private left: L;

    /**
     * Creates a new instance of the `Pair` immutable object
     * @param right The right side of the Pair
     * @param left The left side of the Pair
     * @example
     * const pair = new Pair<string, string>('a', 'b');
     */
    constructor(right: R, left: L) {
        this.right = right;
        this.left  = left;
    }

    /**
     * Recursive way to get the right side of the Pair
     * @returns The right side instance
     */
    getRight() {
        return this.right;
    }

    /**
     * Recursive way to get the left side of the Pair
     * @returns The left side instance
     */
    getLeft() {
        return this.left;
    }
}