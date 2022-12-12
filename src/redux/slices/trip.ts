/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Geocoder from 'react-native-geocoding';
import { LatLng } from 'react-native-maps';

import { ReduxState, TripState } from '../../interfaces/redux';
import { MapPoint } from '../../interfaces/trip';
import { getPublicProfile } from '../../services/profile';
import { getRating } from '../../services/rating';
import { calculateCost, createTrip, getTrip } from '../../services/trips';

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
  currentPosition: null,
  onTheMove: false,
  nearToDestination: false,
};

export const obtainCalculatedCost = createAsyncThunk(
  'trip/obtainCalculatedCost',
  ({ from, to }: { from: LatLng; to: LatLng }) => {
    return calculateCost({
      from: { coordinates: from },
      to: { coordinates: to },
    });
  }
);

export const createNewTrip = createAsyncThunk(
  'trip/createNewTrip',
  ({ from, to }: { from: MapPoint; to: MapPoint }) => {
    return createTrip({ from, to });
  }
);

export const setCurrentPositionAsFrom = createAsyncThunk<
  any,
  void,
  { state: ReduxState }
>('trip/setCurrentPositionAsFrom', async (_, { getState }) => {
  const { trip } = getState();
  if (!trip?.currentPosition) {
    return null;
  }

  const geoCoderData = await Geocoder.from(trip.currentPosition);
  const formattedAddress = geoCoderData.results[0].formatted_address;
  return {
    coordinates: trip.currentPosition,
    description: {
      name: formattedAddress,
      formattedAddress: {
        mainText: formattedAddress,
        secondaryText: '',
      },
    },
  };
});

export const reloadTrip = createAsyncThunk<any, void, { state: ReduxState }>(
  'trip/reloadTrip',
  async (_, { getState }) => {
    const { trip } = getState();
    if (!trip?.id) {
      return null;
    }

    return getTrip(trip.id);
  }
);

export const fetchPassangerProfile = createAsyncThunk<
  any,
  void,
  { state: ReduxState }
>('trip/fetchPassangerProfile', async (_, { getState }) => {
  const { trip } = getState();
  if (trip.passangerId) {
    const profile = await getPublicProfile(trip.passangerId);
    const rating = await getRating(trip.passangerId);
    return { ...profile, rating };
  }
  return {};
});

export const fetchDriverProfile = createAsyncThunk<
  any,
  void,
  { state: ReduxState }
>('trip/fetchDriverProfile', async (_, { getState }) => {
  const { trip } = getState();
  if (trip.driverId) {
    const profile = await getPublicProfile(trip.driverId);
    const rating = await getRating(trip.driverId);
    return { ...profile, rating };
  }
  return {};
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
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.cost = action.payload.cost;
      state.duration = action.payload.duration;
      state.id = action.payload._id;
      state.status = action.payload.status;
      state.passangerId = action.payload.passengerId;
    },
    clearTrip: state => {
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
    setCurrentPosition: (state, action) => {
      state.currentPosition = action.payload;
    },
    goToTripFrom: (state, _action) => {
      if (!state.currentPosition) {
        return;
      }
      state.to = state.from;
      state.from = { coordinates: state.currentPosition };
    },
    setOnTheMove: (state, action) => {
      state.onTheMove = action.payload;
    },
    setNearToDestination: (state, action) => {
      state.nearToDestination = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(obtainCalculatedCost.fulfilled, (state, action) => {
      state.cost = action.payload;
    });
    builder.addCase(obtainCalculatedCost.rejected, (state, action) => {
      throw action.error;
    });
    builder.addCase(createNewTrip.fulfilled, (state, action) => {
      state.cost = action.payload.cost;
      state.id = action.payload._id;
      state.status = action.payload.status;
      state.passangerId = action.payload.passengerId;
    });
    builder.addCase(createNewTrip.rejected, (state, action) => {
      throw action.error;
    });
    builder.addCase(fetchDriverProfile.fulfilled, (state, action) => {
      state.driver = action.payload;
    });
    builder.addCase(fetchPassangerProfile.fulfilled, (state, action) => {
      state.passsanger = action.payload;
    });
    builder.addCase(setCurrentPositionAsFrom.fulfilled, (state, action) => {
      state.from = action.payload;
    });
    builder.addCase(setCurrentPositionAsFrom.rejected, (state, _action) => {
      if (state.currentPosition) {
        state.from = {
          coordinates: state.currentPosition,
        };
      }
    });
    builder.addCase(reloadTrip.fulfilled, (state, action) => {
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.cost = action.payload.cost;
      state.id = action.payload._id;
      state.status = action.payload.status;
      state.passangerId = action.payload.passengerId;
      state.driverId = action.payload.driverId;
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
    setCurrentPosition,
    goToTripFrom,
    setOnTheMove,
    setNearToDestination,
  },
} = tripSlice;

export default tripSlice.reducer;
