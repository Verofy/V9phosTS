import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {styles} from './src/styles/styles';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen/>
    </View>
  );
}
