import PhosModule from '../components/PhosModule';
import { handleValue, handleRes, getData } from './helpers';
import React from 'react';
import { Alert } from 'react-native';
import { store } from '../redux';
const showTransactionResult = true;
const disablePrompt = true;
const state = store.getState();
export function getConstants() {
  console.log('GET CONSTANTS:', PhosModule.getConstants());
}

export async function isInitialised() {
  return await PhosModule.isInitialised()
    .then((r: any) => {
      console.log('Module is initialised: ' + r);
      return r;
    })
    .catch((err: any) => {
      console.log(err);
    });
}
async function init() {
  const init = await isInitialised();
  console.log('init', init);
  if (init == 'true') {
    return true;
  } else {
    return false;
  }
}
export async function initAndAuthenticate(issuer: string, token: string, license: string) {
  console.log(issuer, token, license)
  if (init()) {
    try{
      return await PhosModule.initAndAuthenticate(issuer, token, license)
      .then((r: any) => {
        console.log('Initialised and Authenticated', JSON.stringify(r));
        return r;
      })
      .catch((err: any) => {
        Alert.alert('Error', JSON.stringify(err));
      });
  } catch (e){
    Alert.alert("Authentification was not successful")
  }
    }
   
}

export function initTest() {
  PhosModule.initTest();
}
/*
export async function authenticate(issuer: string, license: string) {
  //const issuer = 'phos';
  console.log();
  const token = '2ac5040c-2ae7-49b9-a71e-9ace3528d69d';
  //const license = 'V9SDK';
  return await PhosModule.authenticate(issuer, token, license)
    .then((r: any) => {
      Alert.alert('Authenticated', JSON.stringify(r));
      return r;
    })
    .catch((err: any) => {
      Alert.alert('Error', JSON.stringify(err));
      return err;
    });
}*/

export async function makeSale() {
  if (init()) {
    return await PhosModule.makeSaleExtras(showTransactionResult)
      .then((r: any) => {
        Alert.alert('Sale successful', JSON.stringify(r));
        return r;
      })
      .catch((err: any) => {
        Alert.alert('Error', JSON.stringify(err));
      });
  } else {
    Alert.alert('Module must be initialized');
  }
}

export async function makeSaleWithAmount(amount: any) {
  if (init()) {
    return await PhosModule.makeSaleWithAmountExtras(parseFloat(amount), showTransactionResult)
      .then((r: any) => {
        Alert.alert('Sale successful', JSON.stringify(r));
        return r;
      })
      .catch((err: any) => {
        Alert.alert('Error', JSON.stringify(err));
      });
  } else {
    Alert.alert('Module must be initialized');
  }
}

export async function makeRefund(transaction: string) {
  //const transaction = 'MOCK+TRANSACTION+KEY';
  if (init()) {
    return await PhosModule.makeRefundExtras(transaction, showTransactionResult, disablePrompt)
      .then((r: any) => {
        Alert.alert('Refunded', JSON.stringify(r));
        return r;
      })
      .catch((err: any) => {
        Alert.alert('Error', JSON.stringify(err));
      });
  } else {
    Alert.alert('Module must be initialized');
  }
}

export async function makeRefundWithAmount(amount: number) {
  const transaction = 'MOCK+TRANSACTION+KEY';
  return await PhosModule.makeRefundWithAmountExtras(transaction, amount, showTransactionResult, disablePrompt)
    .then((r: any) => {
      Alert.alert('Refund', JSON.stringify(r));
      return r;
    })
    .catch((err: any) => {
      Alert.alert('Error', JSON.stringify(err));
    });
}

export async function makeVoid(transaction: string) {
  //const transaction = 'MOCK+TRANSACTION+KEY';
  if (init()) {
    return await PhosModule.makeVoidExtras(transaction, showTransactionResult, disablePrompt)
      .then((r: any) => {
        Alert.alert('Voided', JSON.stringify(r));
        return r;
      })
      .catch((err: any) => {
        Alert.alert('Error', JSON.stringify(err));
      });
  } else {
    Alert.alert('Module must be initialized');
  }
}

export async function getTransactionHistory() {
  const page = 1;
  const limit = 50;
  const date = '07/11/2021';
  const type = 'sale'; //sale, void, refund
  const state = 'successful'; //successful, failed, pending, unkwnon
  return await PhosModule.getTransactionHistory(page, limit, date, type, state)
    .then((r: any) => {
      console.info(r.message);
      Alert.alert('Transaction history', JSON.stringify(r));
    })
    .catch((err: any) => {
      Alert.alert('Error', JSON.stringify(err));
    });
}

export async function getTransactionByTrKey() {
  const trKey = 'MOCK+TRANSACTION+KEY';
  return await PhosModule.getTransactionByTrKey(trKey)
    .then((r: any) => {
      console.info(handleRes(r).transaction);
      Alert.alert('Transaction history by key', JSON.stringify(r));
      return r;
    })
    .catch((err: any) => {
      Alert.alert('Error', JSON.stringify(err));
    });
}
