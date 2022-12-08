const fs = require('fs')

exports.read = function(filename) {
  return fs.readFileSync(filename, { encoding: 'utf-8', flag: 'r' })
}

exports.log = function(obj) {
  console.log(JSON.stringify(obj, null, 2))
}

exports.range = function*(start, stop, step = 1) {
  if (stop == null) {
    stop = start
    start = 0
  }
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i
  }
}

exports.onlyInts = function(str) {
  return str.match(/\d+/g).map(ea => parseInt(ea));
}

exports.onlyFloats = function(str) {
  return str.match(/(\d+(?:\.\d+)?)/g).map(ea => parseFloat(ea));
}

exports.atoi = function(c) {
  let i = c.charCodeAt(0)
  return i > 90 ? i - 97 : i - 39
}

exports.enumerate = function enumerate(arr) {
  return Object.entries(arr)
}
