function expand (obj) {
  let newObj = {};
  for (let p in obj) {
    if (typeof (obj[p]) === 'object' && !Array.isArray(obj[p])) {
      Object.assign(newObj, expand(obj[p]))
    } else {
      Object.assign(newObj, {[p]: obj[p]})
    }
  }
  return newObj;
}

let test = {
  a: 1,
  b: {c: 'string', d: 1.222, e: {f: [123,4]}},
  k: function x() {}
}
console.log(expand(test))
