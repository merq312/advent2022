const { read, log, range, enumerate } = require('../helper')

let grid = read('data')
  .trim()
  .split('\n')
  .map((ea) => ea.split('').map((ea) => parseInt(ea)))

let visible = 0
for ([i, line] of enumerate(grid)) {
  i = parseInt(i)
  for ([j, ea] of enumerate(line)) {
    j = parseInt(j)
    if (i === 0 || j === 0 || j === line.length - 1 || i === grid.length - 1) {
      visible += 1
    } else {
      let isVisible = true
      for (up of range(0, i)) {
        if (ea <= grid[up][j]) {
          isVisible = false
        }
      }
      if (isVisible) {
        visible += 1
        continue
      }
      isVisible = true
      for (down of range(grid.length - 1, i, -1)) {
        if (ea <= grid[down][j]) {
          isVisible = false
        }
      }
      if (isVisible) {
        visible += 1
        continue
      }
      isVisible = true
      for (left of range(0, j)) {
        if (ea <= grid[i][left]) {
          isVisible = false
        }
      }
      if (isVisible) {
        visible += 1
        continue
      }
      isVisible = true
      for (right of range(line.length - 1, j, -1)) {
        if (ea <= grid[i][right]) {
          isVisible = false
        }
      }
      if (isVisible) {
        visible += 1
      }
    }
  }
}

log(visible)

let scores = Array()
for ([i, line] of enumerate(grid)) {
  i = parseInt(i)
  for ([j, ea] of enumerate(line)) {
    j = parseInt(j)
    if (i === 0 || j === 0 || j === line.length - 1 || i === grid.length - 1) {
      continue
    } else {
      let l = 0,
        r = 0,
        u = 0,
        d = 0
      for (up of range(i - 1, -1, -1)) {
        u += 1
        if (ea <= grid[up][j]) break
      }
      for (down of range(i + 1, grid.length)) {
        d += 1
        if (ea <= grid[down][j]) break
      }
      for (left of range(j - 1, -1, -1)) {
        l += 1
        if (ea <= grid[i][left]) break
      }
      for (right of range(j + 1, line.length)) {
        r += 1
        if (ea <= grid[i][right]) break
      }
      scores.push(l * r * u * d)
    }
  }
}

scores.sort((a, b) => {
  return b - a
})
log(scores[0])
