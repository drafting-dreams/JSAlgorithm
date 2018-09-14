const quickSort = require('./QuickSort');

//4 buckets bucket sort;
function bucketSort (arr) {
  const bucketsNum = 4;
  const max = Math.max(...arr);
  const min = Math.min(...arr);

  const bucketSize = Math.floor(max - min / bucketsNum);
  const buckets = [[],[],[],[]];

  arr.forEach((value) => {
    for(let i=1; i<=bucketsNum; i++) {
      if(value <= min + bucketSize) {
        buckets[i-1].push(value);
        break;
      }
    }
  });

  let i=0;
  buckets.forEach(bucket => {
    quickSort(bucket);
    bucket.forEach(value => {
      arr[i++] = value;
    });
  });

}

module.exports = bucketSort;
