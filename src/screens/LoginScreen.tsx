import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
import { TextField } from '../components/TextField';
import { connect } from 'react-redux';
import { UserState } from '../redux/models';
import { ApplicationState } from '../redux/reducers';
import { OnUserCheck, OnUserLogin } from '../redux/actions/userActions';
import { verofyCheck } from '../helpers/verofyHelpers';
import { styles, debug, button } from '../styles/styles';
import { ButtonWithTitle } from '../components/ButtonWithTitle';
import {store} from '../redux/store';

interface LoginProps {
  OnUserCheck: Function;
  OnUserLogin: Function;
  userReducer: UserState
}

const _LoginScreen: React.FC<LoginProps> = ({ OnUserLogin, OnUserCheck, userReducer }) => {

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('')
  const [title, setTitle] = useState('LOGIN')
  const [isChecked, setIsChecked] = useState(false)

  async function onTapAuthenticate() {
    const phoneDebug = "+527799448853";
    const codeDebug = "123456";
    OnUserCheck(phoneDebug);
    var user = store.getState();
    console.log(user)
    setIsChecked(true);

    OnUserLogin(code);
    
    setTitle(!isChecked ? 'Check' : 'Login');
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

const LoginScreen = connect(mapStateToProps, { OnUserLogin, OnUserCheck })(_LoginScreen)

export { LoginScreen }
