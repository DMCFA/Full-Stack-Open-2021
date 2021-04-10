import React, {useState, useEffect} from 'react'
import axios from 'axios'
const KEY = process.env.REACT_APP_API_KEY

const Weather = ({capital}) => {

    const [weather, setWeather] = useState('')

    useEffect(() => {
        axios
        .post(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${KEY}`)
        .then(res =>
            setWeather(res.data))
        .catch(err =>
            console.log(err))
    },[capital])

    if (weather) {
        return (
            <div>
            <h2>Weather in {weather.name}</h2>
            <p><strong>temperature</strong> {weather.main.temp}</p>
            <p><i>No image provided from the API</i></p>
            <p><strong>wind </strong>{weather.wind.speed}mph direction {weather.wind.deg} degrees</p>
            </div>
        )
    } else {
        return(
        <p>loading</p>
        )}
}

export default Weather