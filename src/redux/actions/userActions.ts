import { Dispatch, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { verofyCheck, verofyLogin } from '../../helpers/verofyHelpers';
import { storeData, getData, verofyFetch } from '../../helpers/helpers';
import { method, end } from '../../helpers/constants';
import { store } from '../store';



export interface UserErrorAction {
  readonly type: 'ON_USER_ERROR';
  payload: any;
}

export interface UserLoginAction {
  readonly type: 'ON_USER_LOGIN';
  payload: string;
}

export interface UserLoginCheck {
  readonly type: 'ON_USER_CHECK';
  payload: string;
}

export interface TokenCreated {
  readonly type: 'ON_TOKEN_CREATED';
  payload: string;
}

export interface TokenError {
  readonly type: 'ON_TOKEN_ERROR';
  payload: string;
}

export type UserAction = UserErrorAction | UserLoginAction | UserLoginCheck | TokenCreated | TokenError;

export const OnUserCheck = (phone: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    var raw = JSON.stringify({
      login: phone
    });
    try {
      const response = await verofyFetch(method.POST, end.userCheck, raw);
      dispatch({
        type: 'ON_USER_CHECK',
        payload: response
      });
      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'Login Error'
        });
      } else {
        dispatch({
          type: 'ON_USER_CHECK',
          payload: response
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: 'Login Error'
      });
    }
  };
};

export const OnUserLogin = (phone:string, code: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    var raw = JSON.stringify({
      login: phone,
      password: code,
      trust_this_device: true,
      meta_data: {
        device_type: 2,
        push_token: ''
      }
    });
    try {
      const response = await verofyFetch(method.POST, end.userLogin, raw);
      dispatch({
        type: 'ON_USER_LOGIN',
        payload: response
      });
      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'Login Error'
        });
      } else {
        dispatch({
          type: 'ON_USER_LOGIN',
          payload: response
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: 'Login Error'
      });
    }
  };
};

export const OnCreateToken = (customerID: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    const state = store.getState();
    const additional = {
      token: state.userReducer.login.data.access_token
    }
    var raw = JSON.stringify({});
    try {
      const response = await verofyFetch(method.POST, end.createToken(customerID), raw, additional);
      storeData('PHOS_TOKEN', response);
      dispatch({
        type: 'ON_TOKEN_CREATED',
        payload: response
      });
      if (!response) {
        dispatch({
          type: 'ON_TOKEN_ERROR',
          payload: 'Login Error'
        });
      } else {
        dispatch({
          type: 'ON_TOKEN_CREATED',
          payload: response
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_TOKEN_ERROR',
        payload: 'Login Error'
      });
    }
  };
};

