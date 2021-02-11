import { combineReducers } from 'redux';
import Auth from './auth/reducers';

const createReducer = (asyncReducers) =>
  combineReducers({
    Auth,
    ...asyncReducers,
  });

export default createReducer;