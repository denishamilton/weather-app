// src/components/HourlyWeather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '2e1a00cb24acf4d45624e8dbc9f158cb'; // Вставьте сюда ваш ключ OpenWeather API
const CITY = 'Kiel';

const HourlyWeather3hours = () => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchHourlyWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`
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
      <h2>Hourly Forecast for {CITY}</h2>
      <ul>
        {forecast.list.slice(0, 5).map((hourData) => (
          <li key={hourData.dt}>
            <p>Time: {new Date(hourData.dt * 1000).toLocaleTimeString()}</p>
            <p>Temperature: {hourData.main.temp}°C</p>
            <p>Weather: {hourData.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyWeather3hours;
