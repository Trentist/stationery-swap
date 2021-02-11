import {
    LOGIN_USER,
} from './constants';


export const loginUser = (username, password, history) => ({
    type: LOGIN_USER,
    payload: { username, password, history }
});
