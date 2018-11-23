function createCurry(func, arity, args) {
  // get the length of the function
  let ari = arity || func.length

  let ar = args || []

  let wrapper = function() {
    let _args = [].slice.call(arguments);
    [].push.apply(ar, _args)

    if(_args.length < ari) {
      ari -= _args.length

      return createCurry(func, ari, ar)
    }
    return func.apply(func, args)
  }
  return wrapper
}

function check(reg, targetString) {
  return reg.test(targetString)
}

let _check = createCurry(check)

let checkPhone = _check(/^1[34578\d{9}$]/);
// let checkEmail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);

console.log(checkPhone('183888888'));
// checkEmail('xxxxx@test.com');
