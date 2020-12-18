import React, { useState } from 'react';
import styled from 'styled-components';
import {gridWidth,gridHeight,rows,columns,colors} from '../assets/helpervariables.js'

const boxStyle = (value) => {
  const colors = ['white', 'orange', 'green ', 'black', 'rgb(137, 209, 254)', 'rgba(255,0,0,0.5)']
  return {
    cursor: 'pointer',
    backgroundColor: value < 6 ? colors[value] : `rgba(255,0,0,${0.5 + value*0.01})`,
    width: `${gridWidth/columns}px`,
    height: `${gridHeight/rows}px`,
    border: '1px solid #504E4E',
    padding: 0,
    margin: 0
  }
}
const Box = ({ value, onClick, isMouseDown, switchMouseDown }) => {
  return (
    <div style={boxStyle(value)}
    onMouseOver={() => {
      if (isMouseDown) onClick()
    }}
    onMouseDown={() => {
      onClick()
      switchMouseDown()
    }}
    onMouseUp={() => switchMouseDown()}/>
  )
}
const Grid = ({ gridArray, onClick, switchMouseDown, isMouseDown }) => {
  return (
    <div style={{
      //makes the squares be in a grid
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, ${gridWidth/columns}px)`
    }}
    >
    {gridArray.map((rows, y) =>
        rows.map((columns, x) =>{
        return(<Box key={`${y},${x}`} value={gridArray[y][x]} switchMouseDown={switchMouseDown} isMouseDown={isMouseDown} onClick={() => onClick(y,x)}
        />)
        })
    )}
  </div>
  )
}

export default Grid