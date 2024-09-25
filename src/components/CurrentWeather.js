// src/components/CurrentWeather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '2e1a00cb24acf4d45624e8dbc9f158cb'; // Вставьте сюда ваш ключ OpenWeather API
const CITY = 'Kiel';

const CurrentWeather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) {
    return <div>Loading current weather...</div>;
  }

  return (
    <div>
      <h2>Current Weather in {CITY}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Weather: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default CurrentWeather;