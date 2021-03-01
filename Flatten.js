function flatten(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      arr.splice(i, 1, ...flatten(arr[i]));
    }
  }
  return arr;
}

function flatten2(arr) {
  const re = [];

  function recursion(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] instanceof Array) {
        recursion(arr[i]);
      } else {
        re.push(arr[i]);
      }
    }
  }

  recursion(arr);
  return re;
}
const test = [1, 2, 3, [4, 5, [6, 7, [8]], 9, 10], 11];
console.log(flatten(test));
console.log(flatten2(test));
