import React, { Component } from 'react';

// Components
import Welcome from './welcome.jsx';
import Header from '../layout/Header.jsx';
import ForecastMain from '../forecast/forecast-main.jsx';

// Utilities
import GooglePlacesApiUtil from "../../apiutil/google-places-api-util.js";
import weatherStore from "../../stores/weather-store.js";

// Material-UI Components
import LinearProgress from '@material-ui/core/LinearProgress';

class WeatherForecast extends Component {
  constructor (props) {
    super(props);

    this.state = {
      forecast: {},
      location: '',
      loading: false,
      welcome: true
    };

    this.onChange = this.onChange.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
  }

  componentDidMount() {
    weatherStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    weatherStore.removeChangeListener(this.onChange);
  }

  getCurrentPosition(e) {
    e.preventDefault();

    this.setState({loading: true});

    navigator.geolocation.getCurrentPosition( (position) => {
      GooglePlacesApiUtil.getLocation(position.coords.latitude, position.coords.longitude);
    });
  }

  onChange() {
    let successMsg = document.getElementById('forecast-success');

    successMsg.classList.remove('fade');

    setTimeout(() => successMsg.classList.add('fade'), 1500);

    this.setState({
      forecast: weatherStore.getForecast(),
      location: weatherStore.getLocation(),
      loading: false,
      welcome: false
    });
  }

  startLoading() {
    this.setState({loading: true});
  }

  render() {
    let welcomeOrForecast =
      this.state.welcome ? <Welcome getCurrentPosition={this.getCurrentPosition} loading={this.state.loading} /> : <ForecastMain forecast={this.state.forecast} />;

    let location = this.state.loading ? (
      <div>
        <span className="loading-location--text">Getting location</span>
        <LinearProgress />
      </div>
    ) : this.state.location;

    return (
      <div className="main-app">
        <Header
          location={location}
          getCurrentPosition={this.getCurrentPosition}
          startLoading={this.startLoading}
          loading={this.state.loading}
        />

        {welcomeOrForecast}
      </div>
    );
  }
}

export default WeatherForecast;
