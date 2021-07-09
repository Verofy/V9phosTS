import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import {styles} from '../styles/styles';
import { processPayment, invokeModule, authenticate, makeSale, init, promiseTest } from '../helpers/appHelpers';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>V9phos</Text>
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
            style={styles.debugButton}
            color="purple"
            onPress={promiseTest}
            title="PROMISE"
          />
          <Button
            style={styles.debugButton}
            onPress={init}
            title="INIT"
          />
          <Button
            style={styles.debugButton}
            color="lime"
            onPress={authenticate}
            title="AUTHENTICATE"
          />
          <Button
            style={styles.debugButton}
            color="navy"
            onPress={makeSale}
            title="PAY"
          />
      </View>
    </View>
  );
}