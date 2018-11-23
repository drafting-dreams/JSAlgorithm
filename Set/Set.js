const hash = require('./Stringnify')

function Set() {
  this.buffer = {}
  this.size = 0
}

Set.prototype = {
  set: function(o) {
    this.buffer[hash(o)] = o
    this.size += 1
    return this.size
  },
  get: function(o) {
    return this.buffer[hash(o)]
  },
  has: function(o) {
    return Boolean(this.get(o))
  },
  length: function() {
    return this.size
  }()
}

const set = new Set()
set.set(function a() {console.log('Hello, there!')})
set.set({a: "String", b: [true, 342.333, {asdf: "qwerty"}]})
set.get(function a() {console.log('Hello, there!')})()
console.log(set)
