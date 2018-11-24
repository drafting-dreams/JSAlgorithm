function infiniteCurry (func, args = []) {

  let wrapper = function () {
    let _args = [...arguments]
    args.push(..._args)

    return infiniteCurry(func, args)

  }
  wrapper.valueOf = func(args)
  wrapper.toString = func(args)

  return wrapper
}

const sum = function (args) {
  return function () {
    return args.reduce((a, b) => a + b)
  }
}

const infinite_sum_currying = infiniteCurry(sum)

console.log(+infinite_sum_currying(1)(2)(3))
