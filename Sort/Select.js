function selectSort(arr) {
  for(let i=0; i<arr.length-1; i++) {
    let minIndex = i;
    for(let j=i+1; j<arr.length; j++) {
      if(arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }
}

module.exports = selectSort;
