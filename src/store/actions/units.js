import * as actionTypes from './actionTypes';

export const setCelsius = () => {
    return {
        type: actionTypes.SET_CELSIUS
    };
};

export const setFahrenheit = () => {
    return {
        type: actionTypes.SET_FAHRENHEIT
    };
};