import React from 'react';
import { PermissionsAndroid } from 'react-native';

export const requestLocationPermission = async () => {
  try {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  } catch (err) {
    console.warn(err);
  }
}
export const requestPhoneStatePermission = async () => {
  try {
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE)
  } catch (err) {
    console.warn(err);
  }
}