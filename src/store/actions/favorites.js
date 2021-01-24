import * as actionTypes from './actionTypes';

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

  const updateFavoriteCards = (arr, idx) => {
    return [
        ...arr.slice(0, idx),
        ...arr.slice(idx+1)
    ]
}

export const addCityToFavorites = (city) => {
    const persistedState = loadState();
    saveState(persistedState.concat(city));
    return {
        type: actionTypes.ADD_TO_FAVORITES,
        city: city
    };
};

export const removeFromFavorites = (removedCity) => {
    const persistedState = loadState();
    const itemIndex = persistedState.findIndex(({city}) => city === removedCity.city);
    saveState(updateFavoriteCards(persistedState, itemIndex));
    return {
        type: actionTypes.REMOVE_FROM_FAVORITES,
        city: removedCity
    };
};

export const getMoreInfoFromFavorites = () => {
  return {
      type: actionTypes.MORE_INFO_FROM_FAVORITES
  };
};

export const undoMoreInfoFromFavorites = () => {
  return {
      type: actionTypes.UNDO_INFO_FROM_FAVORITES
  };
};