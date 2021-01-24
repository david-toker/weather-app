import * as actionTypes from './actionTypes';
import axios from '../../axios-weather';

const apiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY;

export const fetchTopCitiesSuccess = cities => {
    return {
        type: actionTypes.FETCH_TOP_CITIES_SUCCESS,
        cities: cities
    }
};

export const fetchTopCitiesStart = () => {
    return {
        type: actionTypes.FETCH_TOP_CITIES_START
    }
};

export const fetchTopCitiesFail = (error) => {
    return {
        type: actionTypes.FETCH_TOP_CITIES_FAIL,
        error: error
    }
};

export const fetchTopCities = () => {
    return dispatch => {
        dispatch(fetchTopCitiesStart());
        axios.get(`/locations/v1/topcities/150?apikey=${apiKey}`)
            .then(res => {
                dispatch(fetchTopCitiesSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchTopCitiesFail(err))
            })
    }
}