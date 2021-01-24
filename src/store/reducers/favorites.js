import * as actionTypes from '../actions/actionTypes';

const initialState = {
    favorites: [],
    moreInfoAbout: false
};

const updateFavoriteCards = (arr, idx) => {
    return [
        ...arr.slice(0, idx),
        ...arr.slice(idx+1)
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: state.favorites.concat(action.city)
            };
        case actionTypes.REMOVE_FROM_FAVORITES:
            const itemIndex = state.favorites.findIndex(({city}) => city === action.city.city);
            ;
            return {
                ...state,
                favorites: updateFavoriteCards(state.favorites, itemIndex)
            };
        case actionTypes.MORE_INFO_FROM_FAVORITES:
            return {
                ...state,
                moreInfoAbout: true
            };
        case actionTypes.UNDO_INFO_FROM_FAVORITES:
            return {
                ...state,
                moreInfoAbout: false
            };
        default:
            return state;
    }
};

export default reducer;