import { LOGIN, LOGOUT } from './actions';

export interface reduxState {
  token: string;
}

interface LoginAction {
  type: typeof LOGIN;
  payload: {
    token: string;
  };
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginAction | LogoutAction;
