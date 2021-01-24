import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Card, CardActions, CardContent, Grid, Typography, IconButton, Tooltip, Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

import * as actions from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  image: {
    width: '75px',
    display: 'block',
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    textAlign: 'center',
  }
});

const FavoriteCityCard = (props) => {
    const classes = useStyles();

    useEffect(()=> {
      setTimeout(()=>{
          console.log('setTimeout', props.city);
          refreshWeather(parseInt(props.keyCity));
      }, 24*60*60*1000)
    })
  
    let imageLink = `images/weather/${props.img}-s.png`;
    let celsius = props.celsius;
    let fahrenheit = props.fahrenheit;
    let description = props.description;

    const refreshWeather = (key) => {
      props.onRefreshWeather(key);
    };

    const moreInfo = () => {
      props.onMoreInfo();
      props.onFetchCitiesAutocomlete(props.city, true)
    }
    
    
    return (
    <Grid item xs={12} sm={6} md={3}> 
      <Card>
          <img src={imageLink} alt={description} className={classes.image} />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.city}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.country}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { props.units ? celsius : fahrenheit }&deg;
            </Typography>
            <Typography variant="body2" component="p">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
          <Tooltip title="Refresh">
            <IconButton aria-label="refresh" onClick={()=>refreshWeather(parseInt(props.keyCity))} >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained"  component={RouterLink} to="/" onClick={moreInfo}>
            Info
          </Button>
          </CardActions>
      </Card>
      </Grid>
    )
}

const mapDispatchToProps = dispatch => {
  return {
      onRefreshWeather: (keyOfCity) => dispatch(actions.refreshWeather(keyOfCity)),
      onMoreInfo: () => dispatch(actions.getMoreInfoFromFavorites()),
      onFetchCitiesAutocomlete: (city, metric) => dispatch(actions.fetchCitiesAutocomlete(city, metric)),
  }
}

export default connect(null, mapDispatchToProps)(FavoriteCityCard)