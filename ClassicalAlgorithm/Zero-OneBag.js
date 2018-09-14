function max (a, b) {
  return a > b ? a : b
}

function zeroOne (bagSize, values, weights) {
  const bagNum = values.length;
  const tab = [];
  for(let i=0; i<bagNum; i++) {
    tab.push(Array(bagSize+1).fill(0));
  }

  for (let i = 0; i <= bagSize; i++) {
    if (i >= weights[0]) {
      tab[0][i] = values[0]
    }
  }
  console.log(tab);
  for (let i = 1; i < bagNum; i++) {
    for (let j = 0; j <= bagSize; j++) {
      if (j - weights[i] >= 0)
        tab[i][j] = max(tab[i - 1][j] , tab[i - 1][j - weights[i]] + values[i]);
      else
        tab[i][j] = tab[i - 1][j];
    }
  }
  console.log(tab);
  return tab[bagNum-1][bagSize];
}

const bagSize = 18;
const v = [2,4,6,8];
const w = [8, 10, 10,10];

console.log(zeroOne(bagSize, v, w));
