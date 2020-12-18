import { rows, columns } from './helpervariables.js'

const calculatePath = (startPoint, endPoint, barriers, paths) => {
  const pathsCopy = [...paths]
  let newPaths = []
  for (const path of pathsCopy) {
    const temporaryArrays = []
    const coordinate = path[path.length - 1]
    const coords = [[coordinate.y,coordinate.x - 1], [coordinate.y + 1,coordinate.x], [coordinate.y, coordinate.x + 1], [coordinate.y - 1,coordinate.x]]
    for (const xy of coords) {
      let isLegit = true
      const x = xy[1]
      const y = xy[0]
      if (!(y === coordinate.y && coordinate.x === x) && y >= 0 && x >= 0 && y < rows - 1 && x < columns - 1) {
        if (barriers) {
          for (const barrier of barriers) {
            if (barrier.x === x && barrier.y === y) isLegit = false
          }
        }
        if (y === endPoint.y && x === endPoint.x) return {path, finishPath: true}
        for (let i = 0; i < pathsCopy.length && isLegit; i++) {
          for (let k = 0; k < pathsCopy[i].length; k++) {
            if (pathsCopy[i][k].x === x && pathsCopy[i][k].y === y) {
              if (k <= (path.length + 1)) isLegit = false
            }
          }
        }
        for (let i = 0; i < newPaths.length && isLegit; i++) {
          for (let k = 0; k < newPaths[i].length; k++) {
            if (newPaths[i][k].x === x && newPaths[i][k].y === y) {
              if (k <= (newPaths[i].length)) isLegit = false
              else {
                newPaths.splice(i, 1)
                i--
              }
            }
          }
        }
        if (isLegit) temporaryArrays.push([...path, {y, x}])
      }
    }
    if (temporaryArrays.length > 0) newPaths.push(...temporaryArrays)
  }

  return {paths: newPaths, finishPath: false}
}
export const drawPath = (grid, startPoint, endPoint, barriers, paths) => {
  const myGrid = grid
  const newPaths = calculatePath(startPoint, endPoint, barriers, paths)
  if (!newPaths.finishPath) {
    for (const path of newPaths.paths) {
      for (const coordinate of path) {
        if (myGrid[coordinate.y][coordinate.x] === 0) myGrid[coordinate.y][coordinate.x] = 5 + path.length // value just sets the color on the tile
      }
    }
  }
  else {
    for (const coordinate of newPaths.path) {
      myGrid[coordinate.y][coordinate.x] = 4
    }
  }
  myGrid[startPoint.y][startPoint.x] = 1
  return {grid: myGrid, paths: newPaths.paths, isFinished: newPaths.finishPath}
}
