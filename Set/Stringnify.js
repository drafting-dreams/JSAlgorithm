function stringnify (o) {
  switch (typeof o) {
    case 'number':
      return 'number: ' + String(o)
    case 'string':
      return 'string: ' + o
    case 'boolean':
      return 'boolean: ' + String(o)
    case 'undefined':
      return 'undefined'
    case 'function':
      return 'function: ' + o.toString()
    case 'object':
      if (Array.isArray(o)) {
        let re =  'array: ['
        for(let v of o) {
          re += (stringnify(v) + ', ')
        }
        return re + ']'
      } else if(o) {
        let re = 'object: {'
        for(let v in o) {
          re += (v + ': ' + stringnify(o[v]) + ', ')
        }
        return re + '}'
      } else {
        return 'null'
      }
  }
}

module.exports = stringnify
