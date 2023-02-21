import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from 'services/authService';
import {
  getFromStorage,
  removeFromStorage,
  setToStorage,
  tokenKey,
} from 'utils';

export const loginUserAsync = createAsyncThunk(
  'auth/login',
  async ({ credentials, toast }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.login({ ...credentials });
      toast.success('Login successful');
      return data.details;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUserAsync = createAsyncThunk(
  'auth/register',
  async ({ credentials, toast }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.register({ ...credentials });
      toast.success('User registered successfully');
      return data.details;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const token = authAPI.getJWT();
const user = getFromStorage(tokenKey);

const initialState = {
  user: user ?? null,
  isFetching: false,
  isSuccess: false,
  isError: '',
};

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = decodedToken.exp * 1000;

  if (Date.now() > expiredToken) {
    removeFromStorage(tokenKey);
    initialState.user = null;
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
    },
    setLogout: (state) => {
      removeFromStorage(tokenKey);
      state.user = null;
    },
  },
  extraReducers: {
    [loginUserAsync.pending]: (state) => {
      state.isFetching = true;
    },
    [loginUserAsync.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      setToStorage(tokenKey, payload);
      state.user = payload;
    },
    [loginUserAsync.rejected]: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.user = null;
      state.isError = true;
    },
    [registerUserAsync.pending]: (state) => {
      state.isFetching = true;
    },
    [registerUserAsync.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      setToStorage(tokenKey, payload);
      state.user = payload;
    },
    [registerUserAsync.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.user = null;
      state.isError = true;
    },
  },
});

export const { reset, setLogout } = userSlice.actions;

export default userSlice.reducer;
