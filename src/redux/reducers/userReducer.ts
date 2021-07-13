import { UserAction } from '../actions';
import { UserModel, UserState } from '../models';

const initialState: UserState = {
  user: {} as UserModel,
  error: undefined
};

const UserReducer = (state: UserState = initialState, action: UserAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'ON_USER_CHECK':
      return { ...state, user: payload };
    case 'ON_USER_LOGIN':
      return { ...state, user: payload };
    case 'ON_USER_ERROR':
      return { ...state, error: payload };
    default:
      return state;
  }
};

export { UserReducer };
