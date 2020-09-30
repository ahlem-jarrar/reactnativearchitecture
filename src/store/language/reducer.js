/**
 * @param  {} state=initialState
 * @param  {} action
 * @param  {} =>{if(action.type===UPDATE_LANGUAGE
 * @param  {} {return{...state
 * @param  {true};}if(action.type===UPDATE_LANGUAGE} loaderState
 */
import {UPDATE_LANGUAGE} from './types';

const initialState = {rtl: false};

export default (state = initialState, action) => {
  if (action.type === UPDATE_LANGUAGE) {
    return {...state, loaderState: true};
  }

  if (action.type === UPDATE_LANGUAGE) {
    return initialState;
  }

  return state;
};
