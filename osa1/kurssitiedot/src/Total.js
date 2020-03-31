import React from 'react'


const Total = props => {
  return (
    <p>Number of exercises {props.parts[0].exercices + props.parts[1].exercices + props.parts[2].exercices}</p>
  )
}

export default Total