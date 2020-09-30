
import {SET_CURRENT_USER, SET_LOADING_LOGIN} from './types';

const initialState = {
  currentUser: null,
  isFetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_LOGIN:
      return {
        ...state,
        isFetching: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default reducer;
