import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UnitsButton from './units-button/units-button'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  
  const Link1 = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/" {...props} />
  ));
  const Link2 = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/favorites-page" {...props} />
  ));
const WeatherHeader = () => {
    const classes = useStyles();
    return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Weather
          </Typography>
          <UnitsButton/>
            <Button color="inherit"  component={Link1}>
                HOME
            </Button>
            <Button color="inherit"  component={Link2}>
              FAVORITES
            </Button>
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default WeatherHeader;