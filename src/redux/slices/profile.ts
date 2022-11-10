/* eslint-disable @typescript-eslint/no-explicit-any */
import firestore from '@react-native-firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';

import {
  ProfileGetParams,
  ProfileState,
  ProfileUpdateParams,
} from '../../interfaces/redux';

const INITIAL_STATE: ProfileState = {
  obtained: false,
  profile: null,
  error: null,
};

const PUBILC_ATTRS = [
  'firstName',
  'lastName',
  'isDriver',
  'brand',
  'model',
  'color',
  'plate',
];
const PRIVATE_ATTRS = ['email', 'phone', 'verifiedPhone'];

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
    await firestore().doc(`privateProfiles/${uid}`).set(privateProfile);

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

    return { updatedProfile };
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
      console.error('GET PROFILE ERROR', action.error);
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
