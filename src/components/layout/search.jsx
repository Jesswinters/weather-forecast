import React, { Component } from 'react';
import WeatherApiUtil from "../../apiutil/weather-api-util.js";

// Material-UI Components
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

class Search extends Component {
  constructor (props) {
    super(props);

    this.state = {
      error: false,
      errMsg: null
    };

    this.addAutocompleteListener = this.addAutocompleteListener.bind(this);
    this.handleSearchSubmission = this.handleSearchSubmission.bind(this);
    this.handleSearchError = this.handleSearchError.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {
      types: ['(cities)']
    });

    this.addAutocompleteListener(this.autocomplete);
  }

  componentWillUnmount() {
    google.maps.event.removeListener(this.autocompleteListener);
  }

  addAutocompleteListener(autocomplete) {
    this.autocompleteListener = google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const getPlace = new Promise((resolve, reject) => {
        const place = autocomplete.getPlace();

        if (typeof place !== 'undefined' && place.geometry) {
          resolve(place);
        } else {
          reject('Please select a city');
        }
      });

      getPlace.then(
        (result) => this.handleSearchSubmission(result),
        (err) => this.handleSearchError(err)
      );
    });
  }

  handleSearchSubmission(result) {
    this.props.startLoading();

    const location = result.formatted_address;
    const lat = result.geometry.location.lat();
    const lng = result.geometry.location.lng();

    WeatherApiUtil.getForecastData(lat, lng, location);
  }

  handleSearchError(err) {
    this.setState({
      error: true,
      errMsg: err
    });
  }

  removeError() {
    if (this.state.error) {
      this.setState({
        error: false,
        errMsg: null
      });
    }
  }

  render() {
    let errMsg;

    if (this.state.error) {
      errMsg = (
        <div className="search-error alert alert-danger" role="alert">
          {this.state.errMsg}
        </div>
      );
    }

    return (
      <div className="search-bar">
        <Grid container alignItems="flex-end">
          <Grid item>
            <Icon>search</Icon>
          </Grid>
          <Grid item>
            <TextField
              id="autocomplete"
              label="Search for location"
              color="primary"
              onFocus={this.removeError}
              onChange={this.removeError}
              onBlur={this.removeError}
            />
          </Grid>
        </Grid>

        {errMsg}
      </div>
    );
  }
}

export default Search;
