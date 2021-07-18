import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, KeyboardAvoidingView, Image, TouchableOpacity, Alert } from 'react-native';
import { TextField } from '../components/TextField';
import { connect } from 'react-redux';
import { UserState, PayState } from '../redux/models';
import { ApplicationState } from '../redux/reducers';
import { OnPay } from '../redux/actions/phosActions';
import { verofyCheck } from '../helpers/verofyHelpers';
import { styles, debug, button } from '../styles/styles';
import { ButtonWithTitle } from '../components/ButtonWithTitle';
import { store } from '../redux/store';
import { useNavigation } from '../utils/useNavigation';
import { requestLocationPermission, requestPhoneStatePermission } from '../components/AskPermissions';
import { initAndAuthenticate, makeSale, makeSaleWithAmount } from '../helpers/appHelpers';
import { getData } from '../helpers/helpers';


interface PayWithAmountProps {
  payReducer: PayState
  userReducer: UserState
}

async function onPay(amount: any, issuer: string, token: string, license: string) {

  if (!isNaN(amount) && amount < 45) {
    await initAndAuthenticate(issuer, token, license);
    await makeSaleWithAmount(amount);
  } else {
    Alert.alert("Warning", "Not allowed value");
  }

}

const _PayWithAmountScreen: React.FC<PayWithAmountProps> = ({ userReducer, payReducer }) => {
  const [amount, setAmount] = useState()
  const state = store.getState();
  //const issuer = 'phos';
  //const token = '2ac5040c-2ae7-49b9-a71e-9ace3528d69d';
  const [issuer, setIssuer] = useState('phos');
  const [license, setLicense] = useState('V9SDK');
  const [token, setToken] = useState('');

  async function getPhosToken() {
    if(token==''){
      const token = await getData("PHOS_TOKEN").then(JSON.parse)
      .then((val) => { return val.data.token })
      .catch((e) => { console.error(e) })
    console.log(token)
    setToken(token);
    }
  }

  getPhosToken();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={styles.h1}>Payment Page</Text>
        </View>
        <View style={styles.container}>
          <View style={debug.inputSection}>
            <Text style={styles.boldText}>Issuer: {issuer}</Text>
            <Text style={styles.boldText}>License: {license}</Text>
            <Text style={styles.boldText}>Token: {token}</Text>
            <TextField
              placeholder="amount"
              onTextChange={setAmount}
              isSecure={false}
            />
          </View>
          <View style={styles.debugButton}>
            <ButtonWithTitle
              title="PAY"
              height={50}
              width={250}
              onTap={() => onPay(amount, issuer, token, license)}
            />

          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.container}><Text>Footer</Text></View>
    </View>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  payReducer: state.payReducer
})

const PayWithAmountScreen = connect(mapStateToProps, {})(_PayWithAmountScreen)

export { PayWithAmountScreen }
