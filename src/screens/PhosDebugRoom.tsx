import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { styles } from '../styles/styles';
import {
  makeSale,
  initAndAuthenticate,
  makeRefund,
  makeRefundWithAmount,
  makeSaleWithAmount,
  makeVoid,
  getTransactionHistory,
  getTransactionByTrKey,
  initTest,
  isInitialised,
  isInitialisedAlert
} from '../helpers/appHelpers';

export interface Props { }

interface State { }

export default class PhosDebugRoom extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Phos Module Debug Room</Text>
        <View style={styles.container}>
          <View style={styles.debugButton}>
            <Button color="purple" onPress={isInitialisedAlert} title="IS INITIALISED" />
          </View>
          <View style={styles.debugButton}>
            <Button color="navy" onPress={makeSale} title="PAY" />
          </View>
          <View style={styles.debugButton}>
            <Button
              color="green"
              onPress={() => {
                initAndAuthenticate("phos","d96018d6-d7a1-44cd-9d63-c20c7a1d87e8", "V9SDK")
              }}
              title="INITIALIZE AND AUTHENTICATE"
            />
          </View>
          <View style={styles.debugButton}>
            <Button color="black" onPress={initTest} title="TEST INIT" />
          </View>
        </View>
      </View>
    );
  }
}
