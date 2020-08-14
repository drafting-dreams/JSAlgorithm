class OrderedSet {
  arr = [];
  insert(v) {
    const i = this._binarySearch(v, 0, this.arr.length);
    this.arr.splice(i, 0, v);
  }

  lowerBound() {}
  // return index
  _binarySearch(v, left, right) {
    if (left === right) {
      return left;
    }
    const mid = Math.floor((left + right) / 2);
    if (this.arr[mid] === v) {
      return mid;
    } else if (this.arr[mid] > v) {
      return this._binarySearch(v, left, mid);
    }
    return this._binarySearch(v, mid + 1, right);
  }
}

const set = new OrderedSet();
set.insert(1);
set.insert(2);
set.insert(0);
console.log(set);
