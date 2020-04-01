import React from 'react'


const Country = ({ country }) => {
  return (
    <div>
    <h2>{country.name}</h2>
    <p>capital {country.capital}</p>
    <p>populaton {country.population}</p>
    <h5>languages</h5>
    <ul>
    {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
    </ul>
    <img src={country.flag} alt={"Flag"} style={{height: '50px', width: '70px'}}></img>
  </div>
  )
}

export default Country