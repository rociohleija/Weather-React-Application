import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';
import WeatherForecast from './WeatherForecast';
import axios from 'axios';
import './Weather.css';



export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon:  response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }


  function search() { 
    const apiKey = "82d232f689d92fca314b1eb07a4d627c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    console.log(apiUrl);
    axios.get(apiUrl).then(handleResponse); 

  }

    if (weatherData.ready) {
    return (
      <div className="Weather">
        <WeatherInfo data={weatherData} />
        <div className="md">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                autoFocus="on"
                className="form-control shadow-sm text-body"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="form-control btn btn-primary shadow-sm w-100"
              />
            </div>
          </div>
        </form>
        </div>
        <span className="line mt-3 mb-3"></span>
        <WeatherForecast coordinates={weatherData.coordinates} />
      </div>
    );

   } else {
    search();
    return "Loading...";
   }
  }