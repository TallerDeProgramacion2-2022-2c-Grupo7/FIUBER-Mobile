import { createSlice } from '@reduxjs/toolkit';

import { TripState } from '../../interfaces/redux';

const INITIAL_STATE: TripState = {
  origin: null,
  destination: null,
  passsaenger: null,
  driver: null,
  cost: null,
  distance: null,
  duration: null,
  status: null,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState: INITIAL_STATE,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setPasssaenger: (state, action) => {
      state.passsaenger = action.payload;
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
  },
});

export const {
  actions: {
    setOrigin,
    setDestination,
    setPasssaenger,
    setDriver,
    setCost,
    setDistance,
    setDuration,
    setStatus,
  },
} = tripSlice;

export default tripSlice.reducer;
