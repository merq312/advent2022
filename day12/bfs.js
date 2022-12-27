const { read, log, atoi } = require('../helper')

let start
let aPos = Array()
let trails = Array()

// Parse the grid into numerical values
let grid = read('data')
  .trim()
  .split('\n')
  .map((ea, i) =>
    ea.split('').map((ea, j) => {
      if (ea === 'E') {
        end = [i, j]
        return atoi('z')
      }
      // only push 'S' for p1
      if (ea === 'a' || ea === 'S') {
        aPos.push([i, j])
        return atoi('a')
      }
      return atoi(ea)
    })
  )

for (start of aPos) {
  // Vertex Table --> steps : [last vertex in path]
  let vertexTable = Array()
  // Visited vertices
  let visited = new Set()

  let rowMax = grid.length
  let colMax = grid[0].length

  visited.add(JSON.stringify(start))
  vertexTable.push([0, start])

  while (true) {
    // Get least recently visited vertex
    let currentVertex = vertexTable.shift()
    // No path to end vertex
    if (!currentVertex) break
    let [row, col] = [currentVertex[1][0], currentVertex[1][1]]
    let adjVertex = Array()
    let done = false

    for (i of [col - 1, col + 1])
      if (i >= 0 && i < colMax) adjVertex.push([row, i])
    for (i of [row - 1, row + 1])
      if (i >= 0 && i < rowMax) adjVertex.push([i, col])

    for (ea of adjVertex) {
      // Don't revisit vertex
      if (visited.has(JSON.stringify(ea))) continue

      // Can't take steps greater than 1 (stepping down is allowed)
      if (grid[ea[0]][ea[1]] - grid[row][col] > 1) continue

      // End vertex reached
      if (ea[0] == end[0] && ea[1] == end[1]) {
        done = true
        trails.push(currentVertex[0] + 1)
        break
      }

      visited.add(JSON.stringify(ea))
      vertexTable.push([currentVertex[0] + 1, ea])
    }
    if (done) break
  }
}

log(trails.sort((a, b) => a - b)[0])
