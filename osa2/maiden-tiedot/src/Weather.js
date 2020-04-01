import React, {useState, useEffect} from 'react'

const Weather = ({ capital }) => {
  const [ weatherData, setWeatherData ] = useState('')

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    console.log(API_KEY)
    console.log(capital)
    let url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`
    fetch(url).then(response => {
      response.json().then(data => {
        setWeatherData(data.current)
      })
    })
  }, [capital])

  if (weatherData) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p><b>temperature: </b> {weatherData.temperature} celsius</p>
        <img src={weatherData.weather_icons[0]} alt="Weather icon" style={{height: '50px', width: '50px'}}/>
        <p><b>wind:</b> {weatherData.wind_speed} mph direction {weatherData.wind_dir}</p>
      </div>
    )
  } else return <div></div>

}

export default Weather