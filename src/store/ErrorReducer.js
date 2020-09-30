import * as types from '../actions/ErrorActionTypes';

const initialState = {};

export default (state = initialState, action) => {
  if (action.type === types.RESPONSE_ERROR) {
    console.log('RESPONSE_ERROR');
    return {...state, ...action.error};
  }

  if (action.type === types.CLEAR_ERROR) {
    return initialState;
  }

  return state;
};
