import React from 'react'


const CountryRow = ({ country, handleShow }) => {
  return (
    <div>
      {country.name}<button onClick={() => handleShow(country.name)}>show</button>
  </div>
  )
}

export default CountryRow