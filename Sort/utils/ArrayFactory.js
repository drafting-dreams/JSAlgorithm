function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateIntArray(length, max) {
  const arr = [];
  for(let i=0; i<length; i++) {
    arr.push(getRandomInt(max));
  }

  return arr;
}

module.exports = generateIntArray;
