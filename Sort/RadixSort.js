function radixSort(arr) {
  const re = new Array(arr.length);
  const max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) >= 1; exp *= 10) {
    countSort(arr, exp);
  }
}

function countSort(arr, n) {
  const count = new Array(10).fill(0);
  const re = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    count[Math.floor(arr[i] / n) % 10]++;
  }
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    re[--count[Math.floor(arr[i] / n) % 10]] = arr[i];
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = re[i];
  }
}
const testCase = [170, 45, 75, 90, 802, 24, 2, 66];
radixSort(testCase);
console.log(testCase);
