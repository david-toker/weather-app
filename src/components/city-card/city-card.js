import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Typography } from '@material-ui/core';

import SearchPannel from './search/search';
import MainCard from './main-card/main-card';
import DetailsCard from './details-card/details-card';
import FiveDayWeather from './five-day-weather/five-day-weather'

import * as actions from '../../store/actions';

class CityCard extends Component {
    constructor(props){
        super(props);
        this.state ={
            isFavorite: false
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.city!==prevProps.city){
            const { city } = this.props;
            const favoritesLocal = JSON.parse(localStorage.getItem('favorites_cities'));
            if(favoritesLocal && city) {
                const someFavorite = favoritesLocal.some(el=>el.city===city.LocalizedName);
                this.setState({
                    isFavorite: someFavorite
                });
            }
        }
    }

    onFollowHandler = (city) => {
        if(!this.state.isFavorite) {
            this.props.onAddedToFavorites(city);
            this.setState((state)=>{
                return {
                    isFavorite: !state.isFavorite
                }
            });
        } else {
            this.props.onRemoveFromFavorites(city);
            this.setState((state)=>{
                return {
                    isFavorite: !state.isFavorite
                }
            });
        }
        
    }

    render() {

        if(!this.props.city || !this.props.weatherOfCity) {
            return null
        }
        return (
            <Grid>
            <Grid>
                <Typography variant="h4" gutterBottom>
                Current Weather
                </Typography>
                <SearchPannel />
            </Grid>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}>
                
                <MainCard
                    city={this.props.city.LocalizedName}
                    country={this.props.city.Country.LocalizedName}
                    keyCity={this.props.city.Key}
                    {...this.props.weatherOfCity}
                    actionWithFavorites={this.onFollowHandler}
                    isFollowed={this.state.isFavorite}
                />
                <DetailsCard {...this.props.weatherOfCity} />
                
            </Grid>
            <Grid>
                <Typography variant="h4" gutterBottom>
                5 Day Weather
                </Typography>
            </Grid>
            
            <FiveDayWeather />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        city: state.weather.cities,
        loading: state.weather.loading,
        weatherOfCity: state.weather.weatherOfCity,
        fiveDayWeather: state.weather.fiveDayWeather,
        favorites: state.favorites.favorites,
        info: state.favorites.moreInfoAbout,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddedToFavorites: (city)=>dispatch(actions.addCityToFavorites(city)),
        onRemoveFromFavorites: (city)=>dispatch(actions.removeFromFavorites(city)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CityCard);
