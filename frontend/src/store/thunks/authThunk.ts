import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '../../api/axiosConfig';
import history from '../history';

interface Arg {
  email: string;
  password: string;
}

export const signup = createAsyncThunk('signup', async (arg: Arg, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/users/signup', arg);
    history.push('/signin');
    return data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) return rejectWithValue(e.response.data.message);
    return rejectWithValue(e);
  }
});

export const signin = createAsyncThunk('signin', async (arg: Arg, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/users/signin', arg);
    history.push('/dashboard');
    return data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) return rejectWithValue(e.response.data.message);
    return rejectWithValue(e);
  }
});

export const check = createAsyncThunk('check', async (_arg, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/users/check');
    return data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) return rejectWithValue(e.response.data.message);
    return rejectWithValue(e);
  }
});

export const signout = createAsyncThunk('signout', async (_arg, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/users/signout');
    return data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) return rejectWithValue(e.response.data.message);
    return rejectWithValue(e);
  }
});
