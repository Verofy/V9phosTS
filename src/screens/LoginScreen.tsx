import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, KeyboardAvoidingView, Image, TouchableOpacity, Alert } from 'react-native';
import { TextField } from '../components/TextField';
import { connect } from 'react-redux';
import { UserState } from '../redux/models';
import { ApplicationState } from '../redux/reducers';
import { OnUserCheck, OnUserLogin, OnCreateToken } from '../redux/actions/userActions';
import { verofyCheck } from '../helpers/verofyHelpers';
import { styles, debug, button } from '../styles/styles';
import { ButtonWithTitle } from '../components/ButtonWithTitle';
import { store } from '../redux/store';
import { useNavigation } from '../utils/useNavigation';
import { requestLocationPermission, requestPhoneStatePermission } from '../components/AskPermissions';


interface LoginProps {
  OnUserCheck: Function;
  OnUserLogin: Function;
  OnCreateToken: Function;
  userReducer: UserState
}


const _LoginScreen: React.FC<LoginProps> = ({ OnUserLogin, OnUserCheck, OnCreateToken, userReducer }) => {

  requestLocationPermission();
  requestPhoneStatePermission();
  
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('')
  const [title, setTitle] = useState('LOGIN')
  const [isChecked, setIsChecked] = useState(false)
  const { navigate } = useNavigation()
  const phoneDebug = "+527799448853";
  const codeDebug = "123456";
  const state = store.getState();
  //navigate('HomeStack');





  async function onTapAuthenticate() {
    if (isChecked) {
      await login();
    } else {
      await OnUserCheck(phoneDebug);
      console.log(state.userReducer.user.success)
      if (state.userReducer.user.success) {
        setIsChecked(true);
        setTitle(!isChecked ? 'LOGIN' : 'SEND CODE');
      } else {
        Alert.alert("Error message", state.userReducer.user.message)
      }
    }
  }

  function login() {
    OnUserLogin(phoneDebug, codeDebug);
    if (state.userReducer.login.success) {
      console.log(state.userReducer)
      //OnCreateToken(state.userReducer.login.data.user.default_customer_id as string | undefined);
      navigate('HomeStack');
    } else {
      Alert.alert("Error message", state.userReducer.login.message)
    }

  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={styles.h1}>V9-phos</Text>
        </View>
        <View style={debug.inputSection}>
          <TextField
            placeholder="phone"
            onTextChange={setPhone}
            isSecure={false}
          />
          {isChecked && <TextField placeholder="code" onTextChange={setCode} isSecure={false} />}
        </View>
        <View style={styles.container}>
          <ButtonWithTitle
            title={title}
            height={50}
            width={250}
            onTap={onTapAuthenticate}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.container}><Text>Footer</Text></View>
    </View>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer
})

const LoginScreen = connect(mapStateToProps, { OnUserLogin, OnUserCheck, OnCreateToken })(_LoginScreen)

export { LoginScreen }
