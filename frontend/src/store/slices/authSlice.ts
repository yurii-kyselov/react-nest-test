import { createSlice } from '@reduxjs/toolkit';
import { check, signin, signout, signup } from '../thunks/authThunk';

export interface AuthState {
  isAuthenticated: boolean | undefined;
  status: 'idle' | 'loading' | 'failed';
  signinMessage: string;
  signupMessage: string;
}

const initialState: AuthState = {
  isAuthenticated: undefined,
  status: 'idle',
  signinMessage: '',
  signupMessage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSignupMessage: (state) => {
      state.signupMessage = '';
    },
    clearSigninMessage: (state) => {
      state.signinMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = 'idle';
        state.isAuthenticated = false;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.signupMessage = payload as string;
      })
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state) => {
        state.status = 'idle';
        state.isAuthenticated = true;
      })
      .addCase(signin.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.signinMessage = payload as string;
      })
      .addCase(signout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signout.fulfilled, (state) => {
        state.status = 'idle';
        state.isAuthenticated = false;
      })
      .addCase(signout.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.signinMessage = payload as string;
      })
      .addCase(check.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(check.fulfilled, (state) => {
        state.status = 'idle';
        state.isAuthenticated = true;
      })
      .addCase(check.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.isAuthenticated = false;
      });
  },
});

export const { clearSignupMessage, clearSigninMessage } = authSlice.actions;

export default authSlice.reducer;
