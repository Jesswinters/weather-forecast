import React, { Component } from 'react';
import ForecastIndex from '../forecast/forecast-index.jsx';

class ForecastMain extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="forecast-main">
        <ForecastIndex forecast={this.props.forecast} />
      </div>
    );
  }
}

export default ForecastMain;
