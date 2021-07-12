import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { styles } from '../styles/styles';
import {
  authenticate,
  makeSale,
  init,
  promiseTest,
  makeRefund,
  makeRefundWithAmount,
  makeSaleWithAmount,
  makeVoid,
  getTransactionHistory,
  getTransactionByTrKey,
  initTest
} from '../helpers/appHelpers';

export interface Props { }

interface State { }

export default class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>V9phos</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="amount"
            keyboardType="numeric"
          />
          <Text style={styles.boldText}>£</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.debugButton}>
            <Button color="purple" onPress={promiseTest} title="PROMISE" />
          </View>
          <View style={styles.debugButton}>
            <Button color="#57F289" onPress={init} title="INIT" />
          </View>
          <View style={styles.debugButton}>
            <Button color="#efF559" onPress={initTest} title="INIT TEST" />
          </View>
          <View style={styles.debugButton}>
            <Button color="lime" onPress={authenticate} title="AUTHENTICATE" />
          </View>
          <View style={styles.debugButton}>
            <Button color="navy" onPress={makeSale} title="PAY" />
          </View>
          <View style={styles.debugButton}>
            <Button
              color="#6289FF"
              onPress={() => {
                makeSaleWithAmount(50);
              }}
              title="MAKE SALE WITH AMOUNT 50"
            />
          </View>
          <View style={styles.debugButton}>
            <Button color="red" onPress={makeRefund} title="REFUND" />
          </View>
          <View style={styles.debugButton}>
            <Button
              color="#F19CB2"
              onPress={() => {
                makeRefundWithAmount(50);
              }}
              title="REFUND WITH AMOUNT 50"
            />
          </View>
          <View style={styles.debugButton}>
            <Button color="#f72c49" onPress={makeVoid} title="VOID" />
          </View>
          <View style={styles.debugButton}>
            <Button
              color="yellow"
              onPress={getTransactionHistory}
              title="TRANSACTION HISTORY"
            />
          </View>
          <View style={styles.debugButton}>
            <Button
              color="orange"
              onPress={getTransactionByTrKey}
              title="TRANSACTION HISTORY WITH KEY"
            />
          </View>
        </View>
      </View>
    );
  }
}
