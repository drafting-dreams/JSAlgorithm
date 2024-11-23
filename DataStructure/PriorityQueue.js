class PriorityQueue {
  constructor(compareFn, items) {
    this.compareFn = compareFn;
    this._queue = [null];
    for (let item of items) {
      this.put(item);
    }
  }
  _parent(i) {
    return Math.floor(i / 2);
  }
  _leftChild(i) {
    return 2 * i;
  }
  _rightChild(i) {
    return 2 * i + 1;
  }
  _exchange(i, j) {
    [this._queue[i], this._queue[j]] = [this._queue[j], this._queue[i]];
  }
  size() {
    return this._queue.length - 1;
  }
  peek() {
    return this._queue.length > 1 ? this._queue[1] : null;
  }
  put(item) {
    this._queue.push(item);
    let i = this._queue.length - 1;
    while (i > 1) {
      const parentI = this._parent(i);
      if (this.compareFn(this._queue[parentI], this._queue[i]) >= 0) {
        break;
      } else {
        this._exchange(parentI, i);
        i = parentI;
      }
    }
  }
  top() {
    this._exchange(1, this._queue.length - 1);
    const re = this._queue.pop();
    let i = 1;
    while (this._leftChild(i) < this._queue.length) {
      const leftI = this._leftChild(i);
      const rightI = this._rightChild(i);
      let maxI = i;
      if (this.compareFn(this._queue[maxI], this._queue[leftI]) < 0) {
        maxI = leftI;
      }
      if (
        rightI < this._queue.length &&
        this.compareFn(this._queue[maxI], this._queue[rightI]) < 0
      ) {
        maxI = rightI;
      }
      if (maxI === i) {
        break;
      } else {
        this._exchange(maxI, i);
        i = maxI;
      }
    }
    return re;
  }
}
