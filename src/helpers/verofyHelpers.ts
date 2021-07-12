import { method, end } from './constants';
import { getData, storeData, verofyFetch } from './helpers';

export function verofyCheck(u: string) {
  var raw = JSON.stringify({
    login: u
  });
  verofyFetch(method.POST, end.userCheck, raw).then((val: void) => {
    console.log(val);
    storeData('LOGIN', u);
  });
  verofyLogin('123456');
}

export async function verofyLogin(p: string) {
  let l = await getData('LOGIN');
  var raw = JSON.stringify({
    login: l,
    password: p,
    trust_this_device: true,
    meta_data: {
      device_type: 2,
      push_token: ''
    }
  });
  verofyFetch(method.POST, end.userLogin, raw).then((val: void) => {
    console.log(val);
    storeData('USER_DATA', val);
  });
}
