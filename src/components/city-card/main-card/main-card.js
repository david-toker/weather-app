import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const MainCard = (props) => {
    
    const classes = useStyles();
    let celsius = props.Temperature.Metric.Value;
    let fahrenheit = props.Temperature.Imperial.Value;
    const styleFollow = props.isFollowed ? {color: "#ff8080"} : {color: "#b3b3b3"};

    const newFavoriteCity = {
      keyCity: props.keyCity,
      city: props.city,
      country: props.country,
      description: props.WeatherText,
      celsius: props.Temperature.Metric.Value,
      fahrenheit: props.Temperature.Imperial.Value,
      img: props.WeatherIcon
    }

    return (
      <Grid item xs={12} sm={12} md={6}>
        <Card style={{backgroundImage: "linear-gradient(#3b57ca,#55a8d4)"}} className={classes.root}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {new Date(Date.parse(props.LocalObservationDateTime)).toDateString()}
            </Typography>
            <Typography variant="h5" component="h2">
                {props.city}, {props.country}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              UV Index:{props.UVIndex} {props.UVIndexText}
            </Typography>
            <Typography variant="body2" component="p">
                {props.units ? celsius : fahrenheit} 
                {props.units ? 'C' : 'F'}&deg;
                <br />
                {props.WeatherText}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={()=>props.actionWithFavorites(newFavoriteCity)} >
              { props.isFollowed ? 'Remove from favorires':'Add to Favorites' }
            </Button>
            <FavoriteIcon style={styleFollow} />
        </CardActions>
        </Card>
      </Grid>
    );
}

const mapStateToProps = state => {
    return {
        units: state.units.isMetric
    }
}


export default connect(mapStateToProps)(MainCard)