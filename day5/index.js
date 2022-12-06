const fs = require('fs')

const data = fs
  .readFileSync('data.txt', { encoding: 'utf-8', flag: 'r' })
  .split('\n\n')
  .map((ea) => ea.split('\n'))
data[0].pop()

const stacks = {}
for (let i = 0; i < 9; i++) {
  stacks[i] = ''
}

for (row of data[0]) {
  let i = 0
  while (i < row.length) {
    stacks[i / 4] += row[i + 1]
    i += 4
  }
}
for (s in stacks) {
  stacks[s] = stacks[s].trim().split('').reverse()
}

let moves = Array()
for (line of data[1]) {
  moves.push(line.split(' '))
}

const p1 = (stacks) => {
  for (mve of moves) {
    let num = mve[1]
    let frm = mve[3]
    let to = mve[5]

    while (num > 0) {
      let i = stacks[frm - 1].pop()
      stacks[to - 1].push(i)
      num -= 1
    }
  }
  let out = ''
  for (s in stacks) {
    out += stacks[s].at(-1)
  }
  console.log(out)
}

const p2 = (stacks) => {
  for (mve of moves) {
    let num = mve[1]
    let frm = mve[3]
    let to = mve[5]

    let i = stacks[frm - 1].slice(-num)
    stacks[to - 1] = stacks[to - 1].concat(i)
    stacks[frm - 1] = stacks[frm - 1].slice(0, -num)
  }
  let out = ''
  for (s in stacks) {
    out += stacks[s].at(-1)
  }
  console.log(out)
}

p1(structuredClone(stacks))
p2(structuredClone(stacks))
