import {
  LOGIN_USER,
  SET_USER
} from './constants';


export const loginUser = (username, password, history) => ({
  type: LOGIN_USER,
  payload: { username, password, history }
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});
