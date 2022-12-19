const { read, log } = require('../helper')

function compare(left, right) {
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

  function compareInner(left, right) {
    if (left.length === 1 && right.length === 1) {
      if (left[0] < right[0]) {
        res = -1
        done = true
        return true
      } else if (right[0] < left[0]) {
        res = 1
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
        res = -1
        done = true
        break
      }
      if (left.length >= 0 && right.length == 0) {
        res = 1
        done = true
        break
      }
      let l, r
      ;[l, left] = next(left)
      ;[r, right] = next(right)
      if (compareInner(l, r)) break
      if (done) break
    }
  }

  let res = 0
  let done = false
  compareInner(left, right)
  return res
}

let pairs = read('./data')
  .trim()
  .replaceAll('10', 'a')
  .split('\n\n')
  .map((ea) => ea.split('\n'))

let = sums = []
pairs.forEach((pair, i) => {
  let [left, right] = pair
  if (compare(right, left) === 1) {
    sums.push(i + 1)
  }
})
log(sums.reduce((a, b) => a + b, 0)) // p1

let lines = read('./data')
  .trim()
  .replaceAll('10', 'a')
  .replaceAll('\n\n', '\n')
  .split('\n')

lines.push('[[6]]')
lines.push('[[2]]')

lines.sort(compare)
let a, b
lines.forEach((ea, i) => {
  if (ea === '[[2]]') {
    a = i + 1
  }
  if (ea === '[[6]]') {
    b = i + 1
  }
})
log(a * b) // p2
