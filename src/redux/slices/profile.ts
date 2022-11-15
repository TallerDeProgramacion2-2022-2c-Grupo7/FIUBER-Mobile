/* eslint-disable @typescript-eslint/no-explicit-any */
import firestore from '@react-native-firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';

import {
  AuthState,
  ProfileGetParams,
  ProfileState,
  ProfileUpdateParams,
} from '../../interfaces/redux';

const INITIAL_STATE: ProfileState = {
  obtained: false,
  profile: null,
  error: null,
};

const PUBILC_ATTRS = ['firstName', 'lastName', 'isDriver', 'car'];
const PRIVATE_ATTRS = ['email', 'phoneNumber', 'verifiedPhone'];

export const getMyProfile = createAsyncThunk<any, ProfileGetParams>(
  'profile/getMyProfile',
  async ({ uid }, {}) => {
    const publicProfile = await firestore().doc(`publicProfiles/${uid}`).get();
    const privateProfiles = await firestore()
      .doc(`privateProfiles/${uid}`)
      .get();

    if (!publicProfile.exists || !privateProfiles.exists) {
      throw new Error('Profile not found');
    }

    const profile = { ...publicProfile.data(), ...privateProfiles.data() };

    return profile;
  }
);

export const update = createAsyncThunk<any, ProfileUpdateParams>(
  'profile/update',
  async ({ uid, profile }, {}) => {
    const privateProfile = pick(profile, PRIVATE_ATTRS);
    const publicProfile = pick(profile, PUBILC_ATTRS);
    await firestore().doc(`publicProfiles/${uid}`).set(publicProfile);

    const privateProfiles = await firestore()
      .doc(`privateProfiles/${uid}`)
      .get();

    const privateProfileToUpdate = {
      ...privateProfiles.data(),
      ...privateProfile,
    };

    await firestore().doc(`privateProfiles/${uid}`).set(privateProfileToUpdate);

    const updatedPublicProfile = await firestore()
      .doc(`publicProfiles/${uid}`)
      .get();
    const updatedPrivateProfiles = await firestore()
      .doc(`privateProfiles/${uid}`)
      .get();

    const updatedProfile = {
      ...updatedPublicProfile.data(),
      ...updatedPrivateProfiles.data(),
    };

    return updatedProfile;
  }
);

export const setPhoneVerificationCode = createAsyncThunk<any, { code: string }>(
  'profile/setPhoneVerificationCode',
  async ({ code }, { getState }) => {
    const { auth } = getState() as { auth: AuthState };

    if (!auth.user) {
      return;
    }

    await firestore()
      .doc(`privateProfiles/${auth.user.uid}`)
      .set({ phoneVerificationCode: code });
  }
);

export const setPhoneNumber = createAsyncThunk<any, { phoneNumber: string }>(
  'profile/setPhoneNumber',
  async ({ phoneNumber }, { getState }) => {
    const { auth } = getState() as { auth: AuthState };

    if (!auth.user) {
      return;
    }

    const privateProfileCode = await firestore()
      .doc(`privateProfiles/${auth.user.uid}`)
      .get();

    const phoneAndCode = {
      ...privateProfileCode.data(),
      ...{ phoneNumber: phoneNumber },
    };

    phoneAndCode.verificationCode = phoneAndCode.phoneVerificationCode;
    delete phoneAndCode.phoneVerificationCode;

    await firestore().doc(`privateProfiles/${auth.user.uid}`).set(phoneAndCode);
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.obtained = true;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(getMyProfile.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.obtained = false;
      state.profile = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.obtained = true;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(update.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.obtained = false;
      state.profile = null;
    });
  },
});

export const {
  actions: {},
} = profileSlice;

export default profileSlice.reducer;
