import React, { Component } from 'react';

// Material-UI Components
import Button from '@material-ui/core/Button';

class Welcome extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="site-content">
        <h1>Current 5-day Weather Forecast</h1>
        <p>To get started, search for a city or click the button above to get your current location's weather. Or click here:</p>

        <Button color="primary" variant="contained" disabled={this.props.loading} onClick={this.props.getCurrentPosition}>
          Get the weather!
        </Button>
      </div>
    );
  }
}

export default Welcome;
