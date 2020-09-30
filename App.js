import React from 'react';
import {Provider} from 'react-redux';
import Loader from './src/components/Loader';
import Navigation from './src/navigation/';
import store from './src/store';
/**
 * @version 1.0.0
 *@author  Ahlem jarrar <ahlem.jarrar@hotmail.com>
 *@author  Rahme chariaa <rahma.chariaa@proxym-it.com>
 *@file The entry point of this project.
 * @property {Provider} - We use React Redux's to inject the Redux store used in this project.
 *@property {Navigation} - Is the base navigation @see {@link https://reactnavigation.org/} for further information.
 *@property {Loader} - Is a generic loader injected into redux that can be use in any component.
 */

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Loader />
    </Provider>
  );
}

export default App;
