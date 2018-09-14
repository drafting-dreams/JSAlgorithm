function expand1 (arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

let test = [1,2,[3,[4,5,6]],[7],[8,9]];
console.log(expand1(test));

function expand2 (arr) {
  for(let i=0; i<arr.length; i++) {
    if(Array.isArray(arr[i])) {
      const temp = expand2(arr[i]);
      arr.splice(i, 1, ...temp);
    }
  }
  return arr;
}
console.log(expand2(test));
