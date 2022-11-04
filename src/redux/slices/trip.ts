import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LatLng } from 'react-native-maps';

import { ReduxState, TripState } from '../../interfaces/redux';
import { MapPoint } from '../../interfaces/trip';
import { getPublicProfile } from '../../services/profile';
import { calculateCost, createTrip, getDriver } from '../../services/trips';

const INITIAL_STATE: TripState = {
  id: null,
  from: null,
  to: null,
  passangerId: null,
  passsanger: null,
  driverId: null,
  driver: null,
  cost: null,
  distance: null,
  duration: null,
  status: null,
};

export const obtainCalculatedCost = createAsyncThunk(
  'trip/obtainCalculatedCost',
  ({ from, to, token }: { from: LatLng; to: LatLng; token: string }) => {
    return calculateCost({ from, to }, token);
  }
);

export const createNewTrip = createAsyncThunk(
  'trip/createNewTrip',
  ({ from, to, token }: { from: MapPoint; to: MapPoint; token: string }) => {
    return createTrip({ from, to }, token);
  }
);

export const getDriverProfile = createAsyncThunk<
  any,
  { token: string },
  { state: ReduxState }
>('trip/getDriverProfile', async ({ token }, { getState }) => {
  const { trip } = getState();
  if (!trip?.id) {
    return null;
  }
  const driverId = await getDriver(trip.id, token);
  if (!driverId) {
    return null;
  }
  const driverProfile = await getPublicProfile(driverId);
  return { driverId, driverProfile };
});

const tripSlice = createSlice({
  name: 'trip',
  initialState: INITIAL_STATE,
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setPasssaenger: (state, action) => {
      state.passsanger = action.payload;
    },
    setDriver: (state, action) => {
      state.driver = action.payload;
    },
    setCost: (state, action) => {
      state.cost = action.payload;
    },
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTrip: (state, action) => {
      state.cost = action.payload.cost;
      state.id = action.payload._id;
      state.status = action.payload.status;
      state.passangerId = action.payload.userId;
    },
    clearTrip: state => {
      console.log('Clearing trip');
      state.id = null;
      state.from = null;
      state.to = null;
      state.passangerId = null;
      state.passsanger = null;
      state.driverId = null;
      state.driver = null;
      state.cost = null;
      state.distance = null;
      state.duration = null;
      state.status = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(obtainCalculatedCost.fulfilled, (state, action) => {
      state.cost = action.payload;
    });
    builder.addCase(obtainCalculatedCost.rejected, (state, action) => {
      console.error(action.error);
      throw action.error;
    });
    builder.addCase(createNewTrip.fulfilled, (state, action) => {
      state.cost = action.payload.cost;
      state.id = action.payload._id;
      state.status = action.payload.status;
      state.passangerId = action.payload.userId;
    });
    builder.addCase(createNewTrip.rejected, (state, action) => {
      console.error(action.error);
      throw action.error;
    });
    builder.addCase(getDriverProfile.fulfilled, (state, action) => {
      console.log('Driver profile: ', action.payload);
      state.driver = action.payload.driverProfile;
      state.driverId = action.payload.driverId;
    });
    builder.addCase(getDriverProfile.rejected, (state, action) => {
      console.error(action.error);
      throw action.error;
    });
  },
});

export const {
  actions: {
    setFrom,
    setTo,
    setPasssaenger,
    setDriver,
    setCost,
    setDistance,
    setDuration,
    setStatus,
    setTrip,
    clearTrip,
  },
} = tripSlice;

export default tripSlice.reducer;
