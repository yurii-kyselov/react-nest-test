import { CombinedState, combineReducers, Reducer } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './slices/authSlice';

export default function createRootReducer(): Reducer<
  CombinedState<{
    auth: AuthState;
  }>
> {
  return combineReducers({
    auth: authReducer,
  });
}
