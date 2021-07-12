import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import {styles} from './src/styles/styles';
import HomeScreen from './src/screens/HomeScreen';

export default class App extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <HomeScreen/>
      </View>
    );
  }
}
