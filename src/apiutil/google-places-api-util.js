import $ from 'jquery';
import WeatherApiUtil from './weather-api-util.js';

class GooglePlacesApiUtil {
  getLocation (lat, lng, success) {
    const query = `latlng=${ lat },${ lng }`;
    const format = 'json';
    const apikey = 'key=AIzaSyBqdLAPb71C43fwP7wWqxzUzYaXynZ_LBA';
    const types = 'result_type=locality';
    const url = `https://maps.googleapis.com/maps/api/geocode/${ format }?${ query }&${ types }&${ apikey }`;

    $.get(url).done((data) => WeatherApiUtil.getForecastData(lat, lng, data.results.pop().formatted_address, success));
  }
}

export default new GooglePlacesApiUtil();
