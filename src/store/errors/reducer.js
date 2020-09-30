import {SET_ERROR, CLEAR_ERROR} from './types';

const initialState = {error: null, code: null};

export default (state = initialState, action) => {
  if (action.type === SET_ERROR) {
    return {...state, error: action.error, code: action.code};
  }

  if (action.type === CLEAR_ERROR) {
    return initialState;
  }

  return state;
};
