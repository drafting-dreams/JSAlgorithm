function copy (sheep) {
  // copy undefined, number, string, boolean, null
  let dolly = sheep

  // copy function
  if(typeof sheep === 'function') {
    dolly = sheep.bind({})
  } else if (typeof dolly === 'object' && dolly) {
    if(Array.isArray(sheep)) {  // copy array
      dolly = []
      sheep.forEach(v => {dolly.push(copy(v))})
    } else {  // copy object
      dolly = {}
      for(let v in sheep) {
        dolly[v] = copy(sheep[v])
      }
    }
  }

  return dolly
}

const test = {a: function () {}, b: 123, c: "string", d: false, e: [1,2,3], f: {a: [1,2, {a: "another string"}]}}
console.log(copy(test))
1.<script>放在<body>的最后，因为浏览器单线程，放在前面会先下载script然后执行，之后再把页面加载出来。
2.将多个dom操作合并之后，一次性更新，因为dom引擎和js引擎是相当用户两个孤岛，用更新dom的操作比较慢，当有大批量dom操作在很短时间内发生时，应当将他们合并。
3.动画尽量拿出文档流
4.使用ajax与后台进行数据的交互，不必每次请求都刷新页面
5.使用http缓存，缓存不经常变动的静态资源
6.利用web worker将大计算量的任务放在里面执行
7.将工程文件发布前要进行打包和uglify，uglify可以压缩文件大小，打包是为了减少http请求次数
8.写代码的时候要注意的一些事情：读取当前作用域的变量是最快的，对象嵌套越深，读取越慢，如果在一个作用域中要用到多个相同的嵌套比较深的变量，要创建一个临时变量
