import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, KeyboardAvoidingView, Image, TouchableOpacity, Alert, FlatList, TouchableHighlight } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { TextField } from '../components/TextField';
import { connect } from 'react-redux';
import { UserState, PayState } from '../redux/models';
import { ApplicationState } from '../redux/reducers';
import { OnPay } from '../redux/actions/phosActions';
import { verofyCheck } from '../helpers/verofyHelpers';
import { styles, debug, button } from '../styles/styles';
import { ButtonWithTitle } from '../components/ButtonWithTitle';
import { useNavigation } from '../utils/useNavigation';
import { requestLocationPermission, requestPhoneStatePermission } from '../components/AskPermissions';
import { getTransactionHistory, initAndAuthenticate, makeSale } from '../helpers/appHelpers';
import { getData } from '../helpers/helpers';
import { ScrollView } from 'react-native-gesture-handler';


interface TransactionsProps {
  payReducer: PayState
}

type Transaction = {
  action_code: number;
  amount: number;
  transaction_key: string;
};

const initialTransactions: Transaction[] = [
  {
    transaction_key: '',
    action_code: 0,
    amount: 0,
  },
];

const _TransactionsScreen: React.FC<TransactionsProps> = ({ payReducer }) => {

  const [issuer, setIssuer] = useState('phos');
  const [token, setToken] = useState('');
  const [license, setLicense] = useState('V9SDK');
  const [isFetching, setFetching] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);
  getPhosToken();
  if (transactions == initialTransactions) {
    getTransactions();
  }



  const copyIt = (val: any) => { Clipboard.setString(val.transaction_key); Alert.alert("Transaction key copied!", "Info about transaction: " + JSON.stringify(val)) }

  async function getPhosToken() {
    if (token == '') {
      const token = await getData("PHOS_TOKEN").then(JSON.parse)
        .then((val) => { return val.data.token })
        .catch((e) => { console.error(e) })
      console.log(token)
      setToken(token);
    }
  }

  async function getTransactions() {
    console.log(issuer, token, license);
    await initAndAuthenticate(issuer, token, license)
    return await getTransactionHistory()
      .then((val) => {
        const q = JSON.parse(val.transaction_history);
        console.debug(q)
        setTransactions(q);
      })
      .catch((e) => { console.error(e) })
  }




  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={styles.h1}>Transactions</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.boldText}>Issuer: {issuer}</Text>
          <Text style={styles.boldText}>License: {license}</Text>
          <Text style={styles.boldText}>Token: {token}</Text>
          <ScrollView>
            {transactions.map((transactions, index) => (
              <TouchableHighlight onPress={() => copyIt(transactions)}>
                <Text style={styles.transaction}>{transactions.transaction_key}, amount: £{transactions.amount}</Text>
              </TouchableHighlight>

            ))}
          </ScrollView>

        </View>
        <Text></Text>
      </KeyboardAvoidingView>
      <View style={styles.container}><Text>Footer</Text></View>
    </View>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  payReducer: state.payReducer
})

const TransactionsScreen = connect(mapStateToProps, {})(_TransactionsScreen)

export { TransactionsScreen }
