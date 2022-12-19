const { read, log, enumerate } = require('../helper')

let pairs = read('./data')
  .trim()
  .replaceAll('10', 'a')
  .split('\n\n')
  .map((ea) => ea.split('\n'))

function next(line) {
  let str = ''
  let c = 0
  let i = 0
  for (; i < line.length; i++) {
    let l = line[i]
    if (l === '[') c++
    if (l === ']') c--
    if (l === ',' && c === 0) break
    str += l
  }
  return [str, line.slice(i + 1)]
}

function compare(left, right) {
  if (left.length === 1 && right.length === 1) {
    if (left[0] < right[0]) {
      sums.push(index + 1)
      done = true
      return true
    } else if (right[0] < left[0]) {
      done = true
      return true
    } else return false
  }

  if (left.length === 1) right = right.slice(1, right.length - 1)
  else if (right.length === 1) left = left.slice(1, left.length - 1)
  else {
    left = left.slice(1, left.length - 1)
    right = right.slice(1, right.length - 1)
  }

  while (true) {
    if (left.length === 0 && right.length === 0) break
    if (left.length === 0 && right.length >= 0) {
      sums.push(index + 1)
      done = true
      break
    }
    if (left.length >= 0 && right.length == 0) {
      done = true
      break
    }
    let l, r
    ;[l, left] = next(left)
    ;[r, right] = next(right)
    if (compare(l, r)) break
    if (done) break
  }
}

let sums = []
let done = false

for ([index, pair] of enumerate(pairs)) {
  index = parseInt(index)
  done = false
  let [left, right] = pairs[index]
  compare(left, right)
}

log(sums.reduce((a, b) => a + b, 0))
