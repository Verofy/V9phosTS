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

  

  function onTapAuthenticate() {
    const state = store.getState();
    const phoneDebug = "+527799448853";
    if(isChecked){
      login();
    } else{
      OnUserCheck(phoneDebug);
      if(state.userReducer.user.success){
        console.log(state.userReducer.user.success)
        setIsChecked(true);
        setTitle(!isChecked ? 'Check' : 'Login');
      }    
    }
  }

  function login() {
    const state = store.getState();
    const codeDebug = "123456";
    OnUserLogin(codeDebug);
    var token = state.userReducer.login.data.access_token as string | undefined;
    console.log(state.userReducer)
    OnCreateToken(state.userReducer.login.data.user.default_customer_id as string | undefined);
    navigate('HomeStack');     
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
            title={!isChecked ? "Send code" : "Login"}
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
