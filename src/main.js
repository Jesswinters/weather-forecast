import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';

// Components
import WeatherForecast from './components/main/weather-forecast.jsx';

$(document).ready(() => {
  render(<WeatherForecast />, document.getElementById('content'));
});
