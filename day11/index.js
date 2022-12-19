const { read, log, range, enumerate, onlyInts } = require('../helper')

let input = read('data')
  .trim()
  .split('\n\n')
  .map((ea) => ea.split('\n').map((ea) => ea.trim()))

let monke = []
lcm = 1
for (i of input) {
  let m = {}
  m.items = onlyInts(i[1])
  m.op = i[2].split(' ').slice(-3)
  m.test = onlyInts(i[3])[0]
  m.ifTrue = onlyInts(i[4])[0]
  m.ifFalse = onlyInts(i[5])[0]
  m.inspections = 0
  lcm *= m.test
  monke.push(m)
}

for (_ of range(10000)) {
  for (m of monke) {
    for (item of m.items) {
      m.inspections += 1
      if (m.op[1] === '*')
        item =
          (m.op[0] === 'old' ? item : parseInt(m.op[0])) *
          (m.op[2] === 'old' ? item : parseInt(m.op[2]))
      if (m.op[1] === '+')
        item =
          (m.op[0] === 'old' ? item : parseInt(m.op[0])) +
          (m.op[2] === 'old' ? item : parseInt(m.op[2]))

      // item = Math.floor(item / 3) // p1
      item = item % lcm // p2

      if (item % m.test) {
        monke[m.ifFalse].items.push(item)
      } else {
        monke[m.ifTrue].items.push(item)
      }
    }
    m.items = []
  }
}

let monkeBusiness = Array()
for (m of monke) {
  monkeBusiness.push(m.inspections)
}

monkeBusiness.sort((a, b) => b - a)
log(monkeBusiness[0] * monkeBusiness[1])
