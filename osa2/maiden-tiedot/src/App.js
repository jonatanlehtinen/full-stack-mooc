import React, {useState, useEffect} from 'react';
import Country from './Country';
import CountryRow from './CountryRow';
import Weather from './Weather';

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all').then(response => {
      response.json().then(data => {
        setCountries(data)
      })
    })
  }, [])

  const renderCountries = () => {
    if(searchText.length > 0) {
      const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchText.toLowerCase()))
      if(filteredCountries.length > 10) {
        return (
          <p>Too many matches, specify another filter</p>
        )
      } else if(filteredCountries.length === 1) {
        const country = filteredCountries[0]
        return (
          <div>
          <Country country={country}/>
          <Weather capital={country.capital}/>
          </div>
        )
      } else {
        return filteredCountries.map(country => {
           return (
            <CountryRow 
              key={country.numericCode}
              country={country}
              handleShow={country => setSearchText(country)}
            />
          )
      })
      }
  } else return
  }


  return (
    <div>
      find countries <input onChange={event => setSearchText(event.target.value)}/>
      {renderCountries()}
    </div>
  )
}

export default App;
