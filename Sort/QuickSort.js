function QuickSortMain (arr) {
  quickSort(arr, 0, arr.length-1);
}

function quickSort (arr, left, right) {
  if(right<=left)
    return;

  const initialKeyIndex = left + Math.floor(Math.random() * (right - left + 1));
  [arr[left], arr[initialKeyIndex]] = [arr[initialKeyIndex], arr[left]];

  let boundary = left;
  for(let i=left+1; i<=right; i++) {
    if(arr[i]<arr[left]) {
      [arr[i], arr[boundary+1]] = [arr[boundary+1], arr[i]];
      boundary ++;
    }
  }
  [arr[boundary], arr[left]] = [arr[left], arr[boundary]];
  quickSort(arr, left, boundary-1);
  quickSort(arr, boundary+1, right);
}

module.exports = QuickSortMain;
