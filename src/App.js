import CurrentWeather from './components/CurrentWeather';
import HourlyWeather from './components/HourlyWeather3hours';
import HourlyWeather3hours from './components/HourlyWeather';
import HourlyWeatherApi from './components/HourlyWeatherApi';
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Weather App for Kiel</h1>
      <CurrentWeather />
      <HourlyWeather3hours />
      <hr/>
      <HourlyWeather />
      <hr/>
      <div>HourlyWeatherApi</div>
      <HourlyWeatherApi />
    </div>
  );
}

export default App;
