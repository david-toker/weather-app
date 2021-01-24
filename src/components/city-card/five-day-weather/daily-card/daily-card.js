import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
    color: 'white'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    width: '45px',
  },
});

const DaillyCard = (props) => {
    let imageLinkDay = `images/weather/${props.Day.Icon}-s.png`;
    let imageLinkNight = `images/weather/${props.Night.Icon}-s.png`;
    const classes = useStyles();
    return (
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <Card style={{backgroundImage: "linear-gradient(#3b4357,#5b6d87)"}} className={classes.root}>
        <CardContent>
            <Typography className={classes.title} gutterBottom>
                {moment(props.Date).format('MMM D')}
            </Typography>
            <Typography variant="h5" component="h2">
              {moment(props.Date).format('dddd')}
            </Typography>
            <Typography className={classes.pos}>
              {props.Temperature.Maximum.Value}&deg;/{props.Temperature.Minimum.Value}&deg;
            </Typography>
            <Typography variant="body2" component="p">
                Precip
                <br />
                {props.Day.PrecipitationProbability}%
            </Typography>
        </CardContent>
        <img src={imageLinkDay} alt={props.Day.IconPhrase} className={classes.image} />
        <span style={{fontSize: '40px'}}>/</span>
        <img src={imageLinkNight} alt={props.Night.IconPhrase} className={classes.image} />
        </Card>
      </Grid>
    );
}

const mapStateToProps = state => {
    return {
        units: state.units.isMetric
    }
}


export default connect(mapStateToProps)(DaillyCard)