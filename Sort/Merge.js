function mergeSort(arr, left, right) {
  if(left>=right)
    return;
  const middle = Math.floor((left+right)/2);
  mergeSort(arr, left, middle);
  mergeSort(arr, middle+1, right);

  merge(arr, left, middle, right);
}

function merge(arr, left, middle, right) {
  const buffer = [];
  let p1 = left;
  let p2 = middle+1;
  while(p1<=middle && p2<=right) {
    if(arr[p1]<arr[p2]) {
      buffer.push(arr[p1]);
      p1++;
    } else {
      buffer.push(arr[p2]);
      p2++;
    }
  }
  if(p1<=middle) {
    while(p1<=middle) {
      buffer.push(arr[p1]);
      p1++;
    }
  }
  if(p2<=right) {
    while(p2<=right) {
      buffer.push(arr[p2]);
      p2++;
    }
  }
  buffer.forEach(function(value, index, a) {
    arr[index+left] = value;
  });
}

function mergeSortMain(arr) {
  return mergeSort(arr, 0, arr.length-1);
}

module.exports = mergeSortMain;
