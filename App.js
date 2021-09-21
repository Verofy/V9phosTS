import React, { useEffect, useState } from 'react';
import {Text, View, Button, Alert } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import PhosModule from './src/components/PhosModule';
import { styles } from './src/styles/styles';




//const AppNavigation = createAppContainer(switchNavigator);
//const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  const [issuer, setIssuer] = useState('phos');
  const [license, setLicense] = useState('50770b60-7a08-4720-a68a-1c5ee5176794');
  const [token, setToken] = useState('a992a4c3-0328-412a-987b-0350746e780b');
  const [status, setStatus] = useState("Not initialized. You must initialize module first");
  async function requestPermissions() {
    console.log("called")
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    
      } catch (err) {
        console.warn(err);
      }
  }

  async function isInitialisedAlert() {
    return await PhosModule.isInitialised()
      .then((r) => {
        Alert.alert('Module is initialised: ' + r);
      })
      .catch((err) => {
        Alert.alert(err)
      });
  }

  async function initAndAuth(){
    setStatus('Initializing...');
    return await PhosModule.initAndAuthenticate(issuer, token, license)
      .then((r) => {
        Alert.alert('Initialised and Authenticated', JSON.stringify(r));
        setStatus('Initialized');
        return r;
      })
      .catch((err) => {
        Alert.alert('Error', JSON.stringify(err));
        setStatus('Initialization Error');

      });
  }

  async function makeSale(){
    return await PhosModule.makeSaleExtras(false)
      .then((r) => {
        Alert.alert('Sale successful', JSON.stringify(r));
        return r;
      })
      .catch((err) => {
        Alert.alert('Error', JSON.stringify(err));
      });
  }

  async function makeSaleWithAmount(amount){
    await PhosModule.makeSaleWithAmountExtras(parseFloat(amount), false)
    .then((r) => {
      Alert.alert('Sale successful', JSON.stringify(r));
      return r;
    })
    .catch((err) => {
      Alert.alert('Error', JSON.stringify(err));
    });
  }

  useEffect(() => {
    requestPermissions();
    return () => {
    }
  }, [])

  return (
    <View style={{...styles.container, alignContent:"stretch", alignItems:"center"}}>
      <Text style={{fontSize:20, fontWeight:"bold", textAlign:'center', padding:50}}>PHOS SAMPLE APP</Text>
      <Text style={{fontSize:15, textAlign:'center', padding:50}}>{status}</Text>
      <Button title="INIT AND AUTHENTICATE PHOS" onPress={()=>initAndAuth()} color="green" style={styles.debugButton}/>
      <Button title="IS MODULE INITIALIZED" onPress={()=>isInitialisedAlert()} color="grey"style={styles.debugButton}/>
      <Button title="MAKE SALE" onPress={()=>makeSale()} color="lime" style={styles.debugButton}/>
      <Button title="MAKE SALE WITH AMOUNT £5" onPress={()=>makeSaleWithAmount(5)} color="darkolivegreen" style={styles.debugButton}/>
    </View>
  );
}
