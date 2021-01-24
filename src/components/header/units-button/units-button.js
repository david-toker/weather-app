import React from 'react';
import { connect } from 'react-redux';
import { Button, Menu, MenuItem } from '@material-ui/core';

import * as actions from '../../../store/actions';

const UnitsMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setFahrenheit = () => {
    props.onSetFahrenheit();
    setAnchorEl(null);
  };

  const setCelsius = () => {
    props.onSetCelsius();
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Units:{props.units ? 'Metric (C' : 'Imperial (F'}&deg;)
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={setCelsius}>Metric &deg;C</MenuItem>
        <MenuItem onClick={setFahrenheit}>Imperial &deg;F</MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        units: state.units.isMetric
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetCelsius: () => dispatch(actions.setCelsius()),
        onSetFahrenheit: () => dispatch(actions.setFahrenheit()),
     }
}


export default connect(mapStateToProps, mapDispatchToProps)(UnitsMenu)