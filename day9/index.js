const { read, log, range, enumerate } = require('../helper')

let steps = read('data')
  .trim()
  .split('\n')
  .map((ea) => ea.split(' '))

let snek = Array()
let visited = new Set()

// p1 --> 2, p2 --> 10
for (i of range(10)) {
  snek.push([0, 0])
}

for ([_, step] of enumerate(steps)) {
  for (_ of range(step[1])) {
    if (step[0] === 'L') snek[0][1] -= 1
    if (step[0] === 'R') snek[0][1] += 1
    if (step[0] === 'U') snek[0][0] -= 1
    if (step[0] === 'D') snek[0][0] += 1

    for (i of range(snek.length - 1)) {
      let [h, t] = [snek[i], snek[i + 1]]
      if (Math.abs(h[0] - t[0]) > 1 || Math.abs(h[1] - t[1]) > 1) {
        for (i of range(2)) {
          if (h[i] > t[i]) {
            t[i] += 1
          } else if (h[i] < t[i]) {
            t[i] -= 1
          }
        }
        visited.add(JSON.stringify(snek[snek.length - 1]))
      }
    }
  }
}

log(visited.size)
