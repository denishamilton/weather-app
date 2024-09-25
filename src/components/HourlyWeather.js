// src/components/HourlyWeather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '2e1a00cb24acf4d45624e8dbc9f158cb'; // Вставьте сюда ваш ключ OpenWeather API
const LATITUDE = '54.3233';
const LONGITUDE = '10.1228';

const HourlyWeather = () => {
  const [forecast, setForecast] = useState(null);

  // https://api.openweathermap.org/data/2.5/onecall?lat=54.3233&lon=10.1228&exclude=current,minutely,daily,alerts&appid=2e1a00cb24acf4d45624e8dbc9f158cb&units=metric

  useEffect(() => {
    const fetchHourlyWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${LATITUDE}&lon=${LONGITUDE}&exclude=current,minutely,daily,alerts&appid=${API_KEY}&units=metric`
        );
        setForecast(response.data);
      } catch (error) {
        console.error("Error fetching hourly weather data: ", error);
      }
    };

    fetchHourlyWeather();
  }, []);

  if (!forecast) {
    return <div>Loading hourly forecast...</div>;
  }

  return (
    <div>
      <h2>Hourly Forecast for Kiel</h2>
      <ul>
        {forecast.hourly.slice(0, 12).map((hourData, index) => (
          <li key={index}>
            <p>Time: {new Date(hourData.dt * 1000).toLocaleTimeString()}</p>
            <p>Temperature: {hourData.temp}°C</p>
            <p>Weather: {hourData.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyWeather;
