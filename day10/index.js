const { read, log, range, enumerate } = require('../helper')

let steps = read('data')
  .trim()
  .split('\n')
  .map((ea) => ea.split(' '))

let cycle = 0
let x = 1
let sum = 0

for ([_, step] of enumerate(steps)) {
  let prev = cycle
  let y = x

  if (step[0] === 'addx') {
    cycle += 2
    x += parseInt(step[1])
  } else if (step[0] === 'noop') cycle += 1

  for (c of [20, 60, 100, 140, 180, 220])
    if (c > prev && c <= cycle) sum += y * c
}

log(sum)

cycle = 0
x = 1
let str = ''

for ([_, step] of enumerate(steps)) {
  let prev = cycle
  let y = x

  if (step[0] === 'addx') {
    cycle += 2
    x += parseInt(step[1])
  } else if (step[0] === 'noop') cycle += 1

  for (i of range(prev, cycle)) {
    let matched = false
    for (pixel of [i - 1, i, i + 1]) {
      if (y === pixel) matched = true
    }
    str += matched ? '#' : '.'

    if (str.length % 40 === 0) {
      console.log(str)
      str = ''
      cycle -= 40
    }
  }
}
