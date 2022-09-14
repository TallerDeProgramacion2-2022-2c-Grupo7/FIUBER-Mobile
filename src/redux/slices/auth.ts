import auth from '@react-native-firebase/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthLoginParams, AuthState } from '../../interfaces/redux';

const INITIAL_STATE: AuthState = {
  logedIn: false,
  user: null,
  error: undefined,
};

export const login = createAsyncThunk<any, AuthLoginParams>(
  'auth/login',
  async ({ email, password, onError }, { dispatch, getState }) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);

      return auth().currentUser?.toJSON();
    } catch (error: any) {
      onError(error.message);
      throw error;
    }
  }
);

export const signup = createAsyncThunk<any, AuthLoginParams>(
  'auth/signup',
  async ({ email, password, onError }, { dispatch, getState }) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      return auth().currentUser?.toJSON();
    } catch (error: any) {
      onError(error.message);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.logedIn = true;
    },
    clearUser: state => {
      state.user = null;
      state.logedIn = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log('login.fullfiled');
      state.logedIn = true;
      state.user = action.payload;
      state.error = undefined;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log('login.rejected', action.error.message);
      state.logedIn = false;
      state.user = null;
      state.error = action.error.message;
    });
  },
});

export const {
  actions: { setUser, clearUser },
} = authSlice;

export default authSlice.reducer;
