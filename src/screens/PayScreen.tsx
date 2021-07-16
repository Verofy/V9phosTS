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
import { authenticate, initAndAuthenticate, makeSale } from '../helpers/appHelpers';


interface PayProps {
  OnPay: Function;
  payReducer: PayState
  userReducer: UserState
}

async function onPay() {
  await initAndAuthenticate();
  await makeSale();
}


const _PayScreen: React.FC<PayProps> = ({ OnPay, userReducer, payReducer }) => {

  const state = store.getState();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={styles.h1}>Payment Page</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.debugButton}>
            <Button
              onPress={onPay}
              title="PAY"
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

const PayScreen = connect(mapStateToProps, { OnPay })(_PayScreen)

export { PayScreen }
