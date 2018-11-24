function createCurry(func, arity=func.length, args=[]) {

  let wrapper = function() {
    let _args = [...arguments]
    args.push(..._args)

    if(_args.length < arity) {
      arity -= _args.length

      return createCurry(func, arity, args)
    }
    return func(...args)
  }
  return wrapper
}

function sum(a,b,c) {
  return a+b+c
}
const currified = createCurry(sum)

console.log(currified(1)(32)(1))

// function check(reg, targetString) {
//   return reg.test(targetString)
// }
//
// let _check = createCurry(check)
//
// let checkPhone = _check(/^1[34578\d{9}$]/);
// // let checkEmail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
//
// console.log(checkPhone('183888888'));
// // checkEmail('xxxxx@test.com');
