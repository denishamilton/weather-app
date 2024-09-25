import React, { useState, useEffect } from "react";
import axios from "axios";

const HourlyWeatherApi = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для преобразования WMO кода в описание
  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: "Ясно",
      1: "Преимущественно ясно",
      2: "Переменная облачность",
      3: "Облачно",
      61: "Слабый дождь",
      63: "Дождь",
      80: "Местами ливни",
      // Добавь другие коды по необходимости
    };
    return weatherCodes[code] || "Неизвестные условия";
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=54.3233&longitude=10.1228&hourly=temperature_2m,weathercode"
        );
        setWeatherData(response.data.hourly);
        setLoading(false);
      } catch (error) {
        setError("Ошибка при загрузке данных");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Почасовая погода в Киле</h1>
      <ul>
        {weatherData.time.map((time, index) => (
          <li key={time}>
            <strong>
              {new Date(time).toLocaleString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
              :
            </strong>
            {` Температура: ${weatherData.temperature_2m[index]}°C, `}
            {`Погода: ${getWeatherDescription(weatherData.weathercode[index])}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyWeatherApi;
