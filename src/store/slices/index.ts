import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  user: userSlice,
});

export const RESET_STATE = 'RESET_STATE';

const appReducer = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return rootReducer(state, action);
};

export default appReducer; 