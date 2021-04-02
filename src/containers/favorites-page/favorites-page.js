import React from 'react';
import { connect } from 'react-redux';

import { Container, Grid } from '@material-ui/core';

import FavoriteCityCard from '../../components/favorite-city-card/favorite-city-card';


const FavoritesPage = (props) => {
    let favoritesLocal = JSON.parse(localStorage.getItem('favorites_cities'));

    const favoriteList = favoritesLocal ? (
      favoritesLocal.map((city) => (
        <FavoriteCityCard key={city.keyCity} {...city} units={props.units} />
      ))
    ) : (
      <h1>nothing added yet</h1>
    );
    
    return (
        <div>
            <Container>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}>
                    {favoriteList}
                </Grid>  
            </Container>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        favorites: state.favorites.favorites,
        units: state.units.isMetric,
        refreshedWeather: state.refresh.refreshedWeather
    };
}

export default connect(
    mapStateToProps,
    null
)(FavoritesPage);
