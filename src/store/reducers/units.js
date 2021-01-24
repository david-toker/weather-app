import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isMetric: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CELSIUS:
            return {
                ...state,
                isMetric: true
            };
        case actionTypes.SET_FAHRENHEIT:
            return {
                ...state,
                isMetric: false
            };
        default:
            return state;
    }
};

export default reducer;