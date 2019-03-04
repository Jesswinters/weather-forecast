import $ from 'jquery';
import WeatherActions from '../actions/weather-actions.js';

class WeatherApiUtil {
  getForecastData (lat, lng, location) {
    const receiveWeatherData = (data) => WeatherActions.receiveWeatherData(data.list, location);

    const query = `forecast?lat=${ lat }&lon=${ lng }`;
    const apikey = 'appid=421c722b37120c0dd1213cb14c1aa155';
    const units = 'units=metric';
    const url = `https://api.openweathermap.org/data/2.5/${ query }&${ apikey }&${ units }`;

    $.get(url).done(receiveWeatherData);
  }
}

export default new WeatherApiUtil();
