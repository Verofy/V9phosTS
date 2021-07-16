import { PhosAction } from '../actions/phosActions';
import { LoginModel, UserModel, UserState, PayState, PayModel } from '../models';

const initialState: PayState = {
    payment: {} as PayModel,
    error: undefined
  };

const PhosReducer = (state: PayState = initialState, action: PhosAction) => {
    const { type, payload } = action;
    switch (type) {
      case 'ON_SUCCESSFUL_PAY':
        return { ...state, user: payload };
      case 'ON_PAY_ERROR':
        return { ...state, error: payload };
      default:
        return state;
    }
  };

export { PhosReducer };
