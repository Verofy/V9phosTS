export interface UserModel {
  login: String;
  token: string;
  verified: boolean;
}

export interface UserState {
  user: UserModel;
  error: string | undefined;
}
