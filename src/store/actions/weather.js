import * as actionTypes from './actionTypes';
import axios from '../../axios-weather';

const apiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY;

export const fetchCollectionSuccess = (cities) => {
    return {
        type: actionTypes.FETCH_CITIES_AC_SUCCESS,
        cities: cities
    }
};

export const fetchCollectionFail = () => {
    return {
        type: actionTypes.FETCH_CITIES_AC_FAIL
    };
};

export const fetchCollectionStart = () => {
    return {
        type: actionTypes.FETCH_CITIES_AC_START
    };
};

export const fetchCitiesAutocomlete = (search, metric) => {
    return dispatch => {
        dispatch(fetchCollectionStart());
        axios.get(`/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${search}`)
            .then(res => {
                if(!res.data[0]){
                    dispatch(fetchCollectionFail());
                } else {
                    dispatch(fetchCollectionSuccess(res.data[0]));
                    dispatch(getCurrentWeather(res.data[0].Key));
                    dispatch(getFiveDayWeather(res.data[0].Key, metric));
                }
            })
            .catch(err => {
                dispatch(fetchCollectionFail());
            })
    }
}


export const fetchCitiesByGeoposition = (lat, lon, metric) => {
    return dispatch => {
        dispatch(fetchCollectionStart());
        axios.get(`/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`)
            .then(res => {
               dispatch(fetchCollectionSuccess(res.data));
               dispatch(getCurrentWeather(res.data.Key));
               dispatch(getFiveDayWeather(res.data.Key, metric));
            })
            .catch(err => {
                dispatch(fetchCollectionFail());
            })
    }
}

export const currentWeatherSuccess = (weatherOfCity) => {
    return {
        type: actionTypes.GET_CURRENT_WEATHER_SUCCESS,
        weatherOfCity: weatherOfCity
    }
};

export const currentWeatherFail = (error) => {
    return {
        type: actionTypes.GET_CURRENT_WEATHER_FAIL,
        error: error
    };
};

export const currentWeatherStart = () => {
    return {
        type: actionTypes.GET_CURRENT_WEATHER_START
    };
};

export const getCurrentWeather = (key) => {
    return dispatch => {
        dispatch(currentWeatherStart());
        axios.get(`/currentconditions/v1/${key}?apikey=${apiKey}&details=true`)
            .then(res => {
                dispatch(currentWeatherSuccess(res.data[0]));
            })
            .catch(err => {
                dispatch(currentWeatherFail(err));
            })
    }
}


export const fiveDayWeatherSuccess = (weather) => {
    return {
        type: actionTypes.GET_FIVE_DAY_WEATHER_SUCCESS,
        weather: weather
    }
};

export const fiveDayWeatherFail = (error) => {
    return {
        type: actionTypes.GET_FIVE_DAY_WEATHER_FAIL,
        error: error
    };
};

export const fiveDayWeatherStart = () => {
    return {
        type: actionTypes.GET_FIVE_DAY_WEATHER_START
    };
};

export const getFiveDayWeather = (key, metric) => {
    return dispatch => {
        dispatch(fiveDayWeatherStart());
        axios.get(`/forecasts/v1/daily/5day/${key}?apikey=${apiKey}&details=true&metric=${metric}`)
            .then(res => {
                dispatch(fiveDayWeatherSuccess(res.data.DailyForecasts));
            })
            .catch(err => {
                dispatch(fiveDayWeatherFail(err));
            })
    }
}