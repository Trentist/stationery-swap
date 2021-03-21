import {
  LOGIN_USER,
  SET_USER
} from './constants';

const INIT_STATE = {
  user: null
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case SET_USER:
      return { ...state, user: action.payload };

    default: return { ...state };
  }
}

export default Auth;