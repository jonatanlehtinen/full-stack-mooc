import React from 'react'


const Total = ({ parts }) => {
  const total = parts.reduce( (s, p) => {
    return s.exercises ? s.exercises + p.exercises : s + p.exercises
  } )
  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

export default Total