import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import {styles} from '../styles/styles';
import { processPayment, invokeModule, authenticate, makeSale, init, promiseTest, makeRefund, makeRefundWithAmount, makeSaleWithAmount, makeVoid, getTransactionHistory, getTransactionByTrKey } from '../helpers/appHelpers';

export interface Props {
  
}

interface State {
  
}

export default class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      
    };
  }
  /*testFunc=()=>{
    promiseTest(8).then((res)=>{
      console.info(val)
    })
  }*/
  render(){
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
              //onPress={this.testFunc}
              title="PROMISE"
            />
            <Button
              style={styles.debugButton}
              color="#57F289"
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
             <Button
              style={styles.debugButton}
              color="#6289FF"
              onPress={()=>{makeSaleWithAmount(50)}}
              title="MAKE SALE WITH AMOUNT 50"
            />
             <Button
              style={styles.debugButton}
              color="red"
              onPress={makeRefund}
              title="REFUND"
            />
            <Button
              style={styles.debugButton}
              color="#F19CB2"
              onPress={()=>{makeRefundWithAmount(50)}}
              title="REFUND WITH AMOUNT 50"
            />
            <Button
              style={styles.debugButton}
              color="#f72c49"
              onPress={makeVoid}
              title="VOID"
            />
            <Button
              style={styles.debugButton}
              color="yellow"
              onPress={getTransactionHistory}
              title="TRANSACTION HISTORY"
            />
            <Button
              style={styles.debugButton}
              color="orange"
              onPress={getTransactionByTrKey}
              title="TRANSACTION HISTORY WITH KEY"
            />
        </View>
      </View>
    );
  }
}