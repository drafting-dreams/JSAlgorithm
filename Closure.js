//这是个很经典的用闭包来解决问题的例子

function problem() {
  var arr = [];
  for (var i=1; i<=3; i++) {
    arr.push(function () {
      console.log(i);
    });
  }
  return arr;
}

problem()[1]();

//第一种解决办法 ES6 用let
function solution1() {
  const arr = [];
  for (let i=1; i<=3; i++) {
    arr.push(function () {
      console.log(i);
    });
  }
  return arr;
}

solution1()[1]();

//第二种解决办法 闭包+立即函数表达式
function solution2() {
  var arr = [];
  for (var i=1; i<=3; i++) {
    arr.push((function (count) {
      return function () {
        console.log(count);
      }
    })(i));
  }
  return arr;
}

solution2()[1]();
