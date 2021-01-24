import * as actionTypes from '../actions/actionTypes';

const initialState = {
    refreshedWeather: null,
    loading_refresh: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REFRESH_WEATHER_START:
            return {
                ...state,
                loading_refresh: true
            };
        case actionTypes.REFRESH_WEATHER_SUCCESS:
            return {
                ...state,
                refreshedWeather: action.refreshedWeather,
                loading_refresh: false
            };
        case actionTypes.REFRESH_WEATHER_FAIL:
            return {
                ...state,
                loading_refresh: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;