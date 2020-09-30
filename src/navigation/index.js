import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROOTS} from './roots';
import LoginScreen from '../features/login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';

/**
 *@file We define project basic navigation in this file.
 *@todo To respect project structure try to seperate each navigator in a seperate file.
 *@property {NavigationContainer} - is the container that will wrap our app navigation.
 */

const initialStack = createStackNavigator();

function initialNavigation() {
  return (
    <initialStack.Navigator>
      <initialStack.Screen
        name={ROOTS.LOGINSCREEN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </initialStack.Navigator>
  );
}

export default function router() {
  return <NavigationContainer>{initialNavigation()}</NavigationContainer>;
}
