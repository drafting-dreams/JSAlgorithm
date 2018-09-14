const results = [];

function canPermutate(arr, from, to) {
  for(let i=from+1; i<=to; i++) {
    if(arr[from] === arr[i]) {
      return false;
    }
  }
  return true;
}

function allPermutation(arr, from , to) {
  if(from > to) {
    return;
  }

  if(from === to) {
    results.push(arr.join(''));
  }

  if(from < to) {
    for(let i=from ; i<=to; i++) {
      if(canPermutate(arr, i, to)) {
        [arr[i], arr[from]] = [arr[from], arr[i]];
        allPermutation(arr, from + 1, to);
        [arr[i], arr[from]] = [arr[from], arr[i]];
      }
    }
  }
}

const input = 'aabbccddee';
const prev = Date.now();
allPermutation([...input], 0, input.length-1);
console.log(results, results.length);
const after = Date.now();
console.log(after-prev, 'ms');
