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
import { initAndAuthenticate, makeSale, makeVoid } from '../helpers/appHelpers';
import { getData } from '../helpers/helpers';


interface VoidProps {
  payReducer: PayState
  userReducer: UserState
}

async function voidPayment(transaction: string, issuer: string, token: string, license: string) {
  Alert.alert("void called")
  await initAndAuthenticate(issuer, token, license);
  try {
    await makeVoid(transaction);
  } catch (e) {
    Alert.alert(e)
  }
}

const _VoidScreen: React.FC<VoidProps> = ({ userReducer, payReducer }) => {
  const state = store.getState();
  const [transaction, setTransaction] = useState('');
  const [issuer, setIssuer] = useState('phos');
  const [license, setLicense] = useState('V9SDK');
  const [token, setToken] = useState('');

  async function getPhosToken() {
    if (token == undefined) {
      const token = await getData("PHOS_TOKEN").then(JSON.parse)
        .then((val) => { return val.data.token })
        .catch((e) => { console.error(e) })
      console.log(token)
      setToken(token);
    }
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={styles.h1}>Void payment page</Text>
        </View>
        <View style={styles.container}>
          <View style={debug.inputSection}>
            <TextField
              placeholder="transaction key"
              onTextChange={setTransaction}
              isSecure={false}
            />
          </View>
          <View style={styles.debugButton}>
            <ButtonWithTitle
              title="VOID PAYMENT"
              height={50}
              width={250}
              onTap={() => voidPayment(transaction, issuer, token, license)}
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

const VoidScreen = connect(mapStateToProps, {})(_VoidScreen)

export { VoidScreen }
