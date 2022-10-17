import auth from '@react-native-firebase/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthLoginParams, AuthState } from '../../interfaces/redux';

const INITIAL_STATE: AuthState = {
  logedIn: false,
  user: null,
  error: null,
};

export const login = createAsyncThunk<any, AuthLoginParams>(
  'auth/login',
  async ({ email, password, onError }, {}) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);

      return auth().currentUser?.toJSON();
    } catch (error: any) {
      console.error(error);
      onError(error.message);
      throw error;
    }
  }
);

export const signup = createAsyncThunk<any, AuthLoginParams>(
  'auth/signup',
  async ({ email, password, onError }, {}) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      return auth().currentUser?.toJSON();
    } catch (error: any) {
      console.error(error);
      onError(error.message);
      throw error;
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await auth().signOut();
});

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
      state.logedIn = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.logedIn = false;
      state.user = null;
      state.error = action.error.message || null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.logedIn = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.logedIn = false;
      state.user = null;
      state.error = action.error.message || null;
    });
    builder.addCase(logout.fulfilled, state => {
      state.logedIn = false;
      state.user = null;
    });
  },
});

export const {
  actions: { setUser, clearUser },
} = authSlice;

export default authSlice.reducer;
