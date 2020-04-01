import React from 'react'


const Filter = ({ setFilter }) => {
  return (
    <div>
      filter shown with<input onChange={filter => setFilter(filter.target.value)}/>
    </div>
  )
}

export default Filter