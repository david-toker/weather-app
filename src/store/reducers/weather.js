import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cities: null,
    weatherOfCity: null,
    fiveDayWeather: null,
    loading: false,
    error: null,
    errorAutoComplete: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CITIES_AC_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_CITIES_AC_SUCCESS:
            return {
                ...state,
                cities: action.cities,
                loading: false
            };
        case actionTypes.FETCH_CITIES_AC_FAIL:
            return {
                ...state,
                loading: false,
                errorAutoComplete: true
            };
        case actionTypes.GET_CURRENT_WEATHER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_CURRENT_WEATHER_SUCCESS:
            return {
                ...state,
                weatherOfCity: action.weatherOfCity,
                loading: false
            };
        case actionTypes.GET_CURRENT_WEATHER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.GET_FIVE_DAY_WEATHER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_FIVE_DAY_WEATHER_SUCCESS:
            return {
                ...state,
                fiveDayWeather: action.weather,
                loading: false
            };
        case actionTypes.GET_FIVE_DAY_WEATHER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;