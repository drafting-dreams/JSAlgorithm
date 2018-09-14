function Heap () {
  this._heap = [];
  this.length = 0;
}

Heap.prototype = {
  //Add a new element to the Heap.
  shiftUp: function (element) {
    this._heap[++this.length] = element;
    let i = this.length;
    let isNotSmallHeap = () => Math.floor(i/2)>0 && element<this._heap[Math.floor(i/2)];
    while (isNotSmallHeap()) {
      [this._heap[Math.floor(i/2)], this._heap[i]] = [this._heap[i], this._heap[Math.floor(i/2)]];
      i = Math.floor(i/2);
    }
  },
  //Remove an element from the Heap
  shiftDown: function () {
    if(this.length ===0)
      return;

    const result = this._heap[1];
    this._heap[1] = this._heap.pop();
    this.length --;

    let i = 1;
    while (2*i <= this.length) {
      let minChildIndex = 2*i;
      if(2*i < this.length && this._heap[2*i+1] < this._heap[2*i]) {
        minChildIndex += 1;
      }
      if(this._heap[i] > this._heap[minChildIndex]) {
        [this._heap[i], this._heap[minChildIndex]] = [this._heap[minChildIndex], this._heap[i]];
        i = minChildIndex;
      } else {
        break;
      }
    }

    return result;
  }
};

module.exports = Heap;
