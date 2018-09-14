/*
* 起点：字典序最小的排列
* 终点：字典序最大的排列
* 过程：从当前排列生成字典序刚好比他大的下一个排列
*
* 这就是STL中的next_permutation算法
*
* 比如说，现在我们要找21543的下一个排列，我们可以从左至右逐个扫描每个数，
* 看哪个能增大（至于如何判定能增大，是根据如果一个数右面有比它大的数存在，那么这个数就能增大），
* 我们可以看到最后一个能增大的数是：x = 1。而1应该增大到多少？
* 1能增大到它右面比它大的那一系列数中最小的那个数，即：y = 3，
* 故此时21543的下一个排列应该变为23xxx，显然 xxx(对应之前的B’）应由小到大排，于是我们最终找到比“21543”大，
* 但字典顺序尽量小的23145，找到的23145刚好比21543大。
*
* 步骤（二找、一交换、一翻转）
* 找到排列中最后（最右）一个升序的首位位置i，x = ai
* 找到排列中第i位右边最后一个比ai 大的位置j，y = aj
* 交换x，y
* 把第(i+ 1)位到最后的部分翻转
*/


//找最后一个升序的首位位置，如果没有找到，返回-1
function findLastAscending(arr) {
  for(let i=arr.length-2; i>=0; i--) {
    if(arr[i]<arr[i+1]) {
      return i;
    }
  }
  return -1;
}

//找 i 位置之后，最后一个比他大的字符位置，没找到返回-1
function findLastBigger(arr, i) {
  for(let j=arr.length-1; j>i; j--) {
    if(arr[j]>arr[i]) {
      return j;
    }
  }
  return -1;
}

function nextPermutation(input) {
  const result = [input];

  for(let i=0; i<result.length; i++) {
    let now = result[i];
    now = [...now];

    const lastAscend = findLastAscending(now);
    if(lastAscend === -1)
      break;
    const lastBigger = findLastBigger(now, lastAscend);
    [now[lastAscend], now[lastBigger]] = [now[lastBigger], now[lastAscend]];

    const next = now.slice(0, lastAscend+1).concat(now.slice(lastAscend+1).reverse());
    result.push(next.join(''));
  }
  console.log(result, result.length);
}

const prev = Date.now();
nextPermutation('aabbccddee');
const after = Date.now();

console.log(after-prev,'ms');
