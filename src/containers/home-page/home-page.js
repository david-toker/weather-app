import React, { Component } from 'react';
import { connect } from 'react-redux';

import CityCard from '../../components/city-card/city-card';

import * as actions from '../../store/actions';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            openModal: false
        }
    }

    componentDidMount() {
        if(!this.props.info){
            this.props.onFetchCitiesAutocomlete('tel aviv', this.props.units);
            let latitude = null;
            let longitude = null;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    latitude = position.coords.latitude;
                    longitude= position.coords.longitude;
                    this.props.onFetchCitiesByGeoposition(latitude, longitude, this.props.units);
                })
            }
        }
    }

    

    render() {

        return (
            <div>
                <CityCard/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        city: state.weather.city,
        loading: state.weather.loading,
        units: state.units.isMetric,
        info: state.favorites.moreInfoAbout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCitiesByGeoposition: (lat, lon, metric) => dispatch(actions.fetchCitiesByGeoposition(lat, lon, metric)),
        onFetchCitiesAutocomlete: (city, metric) => dispatch(actions.fetchCitiesAutocomlete(city, metric)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);