/* eslint-disable @typescript-eslint/no-explicit-any */
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthLoginParams, AuthState } from '../../interfaces/redux';
import { createEvent } from '../../services/metrics';

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
      createEvent('login');
      return auth().currentUser?.toJSON();
    } catch (error: any) {
      console.error(error);
      onError(error.message);
      throw error;
    }
  }
);

export const googleLogin = createAsyncThunk<any, void>(
  'auth/googleLogin',
  async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '595724404035-a714nnjkmgd0uagns8hkdv9nabh0tta7.apps.googleusercontent.com',
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      createEvent('federatedLogin');
      return auth().currentUser?.toJSON();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const signup = createAsyncThunk<any, AuthLoginParams>(
  'auth/signup',
  async ({ email, password, onError }, {}) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      createEvent('signup');

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
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.logedIn = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(googleLogin.rejected, (state, action) => {
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
