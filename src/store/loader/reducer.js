import {SHOW_LOADER, HIDE_LOADER} from './types';

const initialState = {loaderState: false};

export default (state = initialState, action) => {
  if (action.type === SHOW_LOADER) {
    return {...state, loaderState: true};
  }

  if (action.type === HIDE_LOADER) {
    return initialState;
  }

  return state;
};
