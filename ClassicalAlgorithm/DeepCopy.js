function deepCopy (oldObj) {
  let newObj = oldObj
  if (oldObj && typeof oldObj === 'object') {
    newObj = Object.prototype.toString.call(oldObj) === '[object Array]'//Array.isArray(oldObj);
      ? []
      : {}
    for (let v in oldObj) {
      newObj[v] = deepCopy(oldObj[v])
    }
  }

  return newObj
}

const a = {
  v: "123",
  o: {
    num: 123,
    arr: [{ae:1, b:2, c: [3,4]}, 4, "12345"]
  },
  end: true
};

console.log(deepCopy(a))
