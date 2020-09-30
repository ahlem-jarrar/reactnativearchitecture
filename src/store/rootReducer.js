import {combineReducers} from 'redux';
import authReducer from '../features/login/redcuer';
import loaderReducer from './loader/reducer';
import {i18nReducer} from 'react-redux-i18n';
/**
 * @file helper function turns an object whose values are different reducing functions into a single reducing function you can pass to. @see {@link https://redux.js.org/api/combinereducers}
 * @property  {authReducer}  auth -Reducer for authentication.
 * @property  {loaderReducer} loader -Reducer for the basic loader.
 * @property  {i18nReducer} i18n -Reducer from react-redux-i18n that we use for localization.
 */

export default combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  i18n: i18nReducer,
});
