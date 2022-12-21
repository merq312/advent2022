const { read, log } = require('../helper')

let rules = read('data')
  .split('\n')
  .map((ea) => ea.split(' -> ').map((ea) => ea.split(',')))

let xmin = 1000
let xmax = -1
let ymin = 0
let ymax = -1

for (let rule of rules) {
  for (let step of rule) {
    step = [parseInt(step[0]), parseInt(step[1])]
    if (xmin > step[0]) xmin = step[0]
    if (xmax < step[0]) xmax = step[0]
    if (ymin > step[1]) ymin = step[1]
    if (ymax < step[1]) ymax = step[1]
  }
}
ymax += 1

let grid = Array()
for (let y = 0; y <= ymax - ymin; y++) {
  grid.push(Array())
  for (let x = 0; x <= xmax - xmin; x++) {
    grid[y].push('.')
  }
}

for (let rule of rules) {
  for (let i = 1; i < rule.length; i++) {
    let first = [parseInt(rule[i - 1][0]), parseInt(rule[i - 1][1])]
    let second = [parseInt(rule[i][0]), parseInt(rule[i][1])]
    if (first[0] === second[0]) {
      // move vertical
      if (second[1] > first[1]) {
        for (let k = first[1]; k <= second[1]; k++) {
          grid[k][first[0] - xmin] = '#'
        }
      } else {
        for (let k = second[1]; k <= first[1]; k++) {
          grid[k][first[0] - xmin] = '#'
        }
      }
    }
    if (first[1] === second[1]) {
      // move horizontal
      if (second[0] > first[0]) {
        for (let k = first[0]; k <= second[0]; k++) {
          grid[first[1]][k - xmin] = '#'
        }
      } else {
        for (let k = second[0]; k <= first[0]; k++) {
          grid[first[1]][k - xmin] = '#'
        }
      }
    }
  }
}

let xstart = 500 - xmin
let sum = 0
let sand = [xstart, 0]

while (true) {
  if (sand[0] === 0) {
    for (let x = 0; x < grid.length; x++) {
      grid[x].unshift('.')
    }
    sand[0] += 1
    xstart += 1
  }
  if (sand[0] + 1 === xmax - xmin) {
    for (let x = 0; x < grid.length; x++) {
      grid[x].push('.')
    }
  }

  if (sand[1] === ymax) {
    sum++
    grid[sand[1]][sand[0]] = 'o'
    sand = [xstart, 0]
  }

  if (grid[sand[1] + 1][sand[0]] === '.') {
    sand[1] += 1
  } else if (grid[sand[1] + 1][sand[0] - 1] === '.') {
    sand[0] -= 1
    sand[1] += 1
  } else if (grid[sand[1] + 1][sand[0] + 1] === '.') {
    sand[0] += 1
    sand[1] += 1
  } else {
    if (grid[sand[1]][sand[0]] == 'o') break
    sum++
    grid[sand[1]][sand[0]] = 'o'
    sand = [xstart, 0]
  }
}

console.log(sum)
