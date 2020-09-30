
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import reduxLogger from 'redux-logger';
import {
  setLocale,
  loadTranslations,
  syncTranslationWithStore,
} from 'react-redux-i18n';

import ar from '../res/i18n/i18n_ar.json';
import en from '../res/i18n/i18n_en.json';

/**
 * @file Holds the complete state tree of your app. There should only be a single store in your app. @see {@link https://redux.js.org/api/createstore} for further informations.
 * @property  {composeEnhancers}  compose  A middleware which logs dispatched actions and the resulting new state.
 * @property  {thunk} middleWare  Allows simple asynchronous use of dispatch.
 * @property  {loadTranslations} - A fucntion from redux i18n to load all our app supported languages.
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleWare = [thunk];

// Add logger only for development
if (process.env.NODE_ENV !== 'production') {
  middleWare = [...middleWare, reduxLogger];
}

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleWare)),
);

syncTranslationWithStore(store);
store.dispatch(loadTranslations({en, ar}));
store.dispatch(setLocale('en'));

export default store;
