import React, { Component } from 'react';
import Search from "./search.jsx";

// Material-UI Components
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class NavBar extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="site-header">
        <div className="site-header--nav">
          <Button
            color="primary"
            variant="contained"
            disabled={this.props.loading}
            onClick={this.props.getCurrentPosition}
          >
            <Icon>my_location</Icon>
          </Button>

          <h2>{this.props.location}</h2>
        </div>

        <Search startLoading={this.props.startLoading} />

        <div id="forecast-success" className="alert alert-success fade">
          5-day forecast loaded
        </div>
      </div>
    );
  }
}

export default NavBar;
