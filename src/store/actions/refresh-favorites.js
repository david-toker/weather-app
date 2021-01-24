import * as actionTypes from './actionTypes';
import axios from '../../axios-weather';

const apiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY;

export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('favorites_cities');
      if (serializedState === null) {
        return [];
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }; 

  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('favorites_cities', serializedState);
    } catch {
      // ignore write errors
    }
  };


export const refreshWeatherSuccess = (refreshedWeather, key) => {
    const persistedState = loadState();
    let city = persistedState.find(city =>parseInt(city.keyCity)===key);
      city.celsius=refreshedWeather.Temperature.Metric.Value;
      city.fahrenheit=refreshedWeather.Temperature.Imperial.Value;
      city.img=refreshedWeather.WeatherIcon;
      city.description=refreshedWeather.WeatherText;
      saveState(persistedState);
    return {
        type: actionTypes.REFRESH_WEATHER_SUCCESS,
        refreshedWeather: refreshedWeather
    }
};

export const refreshWeatherFail = (error) => {
    return {
        type: actionTypes.REFRESH_WEATHER_FAIL,
        error: error
    };
};

export const refreshWeatherStart = () => {
    return {
        type: actionTypes.REFRESH_WEATHER_START
    };
};

export const refreshWeather = (key) => {
    return dispatch => {
        dispatch(refreshWeatherStart());
        axios.get(`/currentconditions/v1/${key}?apikey=${apiKey}&details=true`)
            .then(res => {
                dispatch(refreshWeatherSuccess(res.data[0], key));
            })
            .catch(err => {
                dispatch(refreshWeatherFail(err));
            })
    }
}