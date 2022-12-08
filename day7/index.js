const { read, log, enumerate } = require('../helper')

let input = read('data').trim().split('\n')

let sums = Array()
for ([i, start] of enumerate(input)) {
  let depth = 0
  let sum = 0
  if (start === '$ ls') {
    for ([j, line] of enumerate(input.slice(i))) {
      if (line.slice(0, 5) === '$ cd ' && line.slice(5, 7) !== '..') {
        depth += 1
      } else if (line === '$ cd ..') {
        depth -= 1
        if (depth < 0) {
          break
        }
      } else {
        let t = line.split(' ')[0]
        if (t !== '$' && t !== 'dir') {
          sum += parseInt(t)
        }
      }
    }
    sums.push(sum)
  }
}

let sum = 0
for ([i, t] of enumerate(sums)) {
  if (t <= 100000) {
    sum += t
  }
}
log(sum) // Part 1

let unusedspace = 70000000 - sums[0]
sums.sort((a, b) => {
  return a - b
})
for ([i, t] of enumerate(sums)) {
  if (30000000 <= t + unusedspace) {
    log(t) // Part 2
    break
  }
}
