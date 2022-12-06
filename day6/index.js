const { read, log, range } = require('../helper')

let a = read('data').trim().split('')

for (i of range(a.length)) {
  let s = new Set()
  for (j of range(4)) {
    s.add(a[i + j])
  }
  if (s.size === 4) {
    log(i + 4)
    break
  }
}

for (i of range(a.length)) {
  let s = new Set()
  for (j of range(14)) {
    s.add(a[i + j])
  }
  if (s.size === 14) {
    log(i + 14)
    break
  }
}
