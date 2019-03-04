import React, { Component } from 'react';

// Material-UI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class ForecastIndexItem extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const high = `High: ${this.props.forecast.high} °C`;
    const low = `Low: ${this.props.forecast.low} °C`;
    const humidity = `Humidity: ${this.props.forecast.humidity}%`;
    const day = this.props.forecast.date.toDateString().split(' ')[0];
    const date = this.props.forecast.date.toDateString().split(' ').slice(1).join(' ');
    const mainWeather = this.props.forecast.main;

    return (
      <div className="forecast-index">
        <Card className="forecast-index--card">
          <CardContent>
            <h2 className="forecast-index--name">
              {day}, {date}
            </h2>
            <div className="weather-icon--container">
              {this.props.iconLookup[mainWeather]}
            </div>

            <div className="weather-info--container">
              <h4 className="weather-info--item">{mainWeather}</h4>
              <span className="weather-info--item">{high}</span>
              <span className="weather-info--item">{low}</span>
              <span className="weather-info--item">{humidity}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default ForecastIndexItem;
