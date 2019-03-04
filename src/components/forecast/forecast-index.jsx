import React, { Component } from 'react';
import ForecastIndexItem from './forecast-index-item.jsx';
import {separateForecastByDay, consolidateToDailyForecast} from '../../utilities/forecast.js';
import weatherCompLookup from '../../utilities/weather-lookup.jsx';

class ForecastIndex extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const forecastSplitByDay = separateForecastByDay(this.props.forecast);

    const forecastIndexItems = forecastSplitByDay.map((forecast, idx) => {
      if (forecast.forecast.length === 0) {
        return;
      }

      let consolidatedForecast = consolidateToDailyForecast(forecast);

      return (
        <ForecastIndexItem
          key={idx}
          forecast={consolidatedForecast}
          iconLookup={weatherCompLookup}
        />
      );
    });

    return (
      <div className="forecast-index--container">
        {forecastIndexItems}
      </div>
    );
  }
}

export default ForecastIndex;
