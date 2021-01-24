import * as actionTypes from '../actions/actionTypes';

const initialState = {
    topCities: null,
    loading: false,
    error: null
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TOP_CITIES_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_TOP_CITIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.FETCH_TOP_CITIES_SUCCESS:
            return {
                ...state,
                loading: false,
                topCities: action.cities
            };
        default:
            return state;
    }
};

export default reducer;
