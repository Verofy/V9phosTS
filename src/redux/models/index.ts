export interface UserModel {
  success: boolean;
  status: string;
  message: string;
  data: object;
  verified: boolean;
}

export interface LoginModel {
  success: boolean;
  status: string;
  message: string;
  data: {
    access_token: string;
  };
  user: object;
}


export interface PayModel {
  success: boolean;
}

export interface UserState {
  user: UserModel;
  login: LoginModel;
  error: string | undefined;
}

export interface PayState {
  payment: PayModel;
  error : string | undefined;
}