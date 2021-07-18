import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, KeyboardAvoidingView, Image, TouchableOpacity, Alert } from 'react-native';
import { TextField } from '../components/TextField';
import { connect } from 'react-redux';
import { UserState } from '../redux/models';
import { ApplicationState } from '../redux/reducers';
import { OnUserCheck, OnUserLogin, OnCreateToken } from '../redux/actions/userActions';
import { styles, debug } from '../styles/styles';
import { ButtonWithTitle } from '../components/ButtonWithTitle';
//import { store } from '../redux/store';
import { useNavigation } from '../utils/useNavigation';
import { requestLocationPermission, requestPhoneStatePermission } from '../components/AskPermissions';


interface LoginProps {
  OnUserCheck: Function;
  OnUserLogin: Function;
  OnCreateToken: Function;
  userReducer: UserState;
}

function requestPermissions(){
  requestLocationPermission();
  requestPhoneStatePermission();
}


const _LoginScreen: React.FC<LoginProps> = ({ OnUserLogin, OnUserCheck, OnCreateToken, userReducer }) => {

  requestPermissions();
  
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('')
  const [title, setTitle] = useState('LOGIN')
  const [isChecked, setIsChecked] = useState(false)
  const { navigate } = useNavigation()
  const phoneDebug = "+527799448853";
  const codeDebug = "123456";
  //const state = store.getState();
  //navigate('HomeStack');

  function onTapAuthenticate() {
    if (isChecked) {
      login();
    } else { try{
      OnUserCheck(phoneDebug).then((val:any)=>{
        if (val.status=="OK") {
          setIsChecked(true);
          setTitle(!isChecked ? 'LOGIN' : 'SEND CODE');
        } else {
          Alert.alert("Error message", val.message)
        }
      }).catch((e:any)=>{console.error(e)})
     
    }catch(e){
      console.error(e)
    }
    } 
     
  }

  function login() {
    OnUserLogin(phoneDebug, codeDebug).then((val:any)=>{
      if (val.success) {
        console.log(val)
        OnCreateToken(val.data.default_customer.id as string | undefined);
        navigate('HomeStack');
      } else {
        Alert.alert("Error message", val.message)
      }
    }).catch((e:any)=>{console.error(e)})
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
