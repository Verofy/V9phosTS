import AsyncStorage from '@react-native-community/async-storage';

export function handleValue(val: any) {
  if (val == null) {
    return false;
  } else return val;
}

export function handleRes(r: any) {
  var result = Object.assign({}, r);
  return result;
}

export async function verofyFetch(method: string, end: string, raw: string, additional?: any) {
  const url = 'https://stg-main-service.verofy.com/api/v1/customer-portal' + end;
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('V2-Device-Platform', 'android');
  myHeaders.append('V2-Device-Unique-ID', '3fa32292-613d-11eb-ae93-0242ac130002');
  myHeaders.append('V2-CTA-App-Version', '1.0');
  myHeaders.append('V2-Master-Request-ID', 'V9PHOS_CP2096247');
  myHeaders.append('V2-CTA-Api-Key', 'PKzp4x_huG6wbe-7+93-tHjdKKvu$n%_');
  myHeaders.append('V2-CTA-App-Version', '1.0');
  additional ? myHeaders.append('Authorization', 'Bearer ' + additional.token) : null;

  const requestOptions = {
    method: method,
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  //console.debug(url, requestOptions);
  return await fetchAsync(url, requestOptions)
    .then(data => {
      console.debug('Fetch ' + url);
      return data;
    })
    .catch(err => console.log(err.message));
}

async function fetchAsync(url: string, opt: Object) {
  let res = await fetch(url, opt);
  let data = await res.json();
  return data;
}

export const storeData = async (key: string, value: any) => {
  try {
    if (typeof value == 'object') {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      if (typeof value == 'object') {
        return value != null ? JSON.parse(value) : null;
      } else return value;
    }
  } catch (e) {
    console.error(e);
  }
};