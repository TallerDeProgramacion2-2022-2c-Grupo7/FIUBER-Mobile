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
      const response = await auth().signInWithEmailAndPassword(email, password);
      const uid = response.user.uid;
      const token = await response.user.getIdToken();
      createEvent('login', uid, token);
      return auth().currentUser?.toJSON();
    } catch (error: any) {
      console.log(error.message);
      onError('validations.logInError');
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
      const response = await auth().signInWithCredential(googleCredential);
      const uid = response.user.uid;
      const token = await response.user.getIdToken();
      createEvent('federatedLogin', uid, token);
      return auth().currentUser?.toJSON();
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
);

export const signup = createAsyncThunk<any, AuthLoginParams>(
  'auth/signup',
  async ({ email, password, onError }, {}) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = response.user.uid;
      const token = await response.user.getIdToken();
      createEvent('signup', uid, token);
      return auth().currentUser?.toJSON();
    } catch (error: any) {
      console.log(error.message);
      onError('validations.emailAlreadyInUse');
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
