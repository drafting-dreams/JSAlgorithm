const Heap = require('./DataStructures/Heap')

function heapSort (arr) {
  const heap = new Heap()
  arr.forEach(value => {heap.shiftUp(value)})
  for (let i = 0; i < arr.length; i++) {
    arr[i] = heap.shiftDown()
  }
}

module.exports = heapSort
