import { applyMiddleware, createStore } from 'redux';
import createReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

const initStore = (initialState = {}) => {
  return createStore(createReducer(), initialState, applyMiddleware(thunkMiddleware));
};
export default initStore;
