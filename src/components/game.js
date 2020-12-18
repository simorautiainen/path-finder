import React, { useState, useEffect } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import ButtonBar from './buttonbar.js'
import Grid from './grid.js'
import { columns, rows,gridWidth, statuses } from '../assets/helpervariables.js'
import { drawPath } from '../assets/pathCalculation.js'

const Game = () => {
  const [grid, setGrid] = useState(Array.from(Array(rows), () =>
      new Array(columns).fill(0)))
  const [status, setStatus] = useState(statuses.STARTPOINT)
  const [startPoint, setStartPoint] = useState(null)
  const [endPoint, setEndPoint] = useState(null)
  const [barriers, setBarriers] = useState([])
  const [paths, setPaths] = useState(null)
  const [ended, setEnded] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)

  useEffect(() => {
    if (!startPoint) setStatus(statuses.STARTPOINT)
    else if (!endPoint) setStatus(statuses.ENDPOINT)
    else setStatus(statuses.BARRIERS)
  }, [startPoint, endPoint])


  const handleClick = (y,x) => {
    const newGrid = [...grid]
    if (startPoint && startPoint.x === x && startPoint.y === y) {
      setStartPoint(null)
      newGrid[y][x] = 0
    } else if (endPoint && endPoint.x === x && endPoint.y === y) {
      setEndPoint(null)
      newGrid[y][x] = 0
    }
    else if (!startPoint) {
      setStartPoint({ y, x })
      newGrid[y][x] = 1
    }
    else if (!endPoint) {
      setEndPoint({ y, x })
      newGrid[y][x] = 2
    } else {
      let barriersCopy = [...barriers]
      let isChanged = false
      for (let i = 0; i < barriers.length; i++) {
        if (barriers[i].y === y && barriers[i].x === x) {
          barriersCopy.splice(i, 1)
          isChanged = true
        }
      }
      if(!isChanged) setBarriers([...barriers, {y,x}])
      else setBarriers(barriersCopy)
      newGrid[y][x] === 0 ? newGrid[y][x] = 3 : newGrid[y][x] = 0
    }
    setGrid(newGrid)
  }
  const calculateNextBlocks = () => {
    if (ended) return true
    const copy = [...grid]
    const newPathes = drawPath(copy, startPoint, endPoint, barriers, paths || [[startPoint]])
    setGrid(newPathes.grid)
    if (newPathes.isFinished === true) setEnded(true)
    setPaths(newPathes.paths)
    return false
  }
  

  const clearGrid = () => {
    setStartPoint(null)
    setEndPoint(null)
    setBarriers([])
    const clearedGrid = Array.from(Array(rows), () =>
    new Array(columns).fill(0))
    setGrid(clearedGrid)
    setPaths(null)
    setEnded(false)
  }
  return(
    <Container className="justify-content-md-center" style={{width: gridWidth, marginTop: "1vh",fontFamily: "Inconsolata", fontWeight: "900"}}>
      <ButtonBar
      nextGeneration={() => calculateNextBlocks()}
      clearGrid={() => clearGrid()}
      status={ status }
      />
      <Row>
        <Col>
          <Grid gridArray={grid} switchMouseDown={() => setIsMouseDown(!isMouseDown)} isMouseDown={isMouseDown} onClick={(y,x) => handleClick(y,x)}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Game

