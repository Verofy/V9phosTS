import { Dispatch, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { verofyCheck, verofyLogin } from '../../helpers/verofyHelpers';
import { storeData, getData, verofyFetch } from '../../helpers/helpers';
import { method, end } from '../../helpers/constants';
import { store } from '../store';
import PhosModule from '../../components/PhosModule';
import { makeSale, makeSaleWithAmount } from '../../helpers/appHelpers';

export interface PayErrorAction {
  readonly type: 'ON_PAY_ERROR';
  payload: any;
}

export interface PaySuccessfulAction {
  readonly type: 'ON_SUCCESSFUL_PAY';
  payload: any;
}

export type PhosAction = PayErrorAction | PaySuccessfulAction;

export const OnPay = () => {
  return async (dispatch: Dispatch<PhosAction>) => {
    try {
      const response = await makeSale();
            //console.log(response)
      dispatch({
        type: 'ON_SUCCESSFUL_PAY',
        payload: response
      });
      if (!response) {
        dispatch({
          type: 'ON_PAY_ERROR',
          payload: 'Login Error'
        });
      } else {
        dispatch({
          type: 'ON_SUCCESSFUL_PAY',
          payload: response
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_PAY_ERROR',
        payload: 'Login Error'
      });
    }
  };
};

export const OnPayWithAmount = (amount: any) => {
  return async (dispatch: Dispatch<PhosAction>) => {
    try {
      const response = await makeSaleWithAmount(amount);
            //console.log(response)
      dispatch({
        type: 'ON_SUCCESSFUL_PAY',
        payload: response
      });
      if (!response) {
        dispatch({
          type: 'ON_PAY_ERROR',
          payload: 'Login Error'
        });
      } else {
        dispatch({
          type: 'ON_SUCCESSFUL_PAY',
          payload: response
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_PAY_ERROR',
        payload: 'Login Error'
      });
    }
  };
};

