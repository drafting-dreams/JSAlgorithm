// num>=Min && num<Max
function RandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.floor(Rand * Range); //舍去
  return num;
}

function insertSort(arr) {
  for(let i=1; i<arr.length; i++) {
    const randomIndex = RandomNum(i, arr.length);
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    const buffer = arr[i];
    for(var j=i-1; j>=0; j--) {
      if(arr[j]>buffer) {
        arr[j+1] = arr[j];
      } else {
        arr[j+1] = buffer;
        break;
      }
    }
    if(j===-1) {
      arr[0] = buffer;
    }
  }
}

module.exports = insertSort;
