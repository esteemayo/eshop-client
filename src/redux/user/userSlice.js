import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getJWT, login, register } from 'services/authService';
import {
  getFromStorage,
  removeFromStorage,
  setToStorage,
  tokenKey,
} from 'utils';

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async ({ credentials }, { rejectWithValue }) => {
    try {
      const { data } = await login({ ...credentials });
      return data.details;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUserAsync = createAsyncThunk(
  'user/register',
  async ({ credentials }, { rejectWithValue }) => {
    try {
      const { data } = await register({ ...credentials });
      return data.details;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk('user/logout', () => {
  return localStorage.removeItem(tokenKey);
});

const token = getJWT();
const user = getFromStorage(tokenKey);

const initialState = {
  user: user ?? null,
  isFetching: false,
  error: false,
};

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = decodedToken.exp * 1000

  if (Date.now() > expiredToken) {
    removeFromStorage(tokenKey);
    initialState.user = null;
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [loginUserAsync.pending]: (state) => {
      state.isFetching = true;
    },
    [loginUserAsync.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      setToStorage(tokenKey, payload);
      state.user = payload;
    },
    [loginUserAsync.rejected]: (state) => {
      state.isFetching = false;
      state.user = null;
      state.error = true;
    },
    [registerUserAsync.pending]: (state) => {
      state.isFetching = true;
    },
    [registerUserAsync.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      setToStorage(tokenKey, payload);
      state.user = payload;
    },
    [registerUserAsync.rejected]: (state) => {
      state.isFetching = false;
      state.user = null;
      state.error = true;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
