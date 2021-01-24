import React, { Component} from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import DailyCard from './daily-card/daily-card';

import * as actions from '../../../store/actions';

class FiveDayWeather extends Component {

  componentDidUpdate(prevProps) {
    if(this.props.units!==prevProps.units) {
      this.props.onGetFiveDayWeather(this.props.cityKey, this.props.units)
    }
  }

  render() {
    if(!this.props.forecastToFiveDay) {
      return null;
    }
    return (
      <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}>
        {this.props.forecastToFiveDay.map((day,idx)=><DailyCard key={idx} {...day} /> )}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    forecastToFiveDay: state.weather.fiveDayWeather,
    units: state.units.isMetric,
    cityKey: state.weather.cities.Key
  }
};

const mapDispatchToProps = dispatch => {
  return {
      onGetFiveDayWeather: (city, isMetric) => dispatch(actions.getFiveDayWeather(city, isMetric)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FiveDayWeather)