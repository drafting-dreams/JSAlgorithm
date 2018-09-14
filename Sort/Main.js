const generateIntArr = require('./utils/ArrayFactory');
const bubbleSort = require('./Bubble');
const selectSort = require('./Select');
const insertSort = require('./Insert');
const mergeSort = require('./Merge');
const quickSort = require('./QuickSort');
const bucketSort = require('./BucketSort');
const heapSort = require('./HeapSort');

const sortFunctions = {
  bubbleSort,
  selectSort,
  insertSort,
  mergeSort,
  quickSort,
  bucketSort,
  heapSort,
};

Object.keys(sortFunctions).forEach(function (key) {
  const test = generateIntArr(15, 100);
  console.log('before', key, ':', test);
  sortFunctions[key](test);
  console.log('after', key, ':', test);
});
