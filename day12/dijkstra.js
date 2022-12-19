const { read, log, range, atoi } = require('../helper')

let end
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
        return 27
      }
      // only push 'S' for p1
      if (ea === 'a' || ea === 'S') {
        aPos.push([i, j])
        return atoi('a') + 1
      }
      return atoi(ea) + 1
    })
  )

for (start of aPos) {
  // Vertex Table --> [grid x,y] : [cumulative risk, last vertex in path]
  let vertexTable = {}
  // Visited vertices
  let visited = new Set()
  // Unvisited vertices with a path
  let unvisited = new Set()

  let rowMax = grid.length
  let colMax = grid[0].length

  for (row of range(rowMax))
    for (col of range(colMax))
      vertexTable[JSON.stringify([row, col])] = [null, null]

  visited.add(JSON.stringify(start))
  vertexTable[JSON.stringify(start)][0] = grid[start[0]][start[1]]
  let currentVertex = start

  while (true) {
    let row = currentVertex[0]
    let col = currentVertex[1]
    let adjVertex = Array()

    for (i of [col - 1, col + 1])
      if (i >= 0 && i < colMax) adjVertex.push([row, i])
    for (i of [row - 1, row + 1])
      if (i >= 0 && i < rowMax) adjVertex.push([i, col])

    for (ea of adjVertex) {
      let risk = vertexTable[JSON.stringify([row, col])][0] + grid[ea[0]][ea[1]]
      let knownMinRisk = vertexTable[JSON.stringify(ea)][0]
      let stepSize = grid[ea[0]][ea[1]] - grid[row][col]

      // Only step up if step size is smaller than 2, stepping down (step < 0) is allowed
      if ((!knownMinRisk || risk < knownMinRisk) && stepSize < 2) {
        // set cumulative risk
        vertexTable[JSON.stringify(ea)][0] = risk
        // set previous vertex
        vertexTable[JSON.stringify(ea)][1] = [row, col]
        unvisited.add(JSON.stringify(ea))
      }
    }

    let nearestUnvisited = null
    let nearestUnvisitedRisk = null

    for (ea of unvisited) {
      let vertex = vertexTable[ea]
      if (!visited.has(JSON.stringify(ea)) && vertex[0] !== null) {
        if (!nearestUnvisitedRisk || vertex[0] < nearestUnvisitedRisk) {
          nearestUnvisited = ea
          nearestUnvisitedRisk = vertex[0]
        }
      }
    }

    visited.add(nearestUnvisited)
    unvisited.delete(nearestUnvisited)
    currentVertex = JSON.parse(nearestUnvisited)

    // All vertices visited
    if (visited.size === colMax * rowMax) break
    // Not all vertices visited; however, remaining vertices have no valid path
    if (!nearestUnvisited) break
  }

  let steps = 0
  let cur = end
  // Trace path back from end position to get number of steps
  while (true) {
    steps += 1
    // Break if no path from end to start
    if (!vertexTable[JSON.stringify(cur)][1]) break
    cur = vertexTable[JSON.stringify(cur)][1]
    if (JSON.stringify(cur) === JSON.stringify(start)) {
      trails.push(steps)
      break
    }
  }
}

log(trails.sort((a, b) => a - b)[0])
