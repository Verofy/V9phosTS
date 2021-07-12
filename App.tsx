import React from 'react';
import { View } from 'react-native';
import {styles} from './src/styles/styles';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';

export default function App(){
    return (
      <View style={styles.container}>
        <LoginScreen/>
      </View>
    );
}
