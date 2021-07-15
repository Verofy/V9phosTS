import React from 'react';
import { styles, navigationStyles } from './src/styles/styles';
import { Image, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { Provider } from 'react-redux'
import { store } from './src/redux'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { LoginScreen } from './src/screens/LoginScreen';


const switchNavigator = createSwitchNavigator({

  landingStack: {
    screen: createStackNavigator({
      LoginScreen: LoginScreen,
      //HomePage:HomeScreen
    }, {
      defaultNavigationOptions: {
        headerShown: false
      }
    }),

  },

  HomeStack: createBottomTabNavigator({
    Home: {
      screen: createStackNavigator({
        HomePage: HomeScreen,
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
    },
    SecondPage: {
      screen: createStackNavigator({
        SecondPage: HomeScreen //
      }),
    },
  })

});


const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
