import {
    LOGIN_USER,
} from './constants';

const INIT_STATE = {
  user: null
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };

    default: return { ...state };
  }
}

export default Auth;