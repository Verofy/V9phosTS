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
import { initAndAuthenticate, makeSale } from '../helpers/appHelpers';
import { getData } from '../helpers/helpers';


interface PayProps {
  payReducer: PayState
  userReducer: UserState
}

async function onPay(issuer: string, token: string, license: string) {
  await initAndAuthenticate(issuer, token, license);
  try {
    await makeSale();
  } catch (e) {
    Alert.alert(e)
  }
}


const _PayScreen: React.FC<PayProps> = ({ userReducer, payReducer }) => {

  const state = store.getState();
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
          <Text style={styles.boldText}>Issuer: {issuer}</Text>
          <Text style={styles.boldText}>License: {license}</Text>
          <Text style={styles.boldText}>Token: {token}</Text>
          <View style={styles.debugButton}>
          <ButtonWithTitle
              title="PAY"
              height={50}
              width={250}
              onTap={()=>onPay(issuer,token,license)}
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

const PayScreen = connect(mapStateToProps, {})(_PayScreen)

export { PayScreen }
