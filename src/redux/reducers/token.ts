import { AuthActionTypes, reduxState } from '../actionTypes';
import { LOGIN, LOGOUT } from '../actions';

const initialState: reduxState = {
  token: '',
};
const tokenReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case LOGIN:
      const token = action.payload.token;
      return { ...state, token };
    case LOGOUT:
      return { ...state, token: '' };
    default:
      return state;
  }
};

export default tokenReducer;
