import React from 'react';
import { styles, navigationStyles } from './src/styles/styles';
import { Image, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/PhosDebugRoom';
import { Provider } from 'react-redux'
import { store } from './src/redux'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { LoginScreen } from './src/screens/LoginScreen';
import { RefundScreen } from './src/screens/RefundScreen';
import { PayScreen } from './src/screens/PayScreen';
import { VoidScreen } from './src/screens/VoidScreen';
import { PayWithAmountScreen } from './src/screens/PayWithAmount';
import { TransactionsScreen } from './src/screens/Transactions';
import PhosDebugRoom from './src/screens/PhosDebugRoom';


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
    Pay: {
      screen: createStackNavigator({
        Pay: PayScreen,
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
    },
    PayWithAmount: {
      screen: createStackNavigator({
        PayWithAmount: PayWithAmountScreen //
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
    },
    Refund: {
      screen: createStackNavigator({
        Refund: RefundScreen //
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
    },
    Void: {
      screen: createStackNavigator({
        Void: VoidScreen //
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
    },
    Transactions: {
      screen: createStackNavigator({
        Transactions: TransactionsScreen //
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
    },
    HomePage: {
      screen: createStackNavigator({
        PhosDebugRoom: PhosDebugRoom //
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
    },
  })

});


//const AppNavigation = createAppContainer(switchNavigator);
const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
