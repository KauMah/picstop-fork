export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (token: string) => ({
  type: LOGIN,
  payload: {
    token: token ? token : '',
  },
});

export const logout = () => ({
  type: LOGOUT,
  payload: {},
});
