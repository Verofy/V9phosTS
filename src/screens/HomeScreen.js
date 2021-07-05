import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import {styles} from '../styles/styles';
import { processPayment } from '../helpers/appHelpers';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>V9phosTS app</Text>
      <View
        style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="amount"
          keyboardType="numeric"
        />
        <Text style={styles.boldText}>£</Text>
      </View>
        <View style={styles.container}>
          <Button
            onPress={processPayment}
            title="PAY"
          />
      </View>
    </View>
  );
}