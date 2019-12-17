export default class Pair<R, L> {
    public right: R;
    public left: L;
    
    set(right: R, left: L) {
        this.right = right;
        this.left  = left;
    }
}
