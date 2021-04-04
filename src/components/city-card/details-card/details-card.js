import React from 'react';
import { connect } from 'react-redux';


import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Divider, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
}));

const DetailsCard = (props) => {
    const classes = useStyles();

    let metricWinds = props.Wind.Speed.Metric.Value;
    let imperialWinds = props.Wind.Speed.Imperial.Value;

    let metricDewPoint = props.DewPoint.Metric.Value;
    let imperialDewPoint = props.DewPoint.Imperial.Value;

    let metricPressure = props.Pressure.Metric.Value;
    let imperialPressure = props.Pressure.Imperial.Value;

    let metricVisibility = props.Visibility.Metric.Value;
    let imperialVisibility = props.Visibility.Imperial.Value;

  return (
    <Grid item xs={12} sm={12} md={6}>
      <List
        className={classes.root}
        style={{ backgroundImage: "linear-gradient(#3b57ca,#55a8d4)" }}
      >
        <ListItem>
          <ListItemText primary="Wind" />
        </ListItem>
        <li>
          <Typography
            className={classes.dividerFullWidth}
            color="textSecondary"
            display="block"
            variant="body2"
          >
            {props.Wind.Direction.English}{' '}
            {props.units ? metricWinds : imperialWinds}{' '}
            {props.units ? ' km/h' : ' mph'}
          </Typography>
        </li>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Humidity" />
        </ListItem>
        <li>
          <Typography
            className={classes.dividerFullWidth}
            color="textSecondary"
            display="block"
            variant="body2"
          >
            {props.RelativeHumidity}%
          </Typography>
        </li>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Dew Point" />
        </ListItem>
        <li>
          <Typography
            className={classes.dividerFullWidth}
            color="textSecondary"
            display="block"
            variant="body2"
          >
            {props.units ? metricDewPoint : imperialDewPoint}&deg;
          </Typography>
        </li>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Pressure" />
        </ListItem>
        <li>
          <Typography
            className={classes.dividerFullWidth}
            color="textSecondary"
            display="block"
            variant="body2"
          >
            {props.units ? metricPressure : imperialPressure}
            {props.units ? " mb" : " in"}
          </Typography>
        </li>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Visibility" />
        </ListItem>
        <li>
          <Typography
            className={classes.dividerFullWidth}
            color="textSecondary"
            display="block"
            variant="body2"
            component="p"
          >
            {props.units ? metricVisibility : imperialVisibility}
            {props.units ? " km" : " mi"}
          </Typography>
        </li>
      </List>
    </Grid>
  );
}

const mapStateToProps = state => {
    return {
        units: state.units.isMetric
    }
}



export default connect(mapStateToProps)(DetailsCard)
